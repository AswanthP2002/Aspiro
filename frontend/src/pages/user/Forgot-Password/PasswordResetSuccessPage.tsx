import { FaRegCircleCheck } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function PasswordResetSuccessPage(){
    const navigate = useNavigate()

    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex justify-center items-center">
            <div className='bg-white shadow-lg rounded-md border border-gray-200 !p-5 md:!p-10 w-md'>
                
                <div className="w-full flex justify-center !py-3">
                    <div className='bg-green-200 rounded-full w-15 h-15 flex justify-center items-center'>
                        <FaRegCircleCheck color='green' size={30} />
                    </div>
                </div>
                <div>
                    <p className="text-center text-gray-700">Password reset successfull</p>
                    <p className='text-center !my-5 text-sm text-black font-light'>
                        Your password has been successfully reset. You can now login with your new password
                    </p>
                </div>
                
                <div className="action !mt-5">
                    <button onClick={() => navigate('/login')} className='bg-black text-white text-sm font-medium w-full !py-2 rounded-md'>Login</button>
                </div>
    
            </div>
        </div>
    )
}