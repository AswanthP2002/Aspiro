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



export default function CommonLayout(){
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
        <div className="relative">
            <aside className="bg-gradient-to-br flex flex-col justify-between !pb-10 from-blue-500 to-indigo-600 fixed h-screen w-70 ">
                <div>
                    <div className="brand !ms-12 !mt-10">
                        <p className="text-white font-semibold text-3xl">Aspiro</p>
                    </div>
                    <Sidebar />
                </div>
                <div className="actions bg-white rounded !mx-5 !mt-5 !p-2">
                    <Link to={'/profile/personal'}>
                        <div className="flex flex gap-2 cursor-pointer">
                            <CgProfile color="blue" size={25} />
                            <p className="text-blue-500">Profile</p>
                        </div>
                    </Link>
                    <div onClick={logoutUser} className="flex flex gap-2 mt-3 cursor-pointer">
                        <CiLogout color="blue" size={25} />
                        <p className="text-blue-500">Logout</p>
                    </div>
                </div>
            </aside>
            {/* This will be content part from */}
            <div className="flex ms-70 relative">
                <div className="flex-1">
                    <Outlet />
                </div>
                {/* This will be content part to  */}
                <div className="w-90 !me-5">
                    <SuggessionBar />
                </div>
            </div>
        </div>
        // <div className="flex flex-col h-screen">
        //     <div className="flex flex-1 overflow">
        //         <aside className="!h-screen w-70 border-r border-gray-200">
        //             <div className="brand !px-10 !pt-7 cursor-pointer">
        //                 <p className="text-4xl text-blue-500 font-semibold">Aspiro</p>
        //             </div>
        //             <Sidebar />
        //         </aside>

        //         {/* stoped at feed implementation and layout refactoring need to fix tomorrow
        //             * feed fix
        //             * subscription management
        //             * recruiter role enabling
        //         */}
        //         <Outlet />
        //     </div>
        // </div>
    )
}