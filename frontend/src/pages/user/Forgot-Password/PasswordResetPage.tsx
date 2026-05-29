import { Button, FormControl, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {FaArrowLeft} from 'react-icons/fa'
import {GoLock} from 'react-icons/go'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword, validateToken } from '../../../services/userServices'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export default function PasswordResetPage(){

    //access token from the url
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const token = searchParams.get('token')

    type FormInput = {
        password: string
        confirmPassword: string
    }

    const {control, watch, handleSubmit, formState:{errors}} = useForm<FormInput>()

    const typedPassword = watch('password')

    async function resetPasswordOnSubmit(data: FormInput){
        alert('reset button called')
        setLoading(true)
        const {password} = data
        
        try {
            const result = await resetPassword(token as string, password)
        if(result?.success){
            navigate('/password-reset/success')
        }else{
           toast.error('Something went wrong')
        }
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const finalErrMessage = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(finalErrMessage)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function validateSessionToken(){
            if(!token){
                return navigate('/login')
            }
            try {
                const result = await validateToken(token)
                if(!result?.success){
                    return navigate('/login')
                }
            } catch (error: unknown) {
                console.log('Error occured while validating token', error)
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        validateSessionToken()
    }, [])

    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex justify-center items-center">
            <div className='bg-white shadow-xl rounded-lg border border-slate-100 !p-10 md:!p-10 w-md'>
                <div className="w-full">
                    <button className='text-gray-500 flex items-center gap-2'>
                        <FaArrowLeft />
                        Back
                    </button>
                </div>
                <div className="w-full flex justify-center !py-3">
                    <div className='bg-blue-200 rounded-full w-15 h-15 flex justify-center items-center'>
                        <GoLock color='blue' size={30} />
                    </div>
                </div>
                <div>
                    <p className="text-center font-semibold text-lg text-gray-900">Reset password</p>
                    <p className='text-center mt-3 mb-5 text-sm font-medium text-gray-700'>Enter your new password and confirm it</p>
                </div>
                <form onSubmit={handleSubmit(resetPasswordOnSubmit)}>
                    <FormControl fullWidth error={Boolean(errors.password)}>
                        <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>New Password</label>
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required:{value:true, message:'Enter new password'},
                                pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message:'Password must contain one special character, uppercase, lowercase, digit'}
                            }}
                            render={({field}) => (
                                <div className="flex gap-2 relative items-center">
                                    <GoLock color='gray' className='absolute left-3' />
                                    <input type="password"
                                        {...field}
                                        placeholder='Enter new password'
                                        className='border border-slate-100 p-3 w-full rounded-lg px-10 bg-gray-50 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-200'
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.password?.message || 'Pasword must be atleast 8 characters long'}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth className='!mt-5' error={Boolean(errors.confirmPassword)}>
                        <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Confirm password</label>
                        <Controller
                            name='confirmPassword'
                            control={control}
                            rules={{
                                validate: (value) => {
                                    return value === typedPassword ? true : "Password doesn't match";
                                },
                                required: { value: true, message: 'Confirm your password' },
                            }}
                            render={({field}) => (
                                <div className="flex gap-2 relative items-center">
                                    <GoLock color='gray' className='absolute left-3' />
                                    <input type="password"
                                        {...field}
                                        placeholder='Confirm new password'
                                        className='border border-slate-100 w-full p-3 rounded-lg px-10 bg-gray-50 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-200'
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
                    </FormControl>
                    <div className="action !mt-5">
                        <button
                            className='border border-transparent w-full p-3 rounded-lg bg-black text-white font-semibold text-sm shadow-xl transition-color duration-300 hover:bg-gray-500'
                        >
                            {loading
                                ? "Processing..."
                                : "Reset Password"
                            }
                        </button>
                        {/* <button type='submit' className='bg-black text-white text-sm font-medium w-full !py-2 rounded-md'>Reset password</button> */}
                    </div>
                </form>
                
    
            </div>
        </div>
    )
}