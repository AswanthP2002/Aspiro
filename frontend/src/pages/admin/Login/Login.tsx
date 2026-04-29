import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminLogin} from '../../../services/adminServices'
import { Controller, useForm } from 'react-hook-form'
import { FormControl, FormHelperText} from '@mui/material'
import { loginSuccess } from '../../../redux/userAuthSlice'
import {LuShieldCheck} from 'react-icons/lu'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { GoLock } from 'react-icons/go'
import { BsEye } from 'react-icons/bs'
import { FiEyeOff } from 'react-icons/fi'

interface AdminLoginResponsePayload {
    success: boolean;
    message: string;
    result: {
        user: {id: string, email: string},
        role: string,
        accessToken: string
    }
}

export default function AdminLoginPage(){

    type Inputs = {
        email : string
        password : string
    }

    const {control, formState:{errors}, handleSubmit} = useForm<Inputs>({
        defaultValues:{
            email:"",
            password:""
        }
    })
    const [loginErrorText, setLoginErrorText] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatcher = useDispatch()
    
    async function adminLoginOnSubmit(data : Inputs){
        setLoginErrorText("")
        const {email, password} = data
        
        const result: AdminLoginResponsePayload = await adminLogin(email, password)

        if(result?.success){
            console.log('admin login result', result) //debuging result
            dispatcher(loginSuccess({
                user: result.result.user,
                userToken: result.result.accessToken,
                userRole: result.result.role
            }))
            setLoginErrorText('')
            navigate('/admin/dashboard')
        }else{
            setLoginErrorText(result?.message)
        }
    }

    return(
        <>
            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
                <div className="left flex flex-col items-center justify-center">
                    <div className='w-sm'>
                        <div className='flex gap-2 items-center'>
                            <LuShieldCheck size={24} color='blue' />
                            <p className='text-gray-700'>Aspiro</p>
                        </div>
                        <div className='mt-2'>
                            <p className='text-2xl font-bold text-gray-900 tracking-wider'>Admin Portal</p>
                            <p className='mt-2 text-gray-600'>Sign in to access the admin dashboard</p>
                        </div>
                        <div className='w-full'>
                            <p className='text-center text-red-500 text-sm font-light !mt-5'>{loginErrorText}</p>
                        </div>
                        <form onSubmit={handleSubmit(adminLoginOnSubmit)} className='mt-5'>
                            <FormControl fullWidth error={Boolean(errors.email)}>
                                <label htmlFor="" className='uppercase font-semibold tracking-wide mb-2 !text-gray-500'>Email Address</label>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{
                                        required:{value:true, message:'Enter email'}
                                    }}
                                    render={({field}) => (
                                        <div className='flex gap-2 items-center relative'>
                                            <HiOutlineEnvelope color='gray' className='absolute left-3' />
                                            <input type='text'
                                                {...field}
                                                placeholder='Enter admin email address'
                                                className='w-full border !border-slate-100 px-10 py-3 bg-gray-50 focus:bg-white rounded-md focus:!border-blue-300 focus:ring-2 focus:ring-blue-100'
                                            />
                                        </div>
                                    )}
                                />
                                <FormHelperText>
                                    {errors.email?.message}
                                </FormHelperText>
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.password)} className='!mt-3'>
                                <label htmlFor="" className='uppercase mb-2 font-semibold tracking-wide'>Password</label>
                                <Controller 
                                    name='password'
                                    control={control}
                                    rules={{
                                        required:{value:true, message:'Enter your password'}
                                    }}
                                    render={({field}) => (
                                        <div className='relative flex gap-2 items-center'>
                                            <GoLock color='gray' className='absolute left-3' />
                                            <input type={`${showPassword ? "text": "password"}`} 
                                                {...field}
                                                placeholder='Enter your password'
                                                className='border !border-slate-100 px-10 py-3 bg-gray-50 focus:bg-white rounded-md w-full focus:!border-blue-300 focus:ring-2 focus:ring-blue-100'
                                            />
                                            {showPassword
                                                ? <button type='button' onClick={() => setShowPassword(false)} className="absolute right-3"><FiEyeOff /></button>
                                                : <button type='button' onClick={() => setShowPassword(true)} className="absolute right-3"><BsEye /></button>
                                            }
                                        </div>
                                    )}
                                />
                                <FormHelperText>{errors.password?.message}</FormHelperText>
                            </FormControl>
                            <div className='mt-4'>
                                <button type='submit' className='border border-transparent w-full p-3 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold transition-color duration-300 shadow-xl hover:shadow-2xl'>Sign In</button>
                            </div>
                        </form>
                        <div className="info !mt-10 bg-blue-50 !p-3 flex gap-2">
                            <div><LuShieldCheck color='blue' size={23} /></div>
                            <div>
                                <p className='text-sm font-medium'>Secure Admin Access</p>
                                <p className='mt-2 text-gray-700 text-xs'>This area is restricted to authorized admins only.
                                    All access attempts are loged and monitored
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" relative right hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-blue-300 to-blue-800">
                    <div className="!z-10 w-full flex flex-col justify-center items-center">
                        <p className='text-white font-bold text-3xl tracking-wide'>Welcome Back</p>
                    <p className='mt-5 text-white text-center text-sm'>Manage your platform with powerful admin tools and insights</p>
                    <div className="cards flex gap-3 mt-10">
                        <div className='bg-gradient-to-br from-blue-500 to-indigo- shadow-lg hover:-translate-y-1 transition-all duration-2s ease-in-out rounded-md text-center !px-5 !py-3 w-1/3 text-white'>
                            <p className='font-medium text-lg'>24/7</p>
                            <p className='text-sm font-light'>Monitoring</p>
                        </div>
                        <div className='bg-gradient-to-br from-blue-500 to-indigo- shadow-lg hover:-translate-y-1 transition-all duration-2s ease-in-out rounded-md text-center !px-5 !py-3 w-1/3 text-white'>
                            <p className='font-medium text-lg'>100%</p>
                            <p className='text-sm font-light'>Secure</p>
                        </div>
                        <div className='bg-gradient-to-br from-blue-500 to-indigo- shadow-lg hover:-translate-y-1 transition-all duration-2s ease-in-out rounded-md text-center !px-5 !py-3 w-1/3 text-white'>
                            <p className='font-medium text-lg'>00</p>
                            <p className='text-sm font-light'>Control</p>
                        </div>
                    </div>
                    </div>
                    <div className="rounded-full bg-indigo-400 w-[300px] h-[300px] absolute ring-2 ring-blue-400 shadow-[0_0_20px_2px_rgba(0,0,260,0.5)]">
                    </div>
                </div>
            </div>
        </>
    )
}