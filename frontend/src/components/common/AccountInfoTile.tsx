
import './CommonComponent.css'


export function TileRegisterAsCandidate(){
    return(
        <div className="tile card rounded-lg w-full candidate-register-tile">
            <div className="overlay w-full h-full">
                <div className='text-white content'>
                <p className="mt-5 title text-2xl font-bold">Join as a candidate</p>
                <p className="mt-5 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Soluta eveniet error esse.</p>
                <button className="border mt-5 btn-register bg-white text-blue-400 text-xs p-2">Register now <i className="ms-2 fa-solid fa-arrow-right"></i></button>
            </div>
            </div>
            
        </div>
    )
}

export function TileRegisterAsRecruiter(){
    return(
        <div className="tile card rounded-lg p-10 relative w-full relative recruiter-register-tile">
            <div className="overlay absolute w-full h-full left-0 top-0 rounded-lg"></div>
            <div className='text-white content'>
                <p className="mt-5 title text-2xl font-bold">Join as a recruiter</p>
                <p className="mt-5 text-sm">Lorem impusm dolor sit amet consectueturn adipisicing elit. <br />Soluta eveniet error ess.</p>
                <button className="border mt-5 btn-register bg-white text-blue-400 text-xs p-2">Register now <i className="ms-2 fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}