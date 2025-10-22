import { Link, useNavigate } from "react-router-dom";
import facebookIcon from '/icons/icons8-facebook-48.png'
import googleIcon from '/icons/icons8-google-48.png'
import './Login.css'
import { useState } from "react";
import Loader from "../../../components/candidate/Loader";
import { useDispatch } from "react-redux";
import { candidateLogin } from "../../../services/candidateServices";
import { loginSuccess } from "../../../redux-toolkit/userAuthSlice";
import { Controller, useForm } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { Notify } from "notiflix";

export default function CandidateLogin(){

    type Inputs = {
        email : string
        password : string
    }

    const { handleSubmit, formState:{errors}, control, setError} = useForm<Inputs>({
        defaultValues:{
            email:"",
            password:""
        }
    })



    const [validationerrortext, setvalidationerrortext] = useState("")
    const [loading, setloading] = useState(false)

    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    async function onSubmit(data : Inputs){
        setloading(true)
        const {email, password} = data
        try {
            const result = await candidateLogin(email, password)
            console.log('Result from the backend', result?.result)

            if(result?.success){
                //dispatcher(loginSuccess({user:result?.result?.user, userToken:result?.result?.token, userRole:result?.result?.role}))
                // dispatcher(loginSuccess({
                //     user:result?.user,
                //     userToken:result?.accessToken,
                //     userRole:result?.role
                // }))
                dispatcher(loginSuccess({
                    user:result?.result?.user,
                    userToken:result?.result?.accessToken,
                    userRole:result?.result?.role
                }))
                setloading(false)
                navigateTo('/')
            }else{
                setloading(false)
                setvalidationerrortext(result.message)
            }
        } catch (error : unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:1200})
            setloading(false)
        }
    }

    return(
        <div className="w-full min-h-screen">
            <div className="brand aspiro-container !py-10">
        <Link to="/">
          <h3 className="brand-text text-black text-l font-bold">Aspiro</h3>
        </Link>
      </div>
        <div className="flex items-center justify-center w-full">
            {loading ? <Loader /> : null}
            <div className="candidate-register-form-wrapper w-full max-w-md p-5">
                <h2 className="text-center font-bold">Login</h2>
                <p className="text-center text-xs mt-1" id="login-switch">Dont have an account? <span><Link className="link" to={'/candidate/register'}>Sign Up</Link></span></p>
                <form className="form w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="" className="error-label mt-2" style={{textAlign:"center"}}>{validationerrortext}</label>
                    </div>
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter your email'}
                            }}
                            render={({field}) => {
                                return <TextField
                                    {...field}
                                    label="Email"
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            }}
                        />
                    </FormControl>
                    
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller 
                            name="password"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter your password'}
                            }}
                            render={({field}) => {
                                return <TextField
                                    {...field}
                                    label="Password"
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            }}
                        />
                    </FormControl>
        
                    <div className="mt-3">
                        <button type="submit" id="register-button" className="bg-blue-600 rounded-sm w-full py-2 text-xs transition transform active:scale-95" style={{cursor:"pointer"}}>Login</button>
                    </div>
                </form>
                <div className="flex items-center justify-center w-full mt-2">
                    <p>OR</p>
                </div>
                <div className="social-auth w-full flex justify-between mt-2 gap-3">
                    <button type="button" className="border border-gray-300 text-xs w-1/2 py-2"><img src={facebookIcon} className="inline-block" alt="" /> Sign In with facebook</button>
                    <button type="button" className="border border-gray-300 text-xs w-1/2 py-2"><img src={googleIcon} className="inline-block" alt="" /> Sign up with google </button>
                </div>
            </div>
        </div>
        </div>
    )
}