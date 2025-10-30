import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {CgProfile} from 'react-icons/cg'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {FaCirclePlus} from 'react-icons/fa6'
import { logout } from "../../../redux-toolkit/userAuthSlice"
import Swal from "sweetalert2"
import { userLogout, getNotifications } from "../../../services/userServices"
import { useContext, useEffect, useState } from "react"
import { appContext } from "../../../context/AppContext"
import { Notify } from "notiflix"
//import { candidateLogout } from "../../../hooks/Logouts"

export default function Header(){

    const {openCreatePostModal} = useContext(appContext)

    const [notifications, setNotifications] = useState<any[]>([])
    // let notificationstest : any[] = []
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state : any) => {
        return state.userAuth.user
    })
    const userRole = useSelector((state : any) => {
        return state.userAuth.userRole
    })
    
    

    console.log('This is loged user', user)

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

    function goToProfile(){
        if(userRole === 'user'){
            navigate('/profile/personal')
        }else{
            Notify.failure('Something went wrong', {timeout:1400})
        }

    }

    useEffect(() => {
        if(user){
            (async function(){
                const result = await getNotifications()
                console.log('notficiations', result.notifications)
                // notificationstest = result?.notifications
                setNotifications(result.notifications)
            })
        }
    }, [user])
    
    return(
        <div className="w-full sticky top-0 left-0 bg-white shadow z-59">
            <div className="w-full px-2 md:px-20 py-5 shadow-sm">
                <div className="navbar flex items-center justify-between gap-10">
                    <div className="brand">
                        <h3 className="brand-text text-black text-l font-bold">Aspiro</h3>
                    </div>
                    {/* if user exist then show the authorized navigations */}
                    
                    {
                        user
                            ? <>
                                <div className="border border-gray-300 w-100 relative rounded-full !py-2">
                                    <input type="text" className="w-full !ps-10 !pe-3" placeholder="Search for people" />
                                    <i className="fa-solid fa-search absolute absolute left-3 bottom-3 !text-gray-400"></i>
                                </div>
                                {/* <div className="!px-2 relative flex !py-1 search border border-gray-200 w-[500px] rounded-sm bg-gray-200">
                                    <i className="absolute top-1 fa-solid fa-search !text-sm"></i>
                                    <input type="text" placeholder="search in community" className="w-full !px-5 text-sm" />
                                    <button type="button" className="text-xs bg-white w-[20px] rounded">/</button>
                                </div> */}

                                <div className="flex items-center gap-3">
                                    <button className="relative"><span className="absolute bg-red-500 !w-[7px] !h-[7px] rounded-full"></span> <IoMdNotificationsOutline size={20} /></button>
                                    <button onClick={openCreatePostModal}><FaCirclePlus size={30} color="blue" /></button>
                                    <div className="group relative">
                                        <button className="profile"><CgProfile style={{ color: 'gray' }} size={30} /></button>
                                        <div className="action-details hidden group-hover:block absolute bg-white shadow w-[150px] right-0 p-2">
                                            <div onClick={goToProfile} className="cursor-pointer">
                                                <p className="text-sm">Profile</p>
                                            </div>
                                            <div className="mt-2">
                                                <span onClick={logoutUser} className="cursor-pointer text-sm">Logout <i className="ms-2 fa-solid fa-arrow-right-from-bracket cursor-pointer"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </>
                            : <>
                                 <div className="flex items-center gap-10">
                                 <ul className="nav-links flex gap-10">
                                    <li className="nav-link text-sm active hover:text-blue-500 cursor-pointer"><Link to={'/'}>Home</Link></li>
                                    <li className="nav-link text-sm cursor-pointer hover:text-blue-500"><Link to={'/jobs'}>Find Jobs</Link></li>
                                    <li className="nav-link text-sm cursor-pointer hover:text-blue-500"><Link to={'/candidates'}>Candidates</Link></li>
                                    <li className="nav-link text-sm cursor-pointer hover:text-blue-500">Companies</li>
                                    <li className="nav-link text-sm cursor-pointer hover:text-blue-500">Network</li>
                                </ul>
                                <button onClick={() => navigate('/login')} className="border border-blue-500 text-blue px-3 py-1 cursor-pointer text-blue-500">Sign In</button>
                                </div>
                              </>
                    }
                </div>
            </div>
        </div>
    )
}


{/* <div className="nav-actions flex justify-between w-full items-center">
                    <ul className="nav-links flex gap-10">
                        <li className="nav-link text-sm active hover:text-blue-500 cursor-pointer"><Link to={'/'}>Home</Link></li>
                        <li className="nav-link text-sm cursor-pointer hover:text-blue-500"><Link to={'/jobs'}>Find Jobs</Link></li>
                        <li className="nav-link text-sm cursor-pointer hover:text-blue-500"><Link to={'/candidates'}>Candidates</Link></li>
                        <li className="nav-link text-sm cursor-pointer hover:text-blue-500">Companies</li>
                        <li className="nav-link text-sm cursor-pointer hover:text-blue-500">Network</li>
                    </ul>
                    
                    <div className="actions flex gap-5 items-center">

                        {
                            logedUser
                            
                                ? <>
                                    <NotificationComponent notifications={notifications?.length > 0 ? notifications : []} />
                                    <div className="relative account-action-wrapper group cursor-pointer">
                                        <img src={defaultUser} style={{width:'48px', height:'50px'}} alt="" />
                                        <div className="action-details hidden group-hover:block absolute bg-white shadow w-[150px] right-0 p-2">
                                            <div>
                                                <Link to={'/profile/personal'}><p className="text-sm">Profile</p> </Link>
                                            </div>
                                            <div className="mt-2">
                                                <span onClick={() => logoutCandidate()} className="cursor-pointer text-sm">Logout <i className="ms-2 fa-solid fa-arrow-right-from-bracket cursor-pointer"></i></span>
                                            </div>
                                        </div>
                                        {/* <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer" onClick={() => candidateLogout()}></i> */}
                    //                 </div>
                    //               </>
                    //             : <button onClick={() => navigator('/login')} className="border border-blue-500 text-blue px-3 py-1 cursor-pointer text-blue-500">Sign In</button>
                    //     }
                    // </div>
                    // </div> */}