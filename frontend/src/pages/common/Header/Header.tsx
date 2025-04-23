import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import defaultUser from '/default-user-aspiro-removebg-preview.png'
import { logout } from "../../../redux-toolkit/candidateAuthSlice"

export default function Header(){
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const logedUser = useSelector((state : any) => {
        return state.candidateAuth.user
    })
    console.log('This is loged user', logedUser)

    function candidateLogout(){
        alert('logout triggered')
        dispatch(logout())
        window.location.reload()
    }

    return(
        <div className="w-full">
            <div className="w-full px-2 md:px-20 py-3 shadow-sm">
                <div className="navbar flex items-center gap-10">
                    <div className="brand">
                        <h3 className="brand-text text-black text-l font-bold">Aspiro</h3>
                    </div>
                    <div className="nav-actions flex justify-between w-full items-center">
                    <ul className="nav-links flex gap-3">
                        <li className="nav-link active">Home</li>
                        <li className="nav-link">Find Jobs</li>
                        <li className="nav-link">Candidates</li>
                        <li className="nav-link">Companies</li>
                        <li className="nav-link">Network</li>
                    </ul>
                    <div className="actions flex gap-5 items-center">
                        {
                            logedUser
                                ? <><Link to={'/profile'}><img src={defaultUser} style={{width:'50px', height:'50px'}} alt="" /></Link>
                                    <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer" onClick={() => candidateLogout()}></i></>
                                : <button onClick={() => navigator('/login')} className="border border-blue-500 text-blue px-3 py-1 cursor-pointer">Sign In</button>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}