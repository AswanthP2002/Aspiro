import { useEffect, useState } from "react"
import { BiInfoCircle, BiXCircle } from "react-icons/bi"
import { DetailedResumeAnalysisAiData } from "../../../types/entityTypes"
import { useLocation } from "react-router-dom"

export default function DetailedAnalysisReportPage(){
    const [activeSection, setActiveSsection] = useState<'feedback' | 'keywords' | 'section-analysis'>('feedback')
    const [detailedAnalysisReportData, setDetailedAnalysisReportData] = useState<DetailedResumeAnalysisAiData | null>(null)

    const location = useLocation()
    const {data} = location.state || {}

    useEffect(() => {
        if(data){
            console.log('--response from the backend', data)
            setDetailedAnalysisReportData(data)
        }
    }, [data])

    return(
        <>
            <div className="min-h-screen bg-gray-50 px-5 lg:px-20 py-15">
                <div className="border bg-white border-slate-300 rounded-md p-5">
                    <p>Analysis Report</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-blue-50 flex flex-col items-center p-5 lg:p-10 gap-2 rounded-md">
                            <p className={`text-3xl font-bold text-green-500`}>{detailedAnalysisReportData?.overallScore}</p>
                            <p className="text-sm text-slate-500">Overall Score</p>
                            <div className={`bg-green-500 text-white text-xs px-3 rounded-full`}>{detailedAnalysisReportData?.overallScore > 70 ? "Good" : "Ok"}</div>
                        </div>
                        <div>
                            <div className="flex flex-col items-end">
                                <div className="flex justify-between w-full items-base-line">
                                    <p className="text-xs text-slate-500">Ats Compatiability</p>
                                    <p className="font-medium text-sm text-blue-500">{detailedAnalysisReportData?.metrics?.atsCompatibility}</p>
                                </div>
                                <div className="w-full h-2 bg-gray-300 rounded-full">
                                    <div className={`w-[${detailedAnalysisReportData?.metrics?.atsCompatibility}%] rounded-full h-full bg-black`}></div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="flex justify-between w-full items-base-line">
                                    <p className="text-xs text-slate-500">Content Quality</p>
                                    <p className="font-medium text-sm text-blue-500">{detailedAnalysisReportData?.metrics?.contentQuality}</p>
                                </div>
                                <div className="w-full h-2 bg-gray-300 rounded-full">
                                    <div className={`w-[${detailedAnalysisReportData?.metrics?.contentQuality}%] rounded-full h-full bg-black`}></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col items-end">
                                <div className="flex justify-between w-full items-base-line">
                                    <p className="text-xs text-slate-500">Format Structure</p>
                                    <p className="font-medium text-sm text-blue-500">{detailedAnalysisReportData?.metrics?.formatStructure}</p>
                                </div>
                                <div className="w-full h-2 bg-gray-300 rounded-full">
                                    <div className={`w-[${detailedAnalysisReportData?.metrics?.formatStructure}%] rounded-full h-full bg-black`}></div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="flex justify-between w-full items-base-line">
                                    <p className="text-xs text-slate-500">Keyword Match</p>
                                    <p className="font-medium text-sm text-blue-500">{detailedAnalysisReportData?.metrics?.keywordMatch}</p>
                                </div>
                                <div className="w-full h-2 bg-gray-300 rounded-full">
                                    <div className={`w-[${detailedAnalysisReportData?.metrics?.keywordMatch}%] rounded-full h-full bg-black`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="text-xs flex p-1 rounded-full w-fit bg-slate-200">
                        <button onClick={() => setActiveSsection('feedback')} className={`${activeSection === 'feedback' ? "bg-white" : ""} p-2 rounded-full`}>Feedback</button>
                        <button onClick={() => setActiveSsection('keywords')} className={`${activeSection === 'keywords' ? "bg-white" : ""} p-2 rounded-full`}>Keywords</button>
                        <button onClick={() => setActiveSsection('section-analysis')} className={`${activeSection === 'section-analysis' ? "bg-white" : ""} p-2 rounded-full`}>Section Analysis</button>
                    </div>

                    <section className="mt-5">
                        {activeSection === 'feedback' && (
                            <div className="space-y-3">
                                <div className="p-5 bg-red-50 ring-1 ring-red-400 rounded-md">
                                    <div className="flex items-center gap-2 text-sm">
                                        <BiXCircle color="red" size={20} />
                                        <p>Crittical Issues</p>
                                    </div>
                                    <ul className="mt-3 list-disc space-y-1">
                                        {detailedAnalysisReportData?.feedback?.criticalIssues.map((s: string, i: number) => (
                                            <li className="text-xs ms-5" key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-5 bg-orange-50 ring-1 ring-orange-400 rounded-md">
                                    <div className="flex items-center gap-2 text-sm">
                                        <BiInfoCircle color="orange" size={20} />
                                        <p>Recommendations</p>
                                    </div>
                                    <ul className="mt-3 list-disc space-y-1">
                                        {detailedAnalysisReportData?.feedback?.recommendations.map((s: string, i: number) => (
                                            <li className="text-xs ms-5" key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeSection === 'keywords' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="p-5 bg-white border border-slate-200 rounded-md">
                                    <div className="flex items-center gap-2 text-sm">
                                        <p>Founded Keywords (3)</p>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {detailedAnalysisReportData?.keywords?.found.map((s: string, i: number) => (
                                            <span className="text-xs bg-green-100 ring-1 ring-green-300 px-2 py-1 rounded-md text-green-800" key={i}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-5 bg-white border border-slate-200 rounded-md">
                                    <div className="flex items-center gap-2 text-sm">
                                        <p>Missing Keywords (3)</p>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {detailedAnalysisReportData?.keywords?.missing.map((s: string, i: number) => (
                                            <span className="text-xs bg-orange-100 ring-1 ring-orange-300 px-2 py-1 rounded-md text-orange-800" key={i}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'section-analysis' && (
                            <div className="bg-white p-5 rounded-md border border-gray-200">
                                <p className="text-sm">Section Break down</p>
                                <div className="mt-5 gap-2 space-y-2">
                                    {detailedAnalysisReportData?.sectionAnalysis.map((s) => (
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs">{s.section} <span className="text-[10px] bg-orange-100 px-2 rounded-full ring-1 ring-orange-400">{s.status}</span></p>
                                                <p className="text-xs font-medium">{s.score}</p>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                                                <div className={`h-full w-[${s.score}%] bg-black rounded-md`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}