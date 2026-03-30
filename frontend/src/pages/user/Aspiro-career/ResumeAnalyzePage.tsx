import React, { useState } from 'react';
import { LuChartBar, LuFileCheck2, LuFileText, LuTarget, LuTrendingUp, LuUpload, LuX } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { parsePdf } from '../../../utilities/pdf.parser';
import { AxiosError } from 'axios';
import { analyzeResume, analyzeResumeDetailed } from '../../../services/resumeServices';
import { data, useNavigate } from 'react-router-dom';


const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [targettedRole, setTargettedRole] = useState("")
  const [targettedRoleError, setTargettedRoleError] = useState<{isError: boolean, message: string}>({isError: false, message: ''})
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyseResult, setAnalyseResult] = useState<{score: number, feedback: string, strength: string[], improvements: string[]} | null>(null)


  const navigate = useNavigate()

  // Mock function to handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyze = async () => {
    if(!targettedRole){
        setTargettedRoleError(() => {
            return {
                isError: true,
                message: 'This field is mandatory'
            }
        })
        return
    }else{
        setTargettedRoleError(() => {
            return {
                isError: false,
                message: ''
            }
        })
    }

    if(!file) return toast.warn('Please choose file before analyzing')    
    
    const parsedContent = await toast.promise(
        parsePdf(file),
        {
            pending: 'Extracting contents...',
            success: 'Extracted',
            error:{
                render(props) {
                    const error = props.data as AxiosError<{message: string}>
                    return error.response?.data.message || error.message || 'Can not extract content'
                },
            }
        }
    )

    if(parsedContent.trim().length >= 50){
        try {
            const anaysisResult = await toast.promise(
                analyzeResumeDetailed(parsedContent, targettedRole),
                {
                    pending: 'Analyzing...',
                    success: 'Analyzed',
                    error: {
                        render(props) {
                            const error = props.data as AxiosError<{message: string}>
                            return error.response?.data.message || error.message || 'Something went wrong'
                        },
                    }
                }
            )
    
            if(anaysisResult.success){
                setAnalyseResult(anaysisResult.result)
                navigate('report', {state: {data: anaysisResult.result}})
            }
        } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }

    }

    console.log('This is parsed content', parsedContent)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Resume Analyzer</h1>
        <div className="h-0.5 w-64 bg-blue-600 mb-2"></div>
        <p className="text-sm text-slate-500 font-medium">
          Analyze your resume using AI and get instant feedback and ATS score
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-12 mb-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <LuFileText className="text-blue-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Upload Resume</h2>
          <p className="text-slate-400 text-sm mb-10 max-w-md">
            Upload your resume to receive a comprehensive ATS analysis and optimization recommendations
          </p>

          {/* Dotted Upload Area */}
          <label className="w-full max-w-2xl group cursor-pointer">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-16 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center">
              <LuUpload className="text-slate-300 group-hover:text-blue-500 mb-4 transition-colors" size={40} />
              <p className="text-slate-600 font-bold text-lg mb-1">Click to upload your resume</p>
              <p className="text-slate-400 text-xs">Only support PDF. Also scanned PDF files are not allowed</p>
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
            </div>
          </label>

          {/* Selected File Bar (Matches your screenshot) */}
          {file && (
            <>
            <div className="w-full max-w-2xl mt-8 flex items-center justify-between bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <LuFileCheck2 className="text-blue-600" size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700">{file?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-colors"
                >
                  <LuX size={18} />
                </button>
                <button
                  onClick={analyze} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-100 active:scale-95"
                >
                  Analyze Resume
                </button>
              </div>
            </div>
            <div className='flex flex-col items-start w-full mt-5'>
                <label htmlFor="" className='!text-xs font-medium'>The role you are applying for</label>
                <input value={targettedRole} onChange={(e) => setTargettedRole(e.target.value)} type="text" className='bg-gray-100 p-2 w-full border border-slate-400 rounded-md mt-2 focus:ring-1 focus:ring-blue-400' placeholder='eg; Software Engineer, Hiring Manager'  />
                {targettedRoleError.isError && (
                    <label className="!text-[10px] mt-1 !text-red-500">{targettedRoleError.message}</label>
                )}
            </div>
            </>
          )}
        </div>
      </div>

      {/* Feature Icons Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ATS Score Card */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
          <div className="w-12 h-12 flex items-center justify-center mb-4">
            <LuChartBar className="text-blue-600" size={32} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">ATS Score</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
            Check compatibility with Applicant Tracking Systems
          </p>
        </div>

        {/* Optimization Tips Card */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
          <div className="w-12 h-12 flex items-center justify-center mb-4">
            <LuTrendingUp className="text-emerald-500" size={32} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Optimization Tips</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
            Get actionable suggestions to improve your resume
          </p>
        </div>

        {/* Keyword Analysis Card */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
          <div className="w-12 h-12 flex items-center justify-center mb-4 text-purple-600">
            <div className="border-2 border-purple-600 rounded-lg p-1">
               <LuTarget size={24} />
            </div>
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Keyword Analysis</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
            Identify missing keywords for your target role
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;