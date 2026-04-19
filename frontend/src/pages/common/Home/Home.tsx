import landingPageImage from '/Illustration.png'
import './Home.css'
import jobVacancies from '../../../assets/data/dummyjobvacancies'
import React, { useState } from 'react'
import Tile from '../../../components/common/Tile'
import TileGuide from '../../../components/common/TileGuide'
import { guideData } from '../../../assets/data/guideData'
import {FaConnectdevelop} from 'react-icons/fa'
import {PiBuildingOfficeFill, PiRocket, PiSuitcase} from 'react-icons/pi'
import arrowupdown from '/Arrows-up-down.png'
import arrowdownup from '/Arrows-down-up.png'
import { useNavigate } from 'react-router-dom'
import { IoChatbubble, IoLocation, IoSearch } from 'react-icons/io5'
import { LuUsers } from 'react-icons/lu'
import { FaShareNodes } from 'react-icons/fa6'
import { BiLineChart, BiMedal } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'


export default function Home(){
    const [jobvacancies, setjobvacancies] = useState(jobVacancies)
    const [tileguideData, settileguideData] = useState(guideData)

    const cardData = [
        {
        id:1,
        title:"Jobs",
        count:10000,
        icon:<PiSuitcase size={25} color='white' />
    },
    {
        id:2,
        title:"Companies",
        count:5000,
        icon:<PiBuildingOfficeFill size={25} color='white' />
    },
    {
        id:3,
        title:"Candidates",
        count:7000,
        icon:<LuUsers size={25} color='white' />
    },
    {
        id:4,
        title:"Internships",
        count:8500,
        icon:<FaConnectdevelop size={25} color='white' />
    }
    ]

    const cardDataTwo = [
        {
            id:1,
            icon: <PiRocket />,
            title:'Find Opportunities',
            text:'Discover job opportunities which matches your skills and career goals'
        },
        {
            id:2,
            icon: <FaShareNodes />,
            title:'Build Your network',
            text:'Connect with other peoples in your industry'
        },
        {
            id:3,
            icon: <IoChatbubble />,
            title:'Share and engage',
            text:'Post updates, share your achivements and engange with the community'
        },
        {
            id:4, 
            icon:<BiLineChart />,
            title:'Grow your skills',
            text:'Take special reviews on your knowledge both Technical and non-technical'
        },
        {
            id:5, 
            icon:<LuUsers />,
            title:'Join Communities',
            text:'Be a part of groups and communities that aligns your interests'
        },
        {
            id:6, 
            icon:<BiMedal />,
            title:'Get Recognized',
            text:'Showcase your works, experiences, skills and achievements, build your professional reputation'
        }
    ]

    const navigator = useNavigate()

    return(
        <>
        <section className="w-full bg-slate-50 pt-16 pb-24 md:pt-24 md:pb-32 relative overflow-hidden">
  {/* Abstract Background Blur */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-0"></div>

  <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Content Side */}
      <div className="flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Now Hiring: 500+ New Roles
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
          Level up your career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Aspiro</span>
        </h1>
        
        <p className="mt-6 text-lg text-slate-600 font-light max-w-lg">
          Connect with industry leaders, expand your professional network, and discover opportunities that match your ambition.
        </p>

        {/* Professional Search Bar */}
        <div className="mt-10 bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col lg:flex-row gap-2 transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
          <div className="flex-1 flex gap-3 items-center px-4 py-3 border-b lg:border-b-0 lg:border-r border-slate-100">
            <IoSearch className="text-blue-600" size={20} />
            <input 
              type="text" 
              placeholder="Job title or keyword" 
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm" 
            />
          </div>
          
          <div className="flex-1 flex gap-3 items-center px-4 py-3">
            <IoLocation className="text-blue-600" size={20} />
            <input 
              type="text" 
              placeholder="City or remote" 
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm" 
            />
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-200">
            Find Jobs
          </button>
        </div>

        <p className="text-slate-500 text-xs mt-4 flex gap-2">
          <span className="font-semibold text-slate-400 uppercase tracking-tighter">Popular:</span> 
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Designer,</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Developer,</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Marketing</span>
        </p>
      </div>

      {/* Image Side */}
      <div className="hidden md:flex justify-center relative">
        {/* Floating Stat Card (Adds Professional Polish) */}
        <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-2xl animate-bounce-slow z-20 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600 font-bold">✓</div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Success Rate</p>
              <p className="text-sm font-black text-slate-800">92% Hired</p>
            </div>
          </div>
        </div>
        
        <img 
          src={landingPageImage} 
          className="relative z-10 w-full max-w-lg drop-shadow-2xl" 
          alt="Aspiro Platform Dashboard" 
        />
      </div>
    </div>

    {/* Featured Tiles Section */}
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData?.map((data, index) => (
        <Tile key={index} tileData={data} />
      ))}
    </div>
  </div>
        </section>
        <section className="w-full py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    
    {/* Section Header with "View All" Link */}
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
      <div className="max-w-2xl">
        <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">
          Explore by Category
        </h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Most popular vacancies
        </h3>
      </div>
      <button className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-2 transition-all">
        View all categories <span className="text-lg">→</span>
      </button>
    </div>

    {/* Job Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {jobvacancies.map((job, index) => (
        <div 
          key={index} 
          className="group bg-white flex gap-4 items-center border border-slate-100 p-5 rounded-2xl hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          {/* Icon with "Active" Background */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex justify-center items-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
            <PiSuitcase size={24} />
          </div>
          
          <div className="overflow-hidden">
            <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
              {job.jobRole}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-xs font-medium text-slate-500">
                {job.vacancies} New Openings
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        <section className="w-full bg-white py-20">
            <div className="container w-full px-2 md:px-20 py-5">
                <p className="text-3xl text-center md:text-4xl font-bold text-slate-900 mb-6">How Aspiro Works</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ap-10 relative">
                    {
                        tileguideData.map((data, index : number) => {
                            return <TileGuide key={index} data={data} />
                        })
                    }

                    <img src={arrowupdown} alt="" className='absolute left-60 hidden lg:block' />
                    <img src={arrowdownup} alt="" className='absolute left-145 top-20 hidden lg:block' />
                    <img src={arrowupdown} alt="" className='absolute right-60 hidden lg:block' />

                </div>
            </div>
        </section>
        <section className="w-full bg-slate-50 py-24 relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform translate-x-20"></div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: The "Hook" */}
            <div className="lg:col-span-5">
                <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">
                    About the Platform
                </h2>
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                    Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Aspiro?</span>
                </h3>
                <div className="mt-8 w-20 h-1.5 bg-blue-600 rounded-full"></div>
            </div>

            {/* Right Side: The Content */}
            <div className="lg:col-span-7">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light mb-8">
                    Aspiro is your gateway to <span className="text-slate-900 font-medium">real-world experience</span>, 
                    bridging the gap between talented students and industry-leading companies.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 p-1 rounded-full text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="text-slate-600"><span className="font-bold text-slate-800">Hands-on Experience:</span> Mini-projects and internships that build your portfolio.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 p-1 rounded-full text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="text-slate-600"><span className="font-bold text-slate-800">Seamless Hiring:</span> Apply to top companies with a streamlined application process.</p>
                    </div>
                </div>

                <p className="mt-8 text-slate-500 italic text-sm border-l-4 border-blue-200 pl-4">
                    Whether it's internships or dream jobs, we help you grow faster and stay connected with the social world.
                </p>
            </div>

        </div>
    </div>
</section>
        <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
            The Aspiro Advantage
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Your all-in-one Career & Social platform
          </p>
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed text-lg font-light">
            Aspiro combines professional networking with opportunity discovery 
            to help you build your career while staying connected with the social world.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardDataTwo.map((data, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl border border-transparent shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Container with Soft Glow */}
              <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(data.icon as React.ReactElement, { size: 24 })}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {data.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed font-light">
                {data.text}
              </p>
              
              {/* Added a subtle "Learn More" link for professional polish */}
              <div className="mt-6 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
        <section className="px-5 md:px-10 py-16 bg-white">
      <div className="max-w-6xl mx-auto overflow-hidden relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 px-8 py-16 md:px-20 md:py-24 shadow-2xl">
        
        {/* Subtle Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to start your journey?
          </h2>
          
          <p className="max-w-2xl text-lg text-blue-100 font-light leading-relaxed">
            Join thousands of professionals building their careers, 
            finding opportunities, and growing their networks on <span className="font-semibold text-white">Aspiro.</span>
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigator('/register')} 
              className="group bg-white hover:bg-blue-50 text-blue-700 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get started for free
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            {/* Added a secondary action for professional look */}
            <button className="text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
        <footer className="bg-[#0b0f19] pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Brand Section */}
        <div className="md:col-span-4 flex flex-col items-start">
          <p className="text-3xl text-white font-semibold tracking-tight">Aspiro</p>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            Connecting talent with opportunity. The all-in-one platform for career growth and professional networking.
          </p>
          <div className="flex gap-4 mt-6">
            {[FiInstagram, FiLinkedin, FiTwitter, FiFacebook].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              <li className="hover:text-white cursor-pointer transition-colors">System Status</li>
            </ul>
          </div>

          <div className="md:col-span-4">
  <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
    Stay Updated
  </h4>
  <p className="text-sm mb-4">
    Get the latest job opportunities and career tips delivered to your inbox.
  </p>
  <form className="flex flex-col gap-2">
    <div className="relative">
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-all"
      />
    </div>
    <button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-md transition-colors"
    >
      Subscribe
    </button>
  </form>
</div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs uppercase tracking-widest">
            &copy; 2026 Aspiro | Empowering the next generation
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer">Security</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
 </>
    )
}