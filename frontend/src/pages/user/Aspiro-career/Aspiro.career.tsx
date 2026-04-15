import React from 'react';
import { LuArrowRight, LuFileText, LuMessageSquare } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const AspiroCareer = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Aspiro Career
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Elevate your professional journey. Choose a path below to start building your future, 
          from perfecting your technical resume to mastering real-world interview scenarios.
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-auto max-w-4xl">
        
        {/* Card 1: Resume Tools */}
        <div className="group relative bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="mb-5 inline-block p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
            <LuFileText className="w-8 h-8 text-blue-600 group-hover:text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Resume Tools</h2>
          <p className="text-gray-600 mb-6">
            Build a clean, ATS-friendly resume that highlights your core competencies and projects without the fluff.
          </p>
          <div onClick={() => navigate('resume-tools')} className="flex items-center text-blue-600 font-medium">
            Get Started <LuArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Practice Interviews */}
        <div className="group relative bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="mb-5 inline-block p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-600 transition-colors duration-300">
            <LuMessageSquare className="w-8 h-8 text-emerald-600 group-hover:text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Practice Interviews</h2>
          <p className="text-gray-600 mb-6">
            Sharpen your responses and technical explanations through interactive, AI-driven mock interview sessions.
          </p>
          <div onClick={() => navigate('interview')} className="flex items-center text-emerald-600 font-medium">
            Start Practice <LuArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Simple Footer/Status */}
      <div className="mt-16 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Aspiro Platform
      </div>
    </div>
  );
};

export default AspiroCareer;