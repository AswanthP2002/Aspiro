import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Header/Sidebar';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import SuggessionBar from '../../components/user/SuggestionBar';
import Swal from 'sweetalert2';
import { logout } from '../../redux/candidateAuthSlice';
import { userLogout } from '../../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { appContext } from '../../context/AppContext';
import { IoMdMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

interface RootState {
  userAuth: {
    user: {
      name: string;
      profilePicture: string;
    };
  };
}

export default function CommonLayout() {
  const { windowSize, setWindowSize, userSidebarOpen, setUserSidebarOpen } = useContext(appContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logedUser = useSelector((state: RootState) => {
    return state.userAuth.user;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logoutUser() {
    Swal.fire({
      icon: 'info',
      title: 'Logout?',
      text: 'Are your sure your want to logout?',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result?.isConfirmed) {
        await userLogout(dispatch, navigate);
        dispatch(logout());
        Swal.fire({
          icon: 'success',
          title: 'Logout',
          text: 'You have successfully logged out',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500,
        }).then(() => navigate('/'));
      } else {
        return;
      }
    });
  }
  return (
    <div className="w-full min-h-screen">
      {userSidebarOpen && windowSize.width < 768 && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setUserSidebarOpen(false)}
        ></div>
      )}

      {/* ====== Sidebar ====== */}
      <aside
        className={`
                w-64 fixed left-0 top-0 h-screen flex flex-col bg-gradient-to-br from-blue-600 to-blue-700
                transform transition-transform duration-300 ease-in-out z-50
                ${userSidebarOpen || windowSize.width >= 768 ? 'translate-x-0' : '-translate-x-full'}
                `}
      >
        <div className="brand p-6 border-b border-white/10 flex items-center gap-3">
          <img className="w-8 h-8 object-contain" src="/aspiro-icon.png" alt="Aspiro" />

          <p className="text-white text-2xl font-bold tracking-tight italic">Aspiro</p>
        </div>
        <Sidebar />
        <div className="mt-auto border-t border-white/20 px-3 py-4 bg-white/5">
          <div className="actions flex flex-col gap-1">
            {/* Profile */}

            <Link to={'/profile/personal'} className="group">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <CgProfile color="white" size={20} />
                </div>

                <p className="text-white text-sm font-semibold tracking-tight truncate">
                  {logedUser.name}
                </p>
              </div>
            </Link>

            <div
              onClick={logoutUser}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-500/20 group cursor-pointer transition-all mt-1"
            >
              <div className="p-1.5">
                <CiLogout className="text-white group-hover:text-red-400" size={20} />
              </div>

              <p className="text-white group-hover:text-red-400 text-sm font-medium">Logout</p>
            </div>
          </div>
        </div>

        {windowSize.width < 768 && (
          <button
            onClick={() => setUserSidebarOpen(false)}
            className="absolute top-3 right-3 bg-blue-700 p-1 rounded-full"
          >
            <IoClose size={20} color="white" />
          </button>
        )}
      </aside>

      {/* ====== Main Content ====== */}
      <div
        className={`min-h-screen bg-gray-100 transition-all duration-300 ease-in-out ${windowSize.width >= 768 ? 'ml-64' : ''}`}
      >
        <div className="flex relative p-2 md:p-10">
          {windowSize.width < 768 && (
            <div className="fixed top-4 left-4 z-[30]">
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <button
                  onClick={() => setUserSidebarOpen(true)}
                  className="flex items-center gap-2"
                >
                  <IoMdMenu size={18} color="gray" />
                  <p className="text-xs text-gray-700 ">Menu</p>
                </button>
              </div>
            </div>
          )}
          <div className="flex-1">
            <Outlet />
          </div>

          <div className="hidden lg:block w-90 px-3">
            <SuggessionBar />
          </div>
        </div>
      </div>
    </div>
    // <div className="relative">
    //     <aside className="bg-gradient-to-br flex flex-col justify-between !pb-10 from-blue-500 to-indigo-600 fixed h-screen w-70 ">
    //         <div>
    //             <div className="brand !ms-12 !mt-10">
    //                 <p className="text-white font-semibold text-3xl">Aspiro</p>
    //             </div>
    //             <Sidebar />
    //         </div>

    //     </aside>
    //     {/* This will be content part from */}

    // </div>
  );
}
