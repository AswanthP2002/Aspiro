import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import defaultUser from '/default-user-aspiro-removebg-preview.png'
import { recruiterLogout } from "../../../redux-toolkit/recruiterAuthSlice"
import { logoutRecruiter } from "../../../services/recruiterServices"
import Swal from "sweetalert2"


export default function RecruiterHeader(){
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const logedRecruiter = useSelector((state : any) => {
        return state.recruiterAuth.recruiter
    })
    console.log('This is loged user', logedRecruiter)

   async function logout(){
        const result = await logoutRecruiter()
        dispatch(recruiterLogout())
        Swal.fire({
            icon:'success',
            title:result.message,
            showConfirmButton:false,
            showCancelButton:false,
            timer:2000
        }).then(() => window.location.reload())
        
    }

    return(
        <div className="w-full">
            <div className="w-full px-2 md:px-20 py-3 shadow-sm">
                <div className="navbar flex items-center gap-10">
                    <div className="brand">
                        <h3 className="brand-text text-black text-l font-bold">Aspiro</h3>
                    </div>
                    <div className="nav-actions flex justify-between w-full items-center">
                    <ul className="nav-links flex gap-10">
                        <li className="nav-link active hover:text-blue-500 cursor-pointer">Home</li>
                        <li className="nav-link cursor-pointer hover:text-blue-500">Find Jobs</li>
                        <li className="nav-link cursor-pointer hover:text-blue-500">Candidates</li>
                        <li className="nav-link cursor-pointer hover:text-blue-500">Companies</li>
                        <li className="nav-link cursor-pointer hover:text-blue-500">Network</li>
                    </ul>
                    <div className="actions flex gap-5 items-center">
                        {
                            logedRecruiter
                                ? <><Link to={'/recruiter/profile/overview'}><img src={defaultUser} style={{width:'50px', height:'50px'}} alt="" /></Link>
                                    <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer" onClick={() => logout()}></i></>
                                : <button onClick={() => navigator('/recruiter/login')} className="border border-blue-500 text-blue px-3 py-1 cursor-pointer text-blue-500">Sign In</button>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}