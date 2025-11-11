import { FormControl, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {HiOutlineEnvelope} from 'react-icons/hi2'
import {FaArrowLeft} from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import {GoLock} from 'react-icons/go'

export default function PasswordResetSuccessPage(){

    type FormInput = {
        password: string
        confirmPassword: string
    }

    const {control, handleSubmit, formState:{errors}, reset} = useForm<FormInput>()

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
                    <button className='bg-black text-white text-sm font-medium w-full !py-2 rounded-md'>Login</button>
                </div>
    
            </div>
        </div>
    )
}