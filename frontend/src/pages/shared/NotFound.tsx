import { useNavigate } from 'react-router-dom'
import Illustration from '/not-found.png'
import notFoundIllustration from '/error-page.png'

export default function NotFoundPage(){
    const navigateTo = useNavigate()
    return(
        <>
            <div className='!px-5 bg-white w-full h-screen flex flex-col justify-center items-center'>
            <p className='text-gray-500 font-bold text-3xl text-center'>!Oops</p>
            <p className='text-gray-500 mt-2'>Page Not Found</p>
            <img src={notFoundIllustration} alt="not found illustration" />
            <p className='text-gray-500 text-center text-sm'>Sorry we cant find the page you are looking for, may be its removed or corrupted</p>
            <div className="flex gap-2 justify-center mt-5">
                <button onClick={() => navigateTo('/')} className='bg-blue-500 text-white rounded text-sm !px-5 !py-2'>Go to Home</button>
                <button onClick={() => navigateTo(-1)} className='text-blue-500 bg-white rounded-md border border-blue-500 px-5 py-2'>Back</button>
            </div>
        </div>
        </>
        
    )
}