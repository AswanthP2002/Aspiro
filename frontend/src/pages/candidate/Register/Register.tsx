import { Link, useNavigate } from "react-router-dom";
import './Register.css'
import facebookIcon from '/icons/icons8-facebook-48.png'
import googleIcon from '/icons/icons8-google-48.png'
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import Loader from "../../../components/candidate/Loader";
import { candidateService } from "../../../services/commonServices";
import { registerCandiate } from "../../../services/candidateServices";

export default function CandidateRegister(){
    const [name, setfullname] = useState("")
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [validationerror, setvalidationerror] = useState(false)
    const [validationerrortext, setvalidationerrortext] = useState("")
    const [loading, setloading] = useState(false)
    const [showpassword, setshowpassword] = useState(false)
    const [emailerror, setemailerror] = useState("")
    const [phonerror, setphonerror] = useState("")
    const [passworderror, setpassworderror] = useState("")
    const [usernameerror, setusernameerror] = useState("")
    const [fullnameerror, setfullnameerror] = useState("")
    const [passwordconfirmationerror, setpasswordconfirmationerror] = useState("")

    const [onelowercasevalidation, setonelowercasevalidation] = useState(false)
    const [oneuppercasevalidation, setoneuppercasevalidation] = useState(false)
    const [onenumbervalidation, setonenumbervalidation] = useState(false)
    const [onespecialcharvalidation, setonespecialcharvalidation] = useState(false)
    const [minlength8validation, setminlength8validation] = useState(false)


    const navigator = useNavigate()

    function togglePasswordVisibility(){
        setshowpassword(prev => !prev)
    }

    function passwordGuideValidation(event : any){
        const passwordValue = event.target.value
        if(/[0-9]/.test(passwordValue)){
            setonenumbervalidation(true)
        }else{
            setonenumbervalidation(false)
        }

        if(/[a-z]/.test(passwordValue)){
            setonelowercasevalidation(true)
        }else{
            setonelowercasevalidation(false)
        }

        if(/[A-Z]/.test(passwordValue)){
            setoneuppercasevalidation(true)
        }else{
            setoneuppercasevalidation(false)
        }

        if(/[@$!%*#?&]/.test(passwordValue)){
            setonespecialcharvalidation(true)
        }else{
            setonespecialcharvalidation(false)
        }

        if(passwordValue.length >= 8){
            setminlength8validation(true)
        }else{
            setminlength8validation(false)
        }
    }

    async function validateRegister(event : any) {
        setloading(true)
        event.preventDefault()
        const typedFullnameError = !/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name) || !name || false
        const typedUsernameError = !/^[a-zA-Z0-9_]{3,16}$/.test(username) || !username || false
        const typedEmailError = !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email) || !email || false
        const typedPasswordError = !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) || !password || false
        const typedPhoneError = !/^[6-9]\d{9}$/.test(phone) || !phone || false
        const confirmationError = password !== confirmpassword || false
        
        //check for passsword confirmation


        typedEmailError ? setemailerror("Enter a valid Email") : setemailerror("")
        typedPhoneError ? setphonerror("Enter valid phone number") : setphonerror("")
        typedPasswordError ? setpassworderror("Enter a strong password") : setpassworderror("")
        typedUsernameError ? setusernameerror("Username can not be empty") : setusernameerror("")
        typedFullnameError ? setfullnameerror("Enter a valid name") : setfullnameerror("")
        confirmationError ? setpasswordconfirmationerror("Password doesn't match") : setpasswordconfirmationerror("")
        
        if(typedFullnameError || typedEmailError || typedUsernameError || typedPasswordError || typedPhoneError || confirmationError){
            setvalidationerror(true)
            setloading(false)
            setvalidationerrortext("Fill the details correctly!")
            return
        }else{
            setvalidationerror(false)
            setvalidationerrortext("")
            //send data to the backend

                const result = await registerCandiate(name, email, phone, username, password)

                if(result.success){
                    setloading(false)
                    navigator(`/verify/${result.candidate}`)
                    
                }else{
                    setloading(false)
                    setvalidationerror(true)
                    setvalidationerrortext(result.message) 
                }

        }
    }

    //google authentication
    async function googleAuth(){
        window.location.assign('http://localhost:5000/google')
    }

    return(
        <div className="flex items-center justify-center w-full h-screen">
            {loading ? <Loader /> : null}
            <div className="candidate-register-form-wrapper w-full max-w-md p-5">
                <h2 className="text-center font-bold">Create Account</h2>
                <p className="text-center text-xs mt-1" id="login-switch">Already have an account? <span><Link to={'/login'} className="link">Login</Link></span></p>
                <div className="switch-role bg-gray p-2 mt-5 py-3 px-5">
                    <p className="text-center text-gray-600 font-medium">Create account as</p>
                    <div className="flex justify-between mt-3">
                        <div className="candidate bg-blue-900 text-white w-1/2 p-1 rounded">
                            <i className="fa-solid fa-user mr-2"></i>
                            <span>Candidate</span>
                        </div>
                        <div className="recruiter w-1/2">
                            <i className="fa-solid fa-building mr-2"></i>
                            <span>Recruiter</span>
                        </div>
                    </div>
                </div>
                <form className="form w-full" onSubmit={(event) => validateRegister(event)}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="" className="error-label mt-2" style={{textAlign:"center"}}>{validationerrortext}</label>
                    </div>
                    <div className="flex justify-between gap-4 mt-3">
                        <div className="w-1/2">
                            <input value={name} onChange={(event) => setfullname(event.target.value)} className="border p-2 rounded-sm" type="text" name="fullname" id="fullname" placeholder="Full name" />
                            <span className="field-error text-xs text-red-500">{fullnameerror}</span>
                        </div>
                        <div className="w-1/2">
                            <input value={username} onChange={(event) => setusername(event.target.value)} className="border p-2 rounded-sm" type="text" name="username" id="username" placeholder="Username" />
                            <span className="field-error text-xs text-red-500">{usernameerror}</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <input value={email} onChange={(event) => setemail(event.target.value)} className="border w-full p-2 rounded-sm" type="email" name="email" id="email" placeholder="Email" />
                        <span className="field-error text-xs text-red-500">{emailerror}</span>
                    </div>
                    <div className="mt-3">
                        <input value={phone} onChange={(event) => setphone(event.target.value)} className="border w-full p-2 rounded-sm" type="number" name="phone" id="phone" placeholder="phone" />
                        <span className="field-error text-xs text-red-500">{phonerror}</span>
                    </div>
                    <div className="mt-3 relative">
                        <input onKeyUp={(event) => passwordGuideValidation(event)} value={password} onChange={(event) => setpassword(event.target.value)} className="border w-full p-2 rounded-sm" type={showpassword ? "text" : "password"} name="password" id="password" placeholder="Password" />
                        <i onClick={togglePasswordVisibility}
                            className={showpassword ? "fa-regular fa-eye-slash absolute bottom-3 right-4" : "fa-regular fa-eye absolute bottom-3 right-4"}
                        ></i>
                        <span className="field-error text-xs text-red-500 absolute left-0 bottom-0">{passworderror}</span>
                    </div>
                    <div className="mt-2">
                        <input value={confirmpassword} onChange={(event) => setconfirmpassword(event.target.value)} className="border w-full p-2 rounded-sm" type="password" name="password-confirm" id="password-confirm" placeholder="Confirm password" />
                        <div className="field-error text-xs text-red-500">{passwordconfirmationerror}</div>
                    </div>
                    <div className="tooltip-password py-1">
                        <p className={oneuppercasevalidation ? "text-xs text-green-500 text-shadow" : "text-xs text-gray-500"}><i className="fa-solid fa-check !text-xs text-gray-400 me-1"></i>One uppercase letter</p>
                        <p className={onelowercasevalidation ? "text-xs text-green-500 text-shadow" : "text-xs text-gray-500"}><i className="fa-solid fa-check !text-xs text-gray-400 me-1"></i>One lowercase letter</p>
                        <p className={onespecialcharvalidation ? "text-xs text-green-500 text-shadow" : "text-xs text-gray-500"}><i className="fa-solid fa-check !text-xs text-gray-400 me-1"></i>One special charecter</p>
                        <p className={onenumbervalidation ? "text-xs text-green-500 text-shadow" : "text-xs text-gray-500"}><i className="fa-solid fa-check !text-xs text-gray-400 me-1"></i>One number</p>
                        <p className={minlength8validation ? "text-xs text-green-500 text-shadow" : "text-xs text-gray-500"}><i className="fa-solid fa-check !text-xs text-gray-400 me-1"></i>Minimum length 8</p>
                    </div>
                    <div className="flex items-center justify-start gap-2 mt-3" id="terms-service-wrapper">
                        <input type="checkbox" name="terms" id="terms" required />
                        <label htmlFor="terms">I have read and agree with your <span><Link to={'/terms'} className="link">Terms & Services</Link></span></label>
                    </div>
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