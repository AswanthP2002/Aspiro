import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import defaultUser from '/default-img-instagram.png'
import { logout, tokenRefresh } from "../../../redux-toolkit/candidateAuthSlice"
import useRefreshToken from "../../../hooks/refreshToken"
import Swal from "sweetalert2"
import { candidateLogout, getNotifications } from "../../../services/candidateServices"
import NotificationComponent from "../../../components/common/NotificationComponent"
import { useEffect, useState } from "react"
//import { candidateLogout } from "../../../hooks/Logouts"

export default function Header(){
    const [notifications, setNotifications] = useState<any[]>([])
    // let notificationstest : any[] = []
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const logedUser = useSelector((state : any) => {
        return state.candidateAuth.user
    })

    const token = useSelector((state : any) => {
        return state.candidateAuth.token
    })
    console.log('This is loged user', logedUser)

    async function logoutCandidate(){
        const logoutResult = await candidateLogout(dispatch, navigator)
        dispatch(logout())
        Swal.fire({
            icon:'success',
            title:logoutResult.message,
            showConfirmButton:false,
            showCancelButton:false,
            timer:2000
        }).then(() => navigator('/login'))
    }

    useEffect(() => {
        if(logedUser){
            (async function(){
                const result = await getNotifications()
                console.log('notficiations', result.notifications)
                // notificationstest = result?.notifications
                setNotifications(result.notifications)
            })()
        }
    }, [logedUser])
    
    return(
        <div className="w-full">
            <div className="w-full px-2 md:px-20 py-3 shadow-sm">
                <div className="navbar flex items-center gap-10">
                    <div className="brand">
                        <h3 className="brand-text text-black text-l font-bold">Aspiro</h3>
                    </div>
                    <div className="nav-actions flex justify-between w-full items-center">
                    <ul className="nav-links flex gap-10">
                        <li className="nav-link text-sm active hover:text-blue-500 cursor-pointer"><Link to={'/'}>Home</Link></li>
                        <li className="nav-link text-sm cursor-pointer hover:text-blue-500"><Link to={'/jobs'}>Find Jobs</Link></li>
                        <li className="nav-link text-sm cursor-pointer hover:text-blue-500">Candidates</li>
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
                                    </div>
                                  </>
                                : <button onClick={() => navigator('/login')} className="border border-blue-500 text-blue px-3 py-1 cursor-pointer text-blue-500">Sign In</button>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}