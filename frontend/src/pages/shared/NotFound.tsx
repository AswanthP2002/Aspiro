import { useNavigate } from 'react-router-dom'
import Illustration from '/not-found.png'

export default function NotFoundPage(){
    const navigateTo = useNavigate()
    return(
        <div className='!px-5 bg-blue-100 w-full h-screen flex flex-col justify-center items-center'>
            <p className='text-gray-500 font-bold text-5xl'>404</p>
            <p className='text-gray-500'>Page Not Found</p>
            <img src={Illustration} alt="not found illustration" />
            <p className='text-gray-500 text-center text-sm'>Sorry we cant find the page you are looking for, may be its removed or corrupted</p>
            <button onClick={() => navigateTo('/')} className='mt-5 bg-blue-500 text-white rounded text-sm !px-5 !py-2'>Go to Home</button>
        </div>
    )
}