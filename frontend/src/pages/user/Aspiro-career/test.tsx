import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Save, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Phone,
  Linkedin,
  Globe,
  MapPin
} from 'lucide-react';

const ATSPreviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans antialiased">
      {/* Top Header / Actions */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900">Resume Preview</h1>
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 uppercase tracking-wider">
              <CheckCircle size={12} /> Optimized for ATS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-slate-600 text-sm font-semibold px-4 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-2 border border-slate-200">
            <Save size={16} /> Save as Draft
          </button>
          <button className="bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-md flex items-center gap-2 transition-all">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center">
        
        {/* ATS Score Floating Widget */}
        <div className="w-[210mm] mb-6 flex justify-between items-end">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs font-bold text-slate-600">ATS Score: <span className="text-blue-600">94/100</span></span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium italic">
            * This preview reflects the final PDF structure.
          </p>
        </div>

        {/* The "Paper" - ATS Standard Template */}
        <div className="w-[210mm] min-h-[297mm] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] p-[20mm] text-[#111] leading-relaxed select-none pointer-events-none">
          
          {/* Header: Centered & Clean */}
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">Aswanth P</h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-700">
              <span className="flex items-center gap-1"><Mail size={10}/> aswanth@example.com</span>
              <span className="flex items-center gap-1"><Phone size={10}/> +91 9876543210</span>
              <span className="flex items-center gap-1"><MapPin size={10}/> Valanchery, Kerala</span>
              <span className="flex items-center gap-1"><Linkedin size={10}/> linkedin.com/in/aswanth</span>
              <span className="flex items-center gap-1"><Globe size={10}/> aswanth.dev</span>
            </div>
          </header>

          <div className="space-y-6">
            {/* Professional Summary */}
            <section>
              <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-2 tracking-widest">Professional Summary</h2>
              <p className="text-[11px] text-justify">
                Full-Stack Developer specializing in the MERN stack with a strong focus on Clean Architecture and SOLID principles. 
                Proven track record in building scalable web applications and implementing complex features like real-time notifications 
                and AI-driven modules. Dedicated to high-performance code and professional software patterns.
              </p>
            </section>

            {/* Work Experience */}
            <section>
              <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-3 tracking-widest">Experience</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[12px] font-bold">Full-Stack Developer Intern</h3>
                    <span className="text-[10px] font-bold">Jan 2026 — Present</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="text-[11px] font-bold italic text-slate-700">Aspiro Platform (Self-Project)</p>
                    <span className="text-[10px] text-slate-500 italic">Remote</span>
                  </div>
                  <ul className="list-disc ml-4 text-[10px] text-slate-700 space-y-1">
                    <li>Architected a professional job opportunity platform using React, TypeScript, and Node.js.</li>
                    <li>Integrated Amazon S3 for secure file storage and Socket.io for real-time user engagement.</li>
                    <li>Designed an ATS-compliant resume builder with AI optimization tools.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-3 tracking-widest">Education</h2>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[11px] font-bold">Software Development Training</h3>
                <span className="text-[10px]">2025 — 2026</span>
              </div>
              <p className="text-[10px] text-slate-700">Brototype Institution</p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-2 tracking-widest">Technical Skills</h2>
              <p className="text-[10px] text-slate-700">
                <span className="font-bold">Languages:</span> TypeScript, JavaScript (ES6+), HTML5, CSS3<br/>
                <span className="font-bold">Frameworks/Libraries:</span> React.js, Node.js, Express.js, Tailwind CSS<br/>
                <span className="font-bold">Database & Tools:</span> MongoDB, Amazon S3, Socket.io, Git, Clean Architecture
              </p>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-2 tracking-widest">Certifications</h2>
              <ul className="text-[10px] text-slate-700 space-y-0.5">
                <li>• AWS Certified Solutions Architect (In Progress)</li>
                <li>• MERN Stack Development Certification — Brototype</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Bottom Feedback */}
        <div className="w-[210mm] mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 items-start">
          <AlertCircle className="text-blue-500 shrink-0" size={18} />
          <div>
            <h4 className="text-xs font-bold text-blue-900 mb-1">Why this layout?</h4>
            <p className="text-[10px] text-blue-700 leading-relaxed">
              We use a single-column, text-heavy layout because Applicant Tracking Systems (ATS) scan resumes from top-to-bottom. 
              Avoid multi-column designs or images ensures your data is read correctly by 99% of hiring software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSPreviewPage;