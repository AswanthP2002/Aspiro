import { Link, Outlet } from "react-router-dom";
import { CiGrid42, CiHeart, CiBellOn } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import { PiSuitcaseLight, PiMedal } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { appContext } from "../../context/AppContext";
import { AiOutlineClose } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAlertsCount, increaseAlertsCount } from "../../redux/alertSlice";

function isActiveTab(path: string){
  return window.location.pathname.includes(path)
}

export default function ProfileLayout(){
    const {windowSize, setWindowSize, userSidebarOpen, setUserSidebarOpen} = useContext(appContext)
    const unReadAlertsCount = useSelector((state: any) => {
      return state.alert.unReadAlertsCount
    })
    const dispatcher = useDispatch()

    const addAlert = () => {
      dispatcher(increaseAlertsCount())
    }

    const readAlert = () => {
      dispatcher(decreaseAlertsCount())
    }

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return(
        <>
        <div className="w-full min-h-screen bg-gray-50">
          {
            windowSize.width < 768 && (
              <button onClick={() => setUserSidebarOpen(true)} className="fixed z-20 bg-blue-200 rounded-md w-10 h-10 flex left-2 top-2 justify-center items-center">
                <IoMenu color="gray" size={25} />
              </button>
            )
          }
          {/* Overlay for mobile when sidebar is open */}
          {userSidebarOpen && windowSize.width < 768 && (
            <div onClick={() => setUserSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-40"></div>
          )}
          {
            (userSidebarOpen || windowSize.width >= 768) && (
              <aside className={
                `fixed left-0 top-0 bg-gradient-to-br from-blue-500 to-indigo-600 w-64 h-screen flex flex-col
                ${windowSize.width < 768 ? 'z-50' : ''}
                ${userSidebarOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 transition-all duration-300 ease-in-out
                `
              }>
            <div className="brand border-b border-white p-3 flex items-center justify-between">
              <Link to={'/'}>
                <div className="brand flex gap-3 items-center cursor-pointer">
                  <img className="w-10" src="/aspiro-icon.png" alt="" />
                  <p className="text-white text-xl">Aspiro</p>
                </div>
              </Link>
              {
                windowSize.width < 768 && (
                  <button onClick={() => setUserSidebarOpen(false)}>
                    <AiOutlineClose color="white" size={22} />
                  </button>
                )
              }
            </div>
            <ul className="px-3 mt-3 space-y-2 flex-1">
              <li className={`rounded-md px-2 py-2 ${isActiveTab('personal') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/personal'>
                  <div className="flex items-center gap-2">
                    <CiGrid42 color="white" size={25} />
                    <p className="text-white text-sm font-light">Overview</p>
                  </div>
                </Link>
              </li>

              <li className={`rounded-md px-2 py-2 hover:bg-blue-500 hover:shadow-lg ${isActiveTab('documents') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/documents'>
                  <div className="flex items-center gap-2">
                    <FiFileText color="white" size={25} />
                    <p className="text-white text-sm font-light">Documents</p>
                  </div>
                </Link>
              </li>

              <li className={`rounded-md px-2 py-2 hover:bg-blue-500 hover:shadow-lg ${isActiveTab('/profile/my-applications') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/my-applications'>
                  <div className="flex items-center gap-2">
                    <PiSuitcaseLight color="white" size={25} />
                    <p className="text-white text-sm font-light">My Applications</p>
                  </div>
                </Link>
              </li>

              <li className={`rounded-md px-2 py-2 hover:bg-blue-500 hover:shadow-lg ${isActiveTab('skills-experience') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/skills-experience'>
                  <div className="flex items-center gap-2">
                    <PiMedal color="white" size={25} />
                    <p className="text-white text-sm font-light">Skills & Experiences</p>
                  </div>
                </Link>
              </li>

              <li className={`rounded-md px-2 py-2 hover:bg-blue-500 hover:shadow-lg ${isActiveTab('saved') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/favorites'>
                  <div className="flex items-center gap-2">
                    <CiHeart color="white" size={25} />
                    <p className="text-white text-sm font-light">Saved Jobs</p>
                  </div>
                </Link>
              </li>

              <li className={`rounded-md px-2 py-2 hover:bg-blue-500 hover:shadow-lg ${isActiveTab('alerts') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/alerts'>
                  <div className="flex items-center gap-2 relative">
                    <CiBellOn color="white" size={25} />
                    <p className="text-white text-sm font-light">Alerts</p>
                    {
                      unReadAlertsCount > 0 && (<span className="absolute  right-0 text-white bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">{unReadAlertsCount}</span>)
                    }
                  </div>
                </Link>
              </li>

              <li className={`rounded-md px-2 py-2 hover:bg-blue-500 hover:shadow-lg ${isActiveTab('recruiter-profile') ? 'shadow-lg bg-blue-500' : 'shadow-none'}`}>
                <Link to='/profile/recruiter/overview'>
                  <div className="flex items-center gap-2">
                    <FaUserTie color="white" size={25} />
                    <p className="text-white text-sm font-light">Aspiro Recruiter</p>
                  </div>
                </Link>
              </li>
            </ul>
            <div>
              <div className="p-3">
                <div className="bg-blue-500 rounded-md p-4">
                  <p className="text-sm font-medium text-white">Need help?</p>
                  <p className="text-xs mt-2 text-white font-light">Contact support team for assistance.</p>
                  <button className="mt-2 bg-white w-full text-xs text-blue-500 rounded-md p-1">Contact Support</button>
                  <div className="mt-1 space-x-2">
                    <button onClick={addAlert} className="text-xs border border-gray-200 rounded-md px-3 py-1">Add Alert</button>
                    <button onClick={readAlert} className="text-xs border border-gray-200 rounded-md px-3 py-1">Read Alert</button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
            )
          }
          <div className="min-h-screen md:ms-64 bg-gray-100">
            <Outlet />
          </div>
        </div>
        {/* <div className="flex">
        <aside className="w-75 bg-gradient-to-br from-blue-500 to-indigo-600 min-h-screen border-r border-gray-300 !px-15 !pt-10">
          <Link to={'/'}>
            <div className="brand flex gap-3 items-center cursor-pointer">
            <img className="w-12" src="/aspiro-icon.png" alt="" />
            <p className="text-white font-semibold text-3xl">Aspiro</p>
          </div>
          </Link>
          <ul className="space-y-2 py-4">
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/personal'}><i className="fa-solid fa-boxes-stacked group-hover:!text-blue-500 me-3 !text-white"></i>Overview</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/candidate/profile/documents'}><i className="fa-solid fa-file group-hover:!text-blue-500 me-3 !text-white"></i>Documents</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/my-applications'}><i className="fa-solid fa-paper-plane group-hover:!text-blue-500 me-3 !text-white"></i>My Applications</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/skills-experience'}><i className="fa-solid fa-brain group-hover:!text-blue-500 me-3 !text-white"></i>Skills & Experience</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/favorites'}><i className="fa-solid fa-bookmark group-hover:!text-blue-500 me-3 !text-white"></i>Favorites</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/notifications'}><i className="fa-solid fa-bell group-hover:!text-blue-500 me-3 !text-white"></i>Alerts</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/recruiter/overview'}><i className="fa-solid group-hover:!text-blue-500 fa-user-tie me-3 !text-white"></i>Aspiro Recruiter</Link></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div> */}
        </>
    )
}