import { Link, Outlet } from 'react-router-dom';
import { CiGrid42, CiBellOn, CiBookmark } from 'react-icons/ci';
import { FiFileText } from 'react-icons/fi';
import { PiMedal } from 'react-icons/pi';
import { FaCreditCard, FaCrown, FaUserTie } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { appContext } from '../../context/AppContext';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMenu } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { BiBriefcase } from 'react-icons/bi';
import {SiSmartthings} from 'react-icons/si'

function isActiveTab(path: string) {
  return window.location.pathname.includes(path);
}

interface RootState {
  alert: {
    unReadAlertsCount: number;
  };
}

export default function ProfileLayout() {
  const { windowSize, setWindowSize, userSidebarOpen, setUserSidebarOpen } = useContext(appContext);
  const unReadAlertsCount = useSelector((state: RootState) => {
    return state.alert.unReadAlertsCount;
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        {windowSize.width < 768 && (
          <button
            onClick={() => setUserSidebarOpen(true)}
            className="fixed z-20 bg-blue-200 rounded-md w-10 h-10 flex left-2 top-2 justify-center items-center"
          >
            <IoMenu color="gray" size={25} />
          </button>
        )}
        {/* Overlay for mobile when sidebar is open */}
        {userSidebarOpen && windowSize.width < 768 && (
          <div
            onClick={() => setUserSidebarOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40"
          ></div>
        )}
        {(userSidebarOpen || windowSize.width >= 768) && (
          <aside
            className={`fixed left-0 top-0 bg-gradient-to-br from-blue-500 to-indigo-600 w-64 h-screen flex flex-col
                ${windowSize.width < 768 ? 'z-50' : ''}
                ${userSidebarOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 transition-all duration-300 ease-in-out
                `}
          >
            {/* portion one */}
            <div className="brand border-b border-white/20 p-6 flex items-center justify-between">
              <Link to={'/'}>
                <div className="brand border-b border-white/10 flex items-center gap-3">
  {/* Logo Icon - Use your actual icon path here */}
  <img className="w-8 h-8 object-contain" src="/aspiro-icon.png" alt="Aspiro" />
  
  <p className="text-white text-2xl font-bold tracking-tight italic">
    Aspiro
  </p>
</div>
              </Link>
              {windowSize.width < 768 && (
                <button
                  onClick={() => setUserSidebarOpen(false)}
                  className="hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                  <AiOutlineClose color="white" size={22} />
                </button>
              )}
            </div>

            {/* portion one ends */}

            {/* portion 2 ui */}
            <ul className="px-3 mt-3 space-y-2 flex-1">
              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('personal') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/personal">
                  <div className="flex items-center gap-3">
                    <CiGrid42 size={25} />
                    <p className="text-sm font-medium">Overview</p>
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('documents') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/documents">
                  <div className="flex items-center gap-3">
                    <FiFileText size={25} />
                    <p className="text-sm font-medium">Documents</p>
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('my-applications') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/my-applications">
                  <div className="flex items-center gap-3">
                    <BiBriefcase size={25} />
                    <p className="text-sm font-medium">My Applications</p>
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('skills-experience') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/skills-experience">
                  <div className="flex items-center gap-3">
                    <PiMedal size={25} />
                    <p className="text-sm font-medium">Credentials</p>
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('saved') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/favorites">
                  <div className="flex items-center gap-3">
                    <CiBookmark size={25} />
                    <p className=" text-sm font-medium">Saved Items</p>
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('alerts') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/alerts">
                  <div className="flex items-center gap-3 relative">
                    <CiBellOn size={25} />
                    <p className="text-sm font-medium">Alerts</p>
                    {unReadAlertsCount > 0 && (
                      <span className="absolute  right-0 text-white bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {unReadAlertsCount}
                      </span>
                    )}
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('billings') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/billings">
                  <div className="flex items-center gap-3">
                    <FaCreditCard size={23} />
                    <p className="text-sm font-medium">My Billings</p>
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('aspiro-career') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/aspiro-career">
                  <div className="flex items-center gap-3 relative">
                    <SiSmartthings size={25} />
                    <p className="text-sm font-medium">Aspiro Career</p>
                    <FaCrown size={20} />
                  </div>
                </Link>
              </li>

              <li
                className={`rounded-lg px-2 py-2.5 transition-all ${isActiveTab('recruiter-profile') ? 'shadow-sm bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500 text-white'}`}
              >
                <Link to="/profile/recruiter/overview">
                  <div className="flex items-center gap-3 relative">
                    <FaUserTie size={25} />
                    <p className="text-sm font-medium">Aspiro Recruiter</p>
                    <FaCrown size={20} />
                  </div>
                </Link>
              </li>
            </ul>

            {/* portion 2 ui ends */}
            <div className="p-3">
              <div className="bg-white/10 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Need help?</p>
                <p className="text-[11px] mt-2 text-white/70 font-normal leading-relaxed">
                  Contact support team for assistance.
                </p>
                <button className="mt-3 bg-white w-full py-2 text-xs font-bold text-blue-500 rounded-lg hover:bg-blue-50 transition-colors shadow-md active:scale-95">
                  Contact Support
                </button>
              </div>
            </div>
          </aside>
        )}
        <div className="min-h-screen md:ms-64 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
