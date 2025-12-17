import './CommonComponent.css'
import { Link } from 'react-router-dom'


export function TileRegisterAsCandidate(){
    return(
        <div className="hover:shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 tile p-10 relative card rounded-lg w-full bg-gradient-to-br from-blue-500 to-indigo-600">
            <div className="contents w-full h-full">
                <p className="mt-5 title text-2xl font-semibold text-white">Join as a User</p>
                <p className="mt-3 text-base text-white">lorem lorem lorem lorem lore</p>
                <Link to={'/register'}>
                <button className="mt-5 btn-register bg-white rounded-sm text-blue-400 text-xs p-2">Register now <i className="ms-2 fa-solid fa-arrow-right"></i></button>
                </Link>
            </div>
        </div>
    )
}

export function TileRegisterAsRecruiter(){
    return(
        <div className="hover:shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 tile card rounded-lg p-10 relative w-full relative bg-gradient-to-br from-blue-500 to-indigo-600">
            <div className='text-white content'>
                <p className="mt-5 title text-2xl font-semibold">Join as a Recruiter</p>
                <p className="mt-3 text-base text-white">Lorem impusm dolor sit amet consectueturn adipisicing elit. <br />Soluta eveniet error ess.</p>
                <Link to={'/recruiter/register'}>
                <button className="mt-5 btn-register bg-white rounded-sm text-blue-400 text-xs p-2">Register now <i className="ms-2 fa-solid fa-arrow-right"></i></button>
                </Link>
            </div>
        </div>
    )
}