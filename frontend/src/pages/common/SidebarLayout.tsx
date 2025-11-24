import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Header/Sidebar";
import {CgProfile} from 'react-icons/cg'
import {CiLogout} from 'react-icons/ci'
import SuggessionBar from "../../components/user/SuggestionBar";
import Swal from "sweetalert2";
import { logout } from "../../redux-toolkit/candidateAuthSlice";
import { userLogout } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { appContext } from "../../context/AppContext";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";


export default function CommonLayout(){
    const {windowSize, setWindowSize, userSidebarOpen, setUserSidebarOpen} = useContext(appContext)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function logoutUser(){
            Swal.fire({
                icon:'info',
                title:'Logout?',
                text:'Are your sure your want to logout?',
                showConfirmButton:true,
                confirmButtonText:'Yes',
                showCancelButton:true,
                cancelButtonText:'No'
            }).then(async (result) => {
                if(result?.isConfirmed){
                    const logoutResult = await userLogout(dispatch, navigate)
                    dispatch(logout())
                    Swal.fire({
                        icon:'success',
                        title:'Logout',
                        text:'You have successfully logged out',
                        showConfirmButton:false,
                        showCancelButton:false,
                        timer:1500
                    }).then(() => navigate('/'))
                }else{
                    return
                }
            })
            
            
        }
    return(
        <div className="w-full min-h-screen">
            {/* ====== Mobile Menu Button ====== */}

            {/* ====== Overlay for Mobile ====== */}
            {(userSidebarOpen && windowSize.width < 768) && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setUserSidebarOpen(false)}
                ></div>
            )}

            {/* ====== Sidebar ====== */}
            <aside className={`
                w-64 fixed left-0 top-0 h-screen flex flex-col bg-gradient-to-br from-blue-600 to-blue-700
                transform transition-transform duration-300 ease-in-out z-50
                ${userSidebarOpen || windowSize.width >= 768 ? 'translate-x-0' : '-translate-x-full'}
                `}>
                <div className="brand p-3 border-b border-white">
                    <p className="text-white text-2xl font-light">Aspiro</p>
                </div>
                <Sidebar />
                <div className="flex-1 flex flex-col justify-end">
                    <div className="actions flex flex-col gap-3 border-t border-white px-3 py-5">
                    <Link to={'/profile/personal'}>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <CgProfile color="white" size={20} />
                            <p className="text-white text-sm">Profile</p>
                        </div>
                    </Link>
                    <div onClick={logoutUser} className="flex flex gap-2 mt-3 cursor-pointer">
                        <CiLogout color="white" size={20} />
                        <p className="text-white text-sm">Logout</p>
                    </div>
                </div>
                </div>
                {/* ====== Close button for mobile ====== */}
                {windowSize.width < 768 && (
                    <button onClick={() => setUserSidebarOpen(false)} className="absolute top-3 right-3 bg-blue-700 p-1 rounded-full">
                        <IoClose size={20} color="white" />
                    </button>
                )}
            </aside>

            {/* ====== Main Content ====== */}
            <div className={`min-h-screen bg-gray-100 transition-all duration-300 ease-in-out ${windowSize.width >= 768 ? 'ml-64' : ''}`}>
                <div className="flex relative p-2 md:p-10">
                    {windowSize.width < 768 && (
                    <div className="fixed top-4 left-4 z-[30]">
                        <div className="bg-white border border-gray-200 rounded-md p-2">
                            <button onClick={() => setUserSidebarOpen(true)} className="flex items-center gap-2">
                                <IoMdMenu size={18} color="gray" />
                                <p className="text-xs text-gray-700 ">Menu</p>
                            </button>
                        </div>
                    </div>
            )}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                
                    <div className="hidden lg:block w-90 p-3">
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
        
    )
}