import './CommonComponent.css'
import { Link } from 'react-router-dom'


export function TileRegisterAsCandidate(){
    return(
        <div className="tile p-10 relative card rounded-lg w-full candidate-register-tile">
            <div className="contents w-full h-full">
                <p className="mt-5 title text-2xl font-semibold text-white">Join as a Candidate</p>
                <p className="mt-3 text-sm text-white">lorem lorem lorem lorem lore</p>
                <Link to={'/register'}>
                <button className="mt-5 btn-register bg-white rounded-sm text-blue-400 text-xs p-2">Register now <i className="ms-2 fa-solid fa-arrow-right"></i></button>
                </Link>
            </div>
        </div>
    )
}

export function TileRegisterAsRecruiter(){
    return(
        <div className="tile card rounded-lg p-10 relative w-full relative recruiter-register-tile">
            <div className='text-white content'>
                <p className="mt-5 title text-2xl font-semibold">Join as a recruiter</p>
                <p className="mt-3 text-sm text-white">Lorem impusm dolor sit amet consectueturn adipisicing elit. <br />Soluta eveniet error ess.</p>
                <Link to={'/recruiter/register'}>
                <button className="mt-5 btn-register bg-white rounded-sm text-blue-400 text-xs p-2">Register now <i className="ms-2 fa-solid fa-arrow-right"></i></button>
                </Link>
            </div>
        </div>
    )
}