import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import InfinitySpinner from '../../../components/common/InfinitySpinner'
import { useDispatch } from 'react-redux'
import { adminLogin} from '../../../services/adminServices'
import { Controller, useForm } from 'react-hook-form'
import { FormControl, FormHelperText, IconButton, InputAdornment, TextField } from '@mui/material'
import { loginSuccess } from '../../../redux-toolkit/userAuthSlice'
import {LuShieldCheck} from 'react-icons/lu'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { GoLock } from 'react-icons/go'

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

    const [loading, setloading] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatcher = useDispatch()
    
    async function adminLoginOnSubmit(data : Inputs){
        // setloading(true)
        setLoginErrorText("")
        const {email, password} = data
        
        const result = await adminLogin(email, password)

        if(result?.success){
            console.log('admin login result', result) //debuging result
            dispatcher(loginSuccess({
                user:result?.result?.user,
                userToken:result?.result?.accessToken,
                userRole:result?.result?.role
            }))
            // dispatcher(loginSuccess({
            //     user:result?.result?.user,
            //     userToken:result?.result?.accessToken,
            //     userRole:result?.result?.role
            // }))
            setLoginErrorText('')
            // setloading(false)
            navigate('/admin/dashboard')
        }else{
            // setloading(false)
            // setLoginError(true)
            setLoginErrorText(result?.message)
        }
    }

    return(
        <>
            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
                <div className="left flex flex-col items-center justify-center">
                    <div className='w-sm'>
                        <div className='flex gap-2 items-center'>
                            <LuShieldCheck size={24} color='orange' />
                            <p className='text-gray-700'>Aspiro</p>
                        </div>
                        <div className='mt-2'>
                            <p className='text-gray-700'>Admin Portal</p>
                            <p className='mt-2 text-sm text-gray-500'>Sign in to access the admin dashboard</p>
                        </div>
                        <div className='w-full'>
                            <p className='text-center text-red-500 text-sm font-light !mt-5'>{loginErrorText}</p>
                        </div>
                        <form onSubmit={handleSubmit(adminLoginOnSubmit)} className='mt-5'>
                            <FormControl fullWidth error={Boolean(errors.email)}>
                                <label htmlFor="" className='text-xs font-medium !text-black'>Email Address</label>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{
                                        required:{value:true, message:'Enter email'}
                                    }}
                                    render={({field}) => (
                                        <div className='flex gap-2 items-center bg-gray-100 !p-2 rounded-sm'>
                                            <HiOutlineEnvelope color='gray' />
                                            <input type='text'
                                                {...field}
                                                placeholder='Enter admin email address'
                                                className='w-full'
                                            />
                                        </div>
                                    )}
                                />
                                <FormHelperText>
                                    {errors.email?.message}
                                </FormHelperText>
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.password)} className='!mt-3'>
                                <label htmlFor="" className='text-xs font-medium !text-black'>Password</label>
                                <Controller 
                                    name='password'
                                    control={control}
                                    rules={{
                                        required:{value:true, message:'Enter your password'}
                                    }}
                                    render={({field}) => (
                                        <div className='bg-gray-100 flex gap-2 !p-2 items-center'>
                                            <GoLock color='gray' />
                                            <input type="password" 
                                                {...field}
                                                placeholder='Enter your password'
                                            />
                                        </div>
                                    )}
                                />
                                <FormHelperText>{errors.password?.message}</FormHelperText>
                            </FormControl>
                            <div className='mt-4'>
                                <button type='submit' className='bg-orange-500 w-full !p-2 rounded-sm text-sm text-white'>Sign In</button>
                            </div>
                        </form>
                        <div className="info !mt-10 bg-orange-50 !p-3 flex gap-2">
                            <div><LuShieldCheck color='orange' size={23} /></div>
                            <div>
                                <p className='text-sm font-medium'>Secure Admin Access</p>
                                <p className='mt-2 text-gray-700 text-xs'>This area is restricted to authorized admins only.
                                    All access attempts are loged and monitored
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" relative right hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
                    <div className="!z-10 w-full flex flex-col justify-center items-center">
                        <p className='text-white'>Welcome Back</p>
                    <p className='mt-5 text-gray-200 text-center text-sm'>Manage your platform with powerful admin tools and insights</p>
                    <div className="cards flex gap-3 mt-10">
                        <div className='bg-orange-500 shadow-lg hover:-translate-y-1 transition-all duration-2s ease-in-out rounded-md text-center !px-5 !py-3 w-1/3 text-white'>
                            <p className='font-medium text-lg'>24/7</p>
                            <p className='text-sm font-light'>Monitoring</p>
                        </div>
                        <div className='bg-orange-500 shadow-lg hover:-translate-y-1 transition-all duration-2s ease-in-out rounded-md text-center !px-5 !py-3 w-1/3 text-white'>
                            <p className='font-medium text-lg'>100%</p>
                            <p className='text-sm font-light'>Secure</p>
                        </div>
                        <div className='bg-orange-500 shadow-lg hover:-translate-y-1 transition-all duration-2s ease-in-out rounded-md text-center !px-5 !py-3 w-1/3 text-white'>
                            <p className='font-medium text-lg'>00</p>
                            <p className='text-sm font-light'>Control</p>
                        </div>
                    </div>
                    </div>
                    <div className="rounded-full bg-orange-500 w-[300px] h-[300px] absolute">
                    </div>
                </div>
            </div>
        </>
    //     <div className="main w-full h-screen bg-secondary flex items-center justify-center">
    //         {loading ? <InfinitySpinner color='orange' /> : null}
    //     <div className="max-w-4xl w-full bg-white flex flex-col md:flex-row shadow-sm">
    //         <div id="login-section" className='md:w-1/2 p-8 bg-white'>
    //             <p className="brand-name">Aspiro</p>
    //             <div className="flex items-center justify-center">
    //                 <h2 className='font-bold'>Login</h2>
    //             </div>
    //             <div className='flex justify-center'>
    //                 {loginError ? <label htmlFor="" className='error-label'>{loginErrorText}</label> : null}
    //             </div>
    //             <form className="form" onSubmit={handleSubmit(onSubmit)}>
    //                 <FormControl fullWidth sx={{marginTop:'10px'}}>
    //                     <Controller
    //                         name='email'
    //                         control={control}
    //                         rules={{
    //                             required:{value:true, message:'Please enter email'}
    //                         }}
    //                         render={({field}) => {
    //                             return <TextField
    //                                 {...field}
    //                                 label="Email"
    //                                 variant='outlined'
    //                                 error={Boolean(errors.email)}
    //                                 helperText={errors.email?.message}
    //                             />
    //                         }}
    //                     />
    //                 </FormControl>
                    
    //                 <FormControl fullWidth sx={{marginTop:'10px'}}>
    //                     <Controller
    //                         name='password'
    //                         control={control}
    //                         rules={{
    //                             required:{value:true, message:'Enter password'}
    //                         }}
    //                         render={({field}) => {
    //                             return <TextField
    //                                 {...field}
    //                                 type={showPassword ? 'text' : 'password'}
    //                                 label="Password"
    //                                 variant='outlined'
    //                                 error={Boolean(errors.password)}
    //                                 helperText={errors.password?.message}
    //                                 InputProps={{
    //                                     endAdornment: (
    //                                         <InputAdornment position="end">
    //                                             <IconButton
    //                                                 onClick={() => setShowPassword(!showPassword)}
    //                                                 edge="end"
    //                                             >
    //                                                 <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
    //                                             </IconButton>
    //                                         </InputAdornment>
    //                                     )
    //                                 }}
    //                             />
    //                         }}
    //                     />
    //                 </FormControl>
                    
    //                 <div className='flex justify-end'>
    //                     <Link to={'/forgot-password'} className='forgot-password mt-4 mb-4 block'>Forgot password?</Link>
    //                 </div>
    //                 <div>
    //                     <button type="submit" className='bg-main w-full rounded-full text-white py-2'>Login</button>
    //                 </div>
    //             </form>
    //         </div>
    //         <div id="welcome-section" className='flex items-end justify-start md:w-1/2 bg-main text-white relative'>
    //             <p className="font-3xl mx-8 my-8" id='welcome-text'>Hi<br />Welcome<br /> back</p>
    //             <div className="rounded-full dec-circle absolute right-8 bottom-10"></div>
    //             <div className="rounded-full dec-circle-top-1 absolute top-4 left-4"></div>
                
    //         </div>
    //     </div>
    // </div>
    )
}