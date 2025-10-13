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

export default function CandidateLogin(){

    type Inputs = {
        email : string
        password : string
    }

    const {watch, handleSubmit, formState:{errors}, control} = useForm<Inputs>({
        defaultValues:{
            email:"",
            password:""
        }
    })


    const [showpassword, setshowpassword] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [validationerror, setvalidationerror] = useState(false)
    const [validationerrortext, setvalidationerrortext] = useState("")
    const [loading, setloading] = useState(false)
    const [emailerror, setemailerror] = useState("")
    const [passworderror, setpassworderror] = useState("")

    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    function togglePasswordVisibility(){
        setshowpassword(prev => !prev)
    }

    const goToRecruiterLogin = () => {
        navigateTo('/recruiter/login')
    }

    async function login() {
        setloading(true)
        //event.preventDefault()
        // const typedEmailerror = !email || false
        // const typedPassworderror = !password || false

        // typedEmailerror ? setemailerror("Please enter your email") : ""
        // typedPassworderror ? setpassworderror("Please enter your password") : ""

        // if(typedEmailerror || typedPassworderror){
        //     setloading(false)
        //     setvalidationerror(true)
        //     setvalidationerrortext("Please fill the credentials")
        //     return
        // }else{
        //     //login
                const {email, password} = watch()
                const result = await candidateLogin(email, password)

                if(result?.success){
                    dispatcher(loginSuccess({user:result?.result?.user, userToken:result?.result?.token, userRole:result?.result?.role}))
                    setloading(false)
                    navigateTo('/')
                }else{
                    setloading(false)
                    setvalidationerror(true)
                    setvalidationerrortext(result.message)
                }
                
        //}
    }

    return(
        <div className="flex items-center justify-center w-full h-screen">
            {loading ? <Loader /> : null}
            <div className="candidate-register-form-wrapper w-full max-w-md p-5">
                <h2 className="text-center font-bold">Login</h2>
                <p className="text-center text-xs mt-1" id="login-switch">Dont have an account? <span><Link className="link" to={'/candidate/register'}>Sign Up</Link></span></p>
                <div className="switch-role bg-gray p-2 mt-5 py-3 px-5">
                    <p className="text-center text-gray-600 font-medium">Login As</p>
                    <div className="flex justify-between mt-3">
                        <div className="candidate bg-blue-900 text-white w-1/2 p-1 rounded">
                            <i className="fa-solid fa-user mr-2"></i>
                            <span>Candidate</span>
                        </div>
                        <div onClick={goToRecruiterLogin} className="recruiter w-1/2">
                            <i className="fa-solid fa-building mr-2"></i>
                            <span>Recruiter</span>
                        </div>
                    </div>
                </div>
                <form className="form w-full" onSubmit={handleSubmit(login)}>
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
                    {/* <div className="mt-3">
                        <input value={email} onChange={(event) => setemail(event.target.value)}  className="border w-full p-2 rounded-sm" type="email" name="email" id="email" placeholder="Email" />
                        <span className="field-error text-xs text-red-500">{emailerror}</span>
                    </div> */}
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
                    {/* <div className="mt-3 relative">
                        <input value={password} onChange={(event) => setpassword(event.target.value)} type={showpassword ? "text" : "password"}  className="border w-full p-2 rounded-sm" name="password" id="password" placeholder="Password" />
                        <i onClick={togglePasswordVisibility} className={showpassword ? "fa-regular fa-eye-slash absolute bottom-3 right-4" : "fa-regular fa-eye absolute bottom-3 right-4"}></i>
                        <span className="field-error text-xs text-red-500 absolute left-0 bottom-0">{passworderror}</span>
                    </div>
                    
                    <div className="flex items-center justify-start gap-2 mt-3" id="terms-service-wrapper">
                        <Link className="link" to={'/forgot-password'}>Forgot password ?</Link>
                    </div> */}
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
    )
}