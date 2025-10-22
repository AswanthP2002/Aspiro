import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import InfinitySpinner from '../../../components/common/InfinitySpinner'
import { useDispatch } from 'react-redux'
import { adminLogin} from '../../../services/adminServices'
import { Controller, useForm } from 'react-hook-form'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { loginSuccess } from '../../../redux-toolkit/userAuthSlice'

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
    const [loginError, setLoginError] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatcher = useDispatch()
    
    async function onSubmit(data : Inputs){
        setloading(true)
        setLoginError(false)
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

            setloading(false)
            navigate('/admin/dashboard')
        }else{
            setloading(false)
            setLoginError(true)
            setLoginErrorText(result?.message)
        }
    }

    return(
        <div className="main w-full h-screen bg-secondary flex items-center justify-center">
            {loading ? <InfinitySpinner color='orange' /> : null}
        <div className="max-w-4xl w-full bg-white flex flex-col md:flex-row shadow-sm">
            <div id="login-section" className='md:w-1/2 p-8 bg-white'>
                <p className="brand-name">Aspiro</p>
                <div className="flex items-center justify-center">
                    <h2 className='font-bold'>Login</h2>
                </div>
                <div className='flex justify-center'>
                    {loginError ? <label htmlFor="" className='error-label'>{loginErrorText}</label> : null}
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    variant='outlined'
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            }}
                        />
                    </FormControl>
                    
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
                
            </div>
        </div>
    </div>
    )
}