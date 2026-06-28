import { BiCheckCircle, BiChevronDown, BiDownload } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
import { LuFileText, LuLayoutDashboard, LuPlus, LuStar } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const ResumeToolsPage = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-[#1E293B]">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide mb-1">Smart Resume Tools</h1>
        <p className="text-gray-500 text-sm">Create, analyze, and optimize your resumes with AI-powered tools</p>
      </header>

      {/* Top Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* <ActionCard
          url={""}
          icon={<LuPlus className="text-white w-6 h-6" />} 
          iconBg="bg-blue-500"
          title="Create a new Resume" 
          desc="Build a professional resume from scratch" 
        /> */}
        <ActionCard
          url={"auto-create"}
          icon={<LuStar className="text-white w-6 h-6" />} 
          iconBg="bg-purple-600"
          title="Generate from profile" 
          desc="Auto create resume from your profile data" 
        />
        <ActionCard
          url={"analyze"}
          icon={<LuLayoutDashboard className="text-white w-6 h-6" />} 
          iconBg="bg-emerald-500"
          title="Analyze Resume" 
          desc="Get ATS score and optimization tips" 
        />
      </div>

      <div className="flex justify-end mb-8">
        <button onClick={() => navigate('auto-create')} className="flex items-center gap-2 bg-blue-600 text-white p-3 rounded-md shadow-xl">
          <LuPlus size={18} /> Create new resume
        </button>
      </div>

      {/* Resume Lists */}
      <section className="space-y-12">
        <ResumeSection title="Drafts (1)">
          <ResumeCard 
            title="Full stack Developer" 
            template="Classic" 
            date="3 days ago" 
            status="Draft" 
            score={78} 
            scoreText="Good, minor improvement recommended"
          />
        </ResumeSection>

        <ResumeSection title="Created (1)">
          <ResumeCard 
            title="Front end Developer" 
            template="Classic" 
            date="5 days ago" 
            status="Completed" 
            score={92} 
            scoreText="Excellent, your resume is highly optimized"
          />
        </ResumeSection>
      </section>

      {/* Resume Tips Footer */}
      <footer className="mt-12 bg-[#E0F2FE] border border-[#BAE6FD] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-[#0369A1] font-semibold">
          <LuFileText size={20} />
          <h3>Resume Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-[#0369A1]">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <BiCheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </footer>
    </div>
    </>
  );
};

// Sub-Components
const ActionCard = ({ icon, iconBg, title, desc, url }) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(url)} className="bg-white p-5 rounded-lg border border-slate-200 shadow-[0_0_30px_2px_rgba(100,0,200,0.1)] flex items-center gap-4 hover:border-blue-300 cursor-pointer transition-all">
      <div className={`${iconBg} p-3 rounded-lg shadow-inner`}>{icon}</div>
      <div>
        <h3 className="font-bold text-sm tracking-wide">{title}</h3>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  );
};
const ResumeSection = ({ title, children }) => (
  <div>
    <p className='font-semibold text-lg my-3 text-gray-800'>{title}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

const ResumeCard = ({ title, template, date, status, score, scoreText }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-[0_0_30px_2px_rgba(100,0,200,0.1)] relative group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className='font-semibold'>{title}</p>
        <p className="text-xs text-gray-400">{template} • {date}</p>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <BiChevronDown size={20} />
      </button>
    </div>

    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-6 ${
      status === 'Draft' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
    }`}>
      {status === 'Draft' ? 'Draft' : 'Completed'}
    </div>

    <div className="mb-6">
      <div className="flex justify-between items-end mb-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ATS score</span>
        <span className="text-xs font-bold text-blue-600">{score}%</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className="bg-black h-full" style={{ width: `${score}%` }}></div>
      </div>
      <p className="text-[10px] mt-2 text-gray-500 italic">{scoreText}</p>
    </div>

    <div className="grid grid-cols-3 gap-2">
      <button className="flex items-center justify-center gap-1 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
        <FiEdit3 size={14} /> Edit
      </button>
      <button className="flex items-center justify-center gap-1 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
        <BsEye size={14} /> Preview
      </button>
      <button className="flex items-center justify-center gap-1 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
        <BiDownload size={14} /> Download
      </button>
    </div>
  </div>
);

const tips = [
  "Use Action verbs to start bullet points",
  "Quantify achievements with numbers",
  "Keep it concise (1-2 pages maximum)",
  "Tailor for each job application",
  "Proofread carefully for errors"
];

export default ResumeToolsPage;