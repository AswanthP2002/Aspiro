import { FormControl, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {HiOutlineEnvelope} from 'react-icons/hi2'
import {FaArrowLeft} from 'react-icons/fa'
import { passwordResetLinkSend } from '../../../services/userServices'
import { Notify } from 'notiflix'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ThreeDotLoading from '../../../components/common/ThreeDotLoading'

export default function ForgotPasswordPage(){
    const navigate = useNavigate()
    const [serverResponseError, setServerResponseError] = useState('')

    type FormInput = {
        email: string
    }

    const {control, handleSubmit, formState:{errors}, reset} = useForm<FormInput>()

    const sendPasswordResetLink = async (data: FormInput) => {
        // alert('testing')
        const {email} = data

        try {
            const result = await passwordResetLinkSend(email)
            
            if(result?.success){
                navigate('/password-reset-link/send')
            }else{
                //Notify.failure(result?.message, {timeout:1500})
                setServerResponseError(result?.message)
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:1500})
        }
    }

    return(
        <>
        {/* <ThreeDotLoading /> */}
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex justify-center items-center">
            <div className='bg-white shadow-lg rounded-md border border-gray-200 !p-5 md:!p-10 w-md'>
                <div className="w-full">
                    <button className='text-gray-500 flex items-center gap-2'>
                        <FaArrowLeft />
                        Back
                    </button>
                </div>
                <div className="w-full flex justify-center !py-3">
                    <div className='bg-blue-200 rounded-full w-15 h-15 flex justify-center items-center'>
                        <HiOutlineEnvelope color='blue' size={30} />
                    </div>
                </div>
                <div>
                    <p className="text-center text-gray-700">Forgot password?</p>
                    <p className='text-center !my-5 text-sm text-black font-light'>No worries!, Enter your email address and we will 
                        send you a link to reset your password.
                    </p>
                </div>
                <div className="w-full">
                    <p className="text-center text-red-500 text-sm font-medium">{serverResponseError}</p>
                </div>
                <form onSubmit={handleSubmit(sendPasswordResetLink)}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                        <label className='!text-black font-medium' htmlFor="">Email</label>
                        <Controller 
                            name='email'
                            control={control}
                            rules={{
                                required:{value:true, message:'Please provide email'},
                                pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:'Please provide valid email'} 
                            }}
                            render={({field}) => (
                                <div className='bg-gray-100 flex gap-3 !py-2 rounded-sm !px-2 items-center'>
                                    <HiOutlineEnvelope color='gray' />
                                    <input className='w-full' type='email' 
                                        {...field} 
                                        placeholder='Enter your email' 
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>
                    <div>
                        <button className='bg-black text-white font-medium text-sm w-full !mt-4 !mb-3 rounded-sm !py-2 hover:bg-gray-600'>Send reset link</button>
                    </div>
                </form>
                <div>
                    <p className='text-sm text-center text-gray-700 font-light !my-3'>Remember your password? <a href="#" className='text-blue-500 underline font-medium'>Login</a></p>
                </div>
            </div>
        </div>
        </>
    )
}