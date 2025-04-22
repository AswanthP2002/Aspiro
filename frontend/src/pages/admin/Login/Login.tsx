import { Link } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import Loader from '../../../components/admin/Loader'

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [loading, setloading] = useState(false)
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState("Error")
    const [showpassword, setshowpassword] = useState(false)

    function togglePasswordVisibility(){
        setshowpassword(prev => !prev)
    }

    function validateForm(event : any) : void{
        setloading(true)
        event.preventDefault() //prevent event from submitting without validations
        let typedEmail = email || false
        let typedPassword = password || false
        if(!typedEmail || !typedPassword){
            setloading(false)
            setLoginError(true)
            setLoginErrorText("Please enter full credentials")
            return
        }else{
            setLoginError(false)
            setLoginErrorText("")
        }

        console.log('Email', email)
        console.log('Password', password)
        setTimeout(() => {
            setloading(false)
            alert('Hi, logined successfully')
        }, 2000)
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
                <form className="form" onSubmit={(event) => validateForm(event)}>
                    <div className='relative mt-5'>
                        <label htmlFor="" className='mb-2'>Email</label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" name="email" id="email" placeholder='Enter your email' className='border w-full mt-1 px-12 py-2 bg-gray rounded-full' />
                        <i className="fa-solid fa-envelope absolute left-4 bottom-3"></i>
                    </div>
                    <div className='relative mt-5'>
                        <label htmlFor="" className='mb-2'>Password</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type={showpassword ? "text" : "password"} name="password" id="password" placeholder='Password' className='border w-full mt-1 px-12 py-2 bg-gray rounded-full'/>
                        <i className="fa-solid fa-key absolute left-4 bottom-3"></i>
                        <i onClick={togglePasswordVisibility} className={showpassword ? "fa-regular fa-eye-slash absolute right-4 bottom-3" : "fa-regular fa-eye absolute right-4 bottom-3"}></i>
                    </div>
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