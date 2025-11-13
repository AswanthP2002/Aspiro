import {FaArrowLeft} from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { passwordResetLinkSend } from '../../../services/userServices'
import { Notify } from 'notiflix'

export default function ResetLinkSendPage(){

    const location = useLocation()
    const {email} = location.state || {}

    async function resendLink(){
        try {
            const result = await passwordResetLinkSend(email)
            
            if(!result.success){
                Notify.failure(result?.message, {timeout:1500})
            }else{
                Notify.success(result?.message, {timeout:1500})
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:1500})
        }
    }

    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex justify-center items-center">
            <div className='bg-white shadow-lg rounded-md border border-gray-200 !p-5 md:!p-10 w-md'>
                <div className="w-full">
                    <button className='text-gray-500 flex items-center gap-2'>
                        <FaArrowLeft />
                        Back
                    </button>
                </div>
                <div className="w-full flex justify-center !py-3">
                    <div className='bg-green-200 rounded-full w-15 h-15 flex justify-center items-center'>
                        <FaRegCircleCheck color='green' size={30} />
                    </div>
                </div>
                <div>
                    <p className="text-center text-gray-700">Check your email!</p>
                    <p className='text-center !my-5 text-sm text-black font-light'>We have send a password reset
                        link to {email || 'test@gmail.com'}. Please check your inbox and follow the instruction to reset your password
                    </p>
                </div>
                <div className='bg-blue-100 border border-blue-500 rounded-md !p-3'>
                    <p className='text-center text-sm'>Didin't received the email?</p>
                    <p className='text-center text-xs text-gray-700 font-light !mt-2'>Check your spam folder or click below to resend it</p>
                </div>
                <div className="action !mt-5">
                    <button onClick={resendLink} className='bg-gray-200 border border-gray-300 w-full rounded-md !py-2 text-sm font-medium'>Resend email</button>
                    <button className='w-full text-sm font-medium !mt-5'>Back to login</button>
                </div>
            </div>
        </div>
    )
}