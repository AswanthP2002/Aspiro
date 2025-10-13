import { Link, useNavigate } from "react-router-dom";
import './Register.css'
import facebookIcon from '/icons/icons8-facebook-48.png'
import googleIcon from '/icons/icons8-google-48.png'
import { useState } from "react";
import Loader from "../../../components/candidate/Loader";
import { recruiterRegister } from "../../../services/recruiterServices";
import { Controller, useForm } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";

export default function RecruiterRegister(){

    type Inputs = {
        fullName : string
        email : string
        phone : string
        password : string
        confirmPassword : string
    }

    const {control, watch, handleSubmit, formState:{errors}} = useForm<Inputs>()

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [validationerror, setvalidationerror] = useState(false)
    const [validationerrortext, setvalidationerrortext] = useState("")
    const [loading, setloading] = useState(false)
    const [showpassword, setshowpassword] = useState(false)
    const [emailerror, setemailerror] = useState("")
    const [passworderror, setpassworderror] = useState("")
    const [usernameerror, setusernameerror] = useState("")
    const [passwordconfirmationerror, setpasswordconfirmationerror] = useState("")

    const navigateTo = useNavigate()

    function togglePasswordVisibility(){
        setshowpassword(prev => !prev)
    }

    async function register(){
        setloading(true)
        console.log(watch())
        const {fullName, email, phone, password} = watch()

        const result = await recruiterRegister(fullName, email, phone, password)
        if(result.success){
            setloading(false)
            navigateTo('/verify', {state:{email:result?.email, id:result?.id}})
                    
        }else{
            setloading(false)
            setvalidationerror(true)
            setvalidationerrortext(result.message)
        }
    }

    const typedPassword = watch('password')

    // // async function validateRegister(event : any) {
    // //     setloading(true)
    // //     event.preventDefault()
    // //     const typedUsernameError = !/^[a-zA-Z0-9_]{3,16}$/.test(username) || !username || false
    // //     const typedEmailError = !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email) || !email || false
    // //     const typedPasswordError = !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) || !password || false
    // //     const confirmationError = password !== confirmpassword || false
        
    // //     //check for passsword confirmation


    // //     typedEmailError ? setemailerror("Enter a valid Email") : setemailerror("")
    // //     typedPasswordError ? setpassworderror("Enter a strong password") : setpassworderror("")
    // //     typedUsernameError ? setusernameerror("Username can not be empty") : setusernameerror("")
    // //     confirmationError ? setpasswordconfirmationerror("Password doesn't match") : setpasswordconfirmationerror("")
        
    // //     if(typedEmailError || typedUsernameError || typedPasswordError || confirmationError){
    // //         setvalidationerror(true)
    // //         setloading(false)
    // //         setvalidationerrortext("Fill the details correctly!")
    // //         return
    // //     }else{
    // //         setvalidationerror(false)
    // //         setvalidationerrortext("")
    // //         //send data to the backend

           
    // //             const result = await recruiterRegister(email, username, password)
    // //             if(result.success){
    // //                 setloading(false)
    // //                 navigator(`/verify/recruiter/${result.recruiter}`)
                    
    // //             }else{
    // //                 setloading(false)
    // //                 setvalidationerror(true)
    // //                 setvalidationerrortext(result.message)
    // //             }
            
    // //     }
    // }

    //google authentication
    async function googleAuth(){
        window.location.assign('http://localhost:5000/google')
    }

    return(
        <div className="flex items-center justify-center w-full h-auto min-h-screen">
            {loading ? <Loader /> : null}
            <div className="candidate-register-form-wrapper w-full max-w-md p-5">
                <h2 className="text-center font-bold">Create Account</h2>
                <p className="text-center text-xs mt-1" id="login-switch">Already have an account? <span><Link to={'/login'} className="link">Login</Link></span></p>
                <div className="switch-role bg-gray p-2 mt-5 py-3 px-5">
                    <p className="text-center text-gray-600 font-medium">Create account as</p>
                    <div className="flex justify-between mt-3">
                        <div className="candidate w-1/2 ">
                            <i className="fa-solid fa-user mr-2"></i>
                            <span>Candidate</span>
                        </div>
                        <div className="recruiter w-1/2 bg-blue-900 text-white p-1 rounded">
                            <i className="fa-solid fa-building mr-2"></i>
                            <span>Recruiter</span>
                        </div>
                    </div>
                </div>
                <form className="form w-full" onSubmit={handleSubmit(register)}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="" className="error-label mt-2" style={{textAlign:"center"}}>{validationerrortext}</label>
                    </div>
                    <FormControl fullWidth>
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter your full name'},
                                minLength:{value:3, message:'Minimum 3 charecters'},
                                maxLength:{value:30, message:'Maximum 30 charecters'},
                                pattern:{value:/^[\p{L}'\-\s]{2,}(?:\s[\p{L}'\-]+)*$/u, message:'Please enter a valid name'}
                            }}
                            render={({field}) => {
                                return <TextField {...field} variant="outlined" label="Full Name" error={Boolean(errors.fullName)} helperText={errors.fullName?.message} />
                            }}
                        />
                    </FormControl>
                    {/* <div className="mt-3">
                        <input value={username} onChange={(event) => setusername(event.target.value)} className="border w-full p-2 rounded-sm" type="text" name="text" id="text" placeholder="Username" />
                        <span className="field-error text-xs text-red-500">{usernameerror}</span>
                    </div> */}
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter your email'},
                                pattern:{value:/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, message:'Please enter a valid email'}
                            }}
                            render={({field}) => {
                                return <TextField {...field} variant="outlined" label="Email" error={Boolean(errors.email)} helperText={errors.email?.message} />
                            }}
                        />
                    </FormControl>
                    {/* <div className="mt-3">
                        <input value={email} onChange={(event) => setemail(event.target.value)} className="border w-full p-2 rounded-sm" type="email" name="email" id="email" placeholder="email" />
                        <span className="field-error text-xs text-red-500">{emailerror}</span>
                    </div> */}
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter your phone'},
                                minLength:{value:10, message:'Minimu 10 digits'},
                                maxLength:{value:10, message:'Maximum 10 digits'},
                                pattern:{value:/^(?:(?:\+|0{0,2})91[\s\-]?)?([6-9]\d{9})$/, message:'Please enter a valid mobile number'}
                            }}
                            render={({field}) => {
                                return <TextField {...field} variant="outlined" label="Phone" error={Boolean(errors.phone)} helperText={errors.phone?.message} />
                            }}
                        />
                    </FormControl>
                    {/* <div className="mt-3 relative">
                        <input value={password} onChange={(event) => setpassword(event.target.value)} className="border w-full p-2 rounded-sm" type={showpassword ? "text" : "password"} name="password" id="password" placeholder="Password" />
                        <i onClick={togglePasswordVisibility}
                            className={showpassword ? "fa-regular fa-eye-slash absolute bottom-3 right-4" : "fa-regular fa-eye absolute bottom-3 right-4"}
                        ></i>
                        <span className="field-error text-xs text-red-500 absolute left-0 bottom-0">{passworderror}</span>
                    </div> */}
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter your password'},
                                minLength:{value:8, message:'Minimu 8 charecters'},
                                maxLength:{value:15, message:'Maximum 15 charecters'},
                                pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message:'Password must contain 1 Uppercase, 1 lowercase, 1 number, 1 special charecter'}
                            }}
                            render={({field}) => {
                                return <TextField {...field} variant="outlined" label="Password" error={Boolean(errors.password)} helperText={errors.password?.message} />
                            }}
                        />
                    </FormControl>

                    {/* <div className="mt-2">
                        <input value={confirmpassword} onChange={(event) => setconfirmpassword(event.target.value)} className="border w-full p-2 rounded-sm" type="password" name="password-confirm" id="password-confirm" placeholder="Confirm password" />
                        <div className="field-error text-xs text-red-500">{passwordconfirmationerror}</div>
                    </div> */}
                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please confirm your password'},
                                minLength:{value:8, message:'Minimu 8 charecters'},
                                maxLength:{value:15, message:'Maximum 15 charecters'},
                                pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message:'Password must contain 1 Uppercase, 1 lowercase, 1 number, 1 special charecter'},
                                validate:(value) => {
                                    return value === typedPassword || 'Password didnt match'
                                }
                                
                            }}
                            render={({field}) => {
                                return <TextField {...field} variant="outlined" label="Confirm Password" error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword?.message} />
                            }}
                        />
                    </FormControl>
                    {/* <div className="tooltip-password">
                    </div>
                    <div className="flex items-center justify-start gap-2 mt-3" id="terms-service-wrapper">
                        <input type="checkbox" name="terms" id="terms" required />
                        <label htmlFor="terms">I have read and agree with your <span><Link to={'/terms'} className="link">Terms & Services</Link></span></label>
                    </div> */}
                    <div className="mt-3">
                        <button type="submit" id="register-button" className="bg-blue-600 rounded-sm w-full py-2 text-xs transition transform active:scale-95" style={{cursor:"pointer"}}>Create Account</button>
                    </div>
                </form>
                <div className="flex items-center justify-center w-full mt-2">
                    <p>OR</p>
                </div>
                <div className="social-auth w-full flex justify-between mt-2 gap-3">
                    <button type="button" className="border border-gray-300 text-xs w-1/2 py-2"><img src={facebookIcon} className="inline-block" alt="" /> Sign In with facebook</button>
                    <button onClick={googleAuth} type="button" className="border border-gray-300 text-xs w-1/2 py-2"><img src={googleIcon} className="inline-block" alt="" /> Sign up with google </button>
                </div>
            </div>
        </div>
    )
}