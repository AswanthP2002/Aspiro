import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import Loader from '../../../components/admin/Loader'
import { adminLoginSuccess } from '../../../redux-toolkit/adminAuthSlice'
import { useDispatch } from 'react-redux'
import { adminLogin} from '../../../services/adminServices'
import { Controller, useForm } from 'react-hook-form'
import { FormControl, TextField } from '@mui/material'
import { loginSuccess } from '../../../redux-toolkit/userAuthSlice'

export default function AdminLoginPage(){

    type Inputs = {
        email : string
        password : string
    }

    const {control, watch, formState:{errors}, handleSubmit} = useForm<Inputs>({
        defaultValues:{
            email:"",
            password:""
        }
    })

    const [email, setEmail] = useState("")
    const [loading, setloading] = useState(false)
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState("Error")
    const [showpassword, setshowpassword] = useState(false)

    function togglePasswordVisibility(){
        setshowpassword(prev => !prev)
    }

    const navigator = useNavigate()
    const dispatcher = useDispatch()
    

    async function login() {
        setloading(true)
        setLoginErrorText("")
        const {email, password} = watch()
        const loginResult = await adminLogin(email, password)

        if(loginResult?.success){
            console.log('admin login result', loginResult)
            dispatcher(loginSuccess({user:loginResult?.result?.user, userToken:loginResult?.result?.token, userRole:loginResult?.result?.role}))
            //dispatcher(adminLoginSuccess({admin:loginResult?.result?.admin, token:loginResult?.result?.token}))

            //stoped at admin login here, now want to check by loggin in
            setloading(false)
            navigator('/admin/dashboard')
        }else{
            setloading(false)
            setLoginError(true)
            setLoginErrorText(loginResult?.message)
        }
    }

    return(
        <div className="main w-full h-screen bg-secondary flex items-center justify-center">
            {loading ? <Loader /> : null}
        <div className="max-w-4xl w-full bg-white flex flex-col md:flex-row shadow-sm">
            <div id="login-section" className='md:w-1/2 p-8 bg-white'>
                <p className="brand-name">Aspiro</p>
                <div className="flex items-center justify-center">
                    <h2 className='font-bold'>Login</h2>
                </div>
                <div className='flex justify-center'>
                    {loginError ? <label htmlFor="" className='error-label'>{loginErrorText}</label> : null}
                </div>
                <form className="form" onSubmit={handleSubmit(login)}>
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter email'}
                            }}
                            render={({field}) => {
                                return <TextField
                                    {...field}
                                    label="Email"
                                    variant='outlined'
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            }}
                        />
                    </FormControl>
                    {/* <div className='relative mt-5'>
                        <label htmlFor="" className='mb-2'>Email</label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" name="email" id="email" placeholder='Enter your email' className='border w-full mt-1 px-12 py-2 bg-gray rounded-full' />
                        <i className="fa-solid fa-envelope absolute left-4 bottom-3"></i>
                    </div> */}
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required:{value:true, message:'Enter password'}
                            }}
                            render={({field}) => {
                                return <TextField
                                    {...field}
                                    label="Password"
                                    variant='outlined'
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            }}
                        />
                    </FormControl>
                    {/* <div className='relative mt-5'>
                        <label htmlFor="" className='mb-2'>Password</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type={showpassword ? "text" : "password"} name="password" id="password" placeholder='Password' className='border w-full mt-1 px-12 py-2 bg-gray rounded-full'/>
                        <i className="fa-solid fa-key absolute left-4 bottom-3"></i>
                        <i onClick={togglePasswordVisibility} className={showpassword ? "fa-regular fa-eye-slash absolute right-4 bottom-3" : "fa-regular fa-eye absolute right-4 bottom-3"}></i>
                    </div> */}
                    <div className='flex justify-end'>
                        <Link to={'/forgot-password'} className='forgot-password mt-4 mb-4 block'>Forgot password?</Link>
                    </div>
                    <div>
                        <button type="submit" className='bg-main w-full rounded-full text-white py-2'>Login</button>
                    </div>
                </form>
            </div>
            <div id="welcome-section" className='flex items-end justify-start md:w-1/2 bg-main text-white relative'>
                <p className="font-3xl mx-8 my-8" id='welcome-text'>Hi<br />Welcome<br /> back</p>
                <div className="rounded-full dec-circle absolute right-8 bottom-10"></div>
                <div className="rounded-full dec-circle-top-1 absolute top-4 left-4"></div>
                {/* <div className="rounded-full dec-circle-top-2 absolute top-4 left-25"></div> */}
            </div>
        </div>
    </div>
    )
}