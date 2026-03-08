import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import React, { useState } from "react";
// import {motion} from 'motion/react'
import { useDispatch } from "react-redux";
import { userLogin } from "../../../services/userServices";
import { loginSuccess } from "../../../redux/userAuthSlice";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, FormHelperText } from "@mui/material";
import { Notify } from "notiflix";
import {FaChartLine} from 'react-icons/fa'
import {HiOutlineEnvelope} from 'react-icons/hi2'
import {GoLock} from 'react-icons/go'
import GoogleLoginButton from "../../../components/common/GoogleLoginButton";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import whiteAspiro from '/white-icon-aspiro.png'
import { BiPointer } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";

interface UserSuccessfullLoginResult {
    user:{
        id: string,
        name: string,
        profilePicture: string,
        email: string
    },
    accessToken: string,
    role: string
}
type LoginResultPayload = {
    success: boolean,
    message: string,
    result?: UserSuccessfullLoginResult | null
}

export default function UserLogin(): React.ReactNode{

    type Inputs = {
        email : string
        password : string
    }

    const { handleSubmit, formState:{errors}, control} = useForm<Inputs>({
        defaultValues:{
            email:"",
            password:""
        }
    })

    const [validationerrortext, setvalidationerrortext] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const togglePasswordVisibility = () => setIsPasswordVisible(prv => !prv)

    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    async function loginOnSubmit(data : Inputs): Promise<void>{
        setLoading(true)
        const {email, password} = data
        try {
            const result: LoginResultPayload = await userLogin(email, password)
            console.log('Result from the backend', result?.result)

            if(result?.success && result?.result){
                dispatcher(loginSuccess({
                    user:result?.result?.user,
                    userToken:result?.result?.accessToken,
                    userRole:result?.result?.role
                }))
                // socket?.emit('register_user', result?.result?.user?.id)
                navigateTo('/')
            }else{
                setvalidationerrortext(result.message)
            }
        } catch (error : unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:1200})
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
        <div className="w-full min-h-screen">
            <div className="grid grid-cols-12 min-h-screen">
                <div className="left hidden relative col-span-12 md:col-span-7 md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800">
                    <div className="relative z-90">
                        <img className="w-35" src={whiteAspiro} alt="" />
                        <p className="ms-5 text-white font-bold text-5xl">Hello Aspiro! 👋🏻</p>
                        <p className="ms-5 text-white text-sm font-light mt-3">Grow with us; Empowering careers, connecting opportunities</p>
                        {/* <p className="ms-5 text-white mt-8 text-sm leading-relaxed">Aspiro is a professional platform which brdige the gap between <br />
                        social world and career growth. Connect with others and grow your <br />
                        professional netwroks along with opportunities.
                        </p> */}
                        <div className="space-y-2 mt-10 ms-5">
                            <div className="flex gap-3 text-white border border-white-200 rounded-md p-4 bg-blue-600">    
                                <div className="bg-orange-500 w-12 h-12 flex items-center justify-center rounded-md">
                                    <BiPointer size={22} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Discover Opportunities</p>
                                    <p className="text-xs">Access thousands of opportunities matching your skills</p>
                                </div>
                            </div>
                            <div className="flex gap-3 text-white border border-white-200 rounded-md p-4 bg-blue-600">    
                                <div className="bg-blue-800 w-12 h-12 flex items-center justify-center rounded-md">
                                    <LuUsers size={22} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Build your network</p>
                                    <p className="text-xs">Connect with thousands of professionals and expand your network</p>
                                </div>
                            </div>
                            <div className="flex gap-3 text-white border border-white-200 rounded-md p-4 bg-blue-600">    
                                <div className="bg-green-500 w-12 h-12 flex items-center justify-center rounded-md">
                                    <FaChartLine size={22} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Grow your career</p>
                                    <p className="text-xs">Get insights and resources to grow your career</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="right col-span-12 md:col-span-5 flex flex-col items-center justify-center">
                    <div>
                        <p className="font-semibold text-2xl">Aspiro</p>
                        <div className="mt-15">
                            <p className="font-semibold text-xl">Welcome back!</p>
                            <p className="text-sm text-gray-500 mt-3">Dont have an account? <span className="font-medium text-black text-underline"><Link to='/register'><a>Create a new account now</a></Link></span></p>
                        </div>
                        
                        <form className="mt-5" onSubmit={handleSubmit(loginOnSubmit)}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter email'}
                            }}
                            render={({field}) => (
                                <div className="border-b border-slate-500 flex items-center !px-2 !py-2 gap-3">
                                    <HiOutlineEnvelope color="gray" />
                                    <input className="w-full outline-none" type="text" placeholder="Enter your email address"
                                     {...field}
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth className="!mt-5" error={Boolean(errors.password)}>
                        <div className="flex justify-between">
                            
                        </div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter password'}
                            }}
                            render={({field}) => (
                                <div className="border-b border-slate-500 relative flex items-center !px-2 !py-2 gap-3">
                                    <GoLock color="gray" />
                                    <input className="w-full outline-none" type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password"
                                     {...field}
                                    />
                                    <>
                                    {
                                        isPasswordVisible 
                                            ? <button onClick={togglePasswordVisibility} type="button" className="absolute right-4"><FiEyeOff /></button>
                                            : <button onClick={togglePasswordVisibility} type="button" className="absolute right-4"><BsEye /></button>
                                    }
                                    </>
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.password?.message}</FormHelperText>
                    </FormControl>
                    <div className="mt-3">
                        <p className="text-center text-red-500 text-sm font-medium">{validationerrortext}</p>
                    </div>
                    <div className="w-full mt-5">
                        <Button 
                            type="submit"
                            variant="contained"
                            sx={{
                                bgcolor:'black'
                            }}
                            loading={loading}
                            fullWidth
                        >
                                Login
                        </Button>
                        {/* <button type="submit" className="bg-black text-white text-sm w-full !p-2 rounded-md">Sign In</button> */}
                    </div>
                </form>
                <div className="flex flex-col gap-2 mt-3">
                    {/* <button type="button" className="border border-gray-300 rounded-md text-xs w-full !py-1"><img src={facebookIcon} className="inline-block w-7" alt="" /> Sign In with facebook</button> */}
                    <GoogleLoginButton />
                </div>
                    </div>
                    <p className="text-gray-500 text-xs flex items-center mt-3">Forgot password ? <Link to='/forgot-password'><p className="text-blue-500 text-xs font-medium text-underline text-black">click here</p></Link></p>
                </div>
            </div>
        </div>
        </>
    )
    // return(
    //     <>
    //     <motion.div
    //     initial={{opacity:0, x:'-100vw'}}
    //     animate={{opacity:1, x:'0', transition:{type: 'spring', stiffness:50}}}
    //     exit={{opacity:0, x:'100vw', transition:{ease:'easeInOut'}}}
        
    //     className="w-full bg-gradient-to-br from-white to-indigo-100 min-h-screen flex flex-col justify-center items-center">
    //         <div className="brand w-full !my-5">
    //             <p className="text-center font-medium cursor-pointer text-2xl">Aspiro</p>
    //         </div>
    //         <div className="bg-white w-sm md:w-md shadow-lg border border-gray-200 rounded-md !p-5">
    //             <div className="w-full">
    //                 <button onClick={() => navigateTo(-1)} className="text-gray-500 text-sm flex gap-2 items-center ">
    //                     <FaArrowLeft />
    //                     Back
    //                 </button>
    //             </div>
    //             <div className="w-full my-5">
    //                 <p className="text-center">Welcome back</p>
    //                 <p className="text-center mt-3 text-sm text-black font-light">Dont have an account? 
    //                     <Link to='/register'>
    //                         <span className="font-medium text-blue-500 cursor-pointer">Sign Up</span>
    //                     </Link>
    //                 </p>
    //             </div>
    //             <div>
    //                 <p className="text-center text-red-500 text-sm font-medium">{validationerrortext}</p>
    //             </div>
    //             <form onSubmit={handleSubmit(loginOnSubmit)}>
    //                 <FormControl fullWidth error={Boolean(errors.email)}>
    //                     <label htmlFor="" className="!text-black text-xs font-medium">Email</label>
    //                     <Controller
    //                         name="email"
    //                         control={control}
    //                         rules={{
    //                             required:{value:true, message:'Please enter email'}
    //                         }}
    //                         render={({field}) => (
    //                             <div className="bg-gray-100 rounded-md flex items-center !px-2 !py-2 gap-3">
    //                                 <HiOutlineEnvelope color="gray" />
    //                                 <input className="w-full outline-none" type="text" placeholder="Enter your email address"
    //                                  {...field}
    //                                 />
    //                             </div>
    //                         )}
    //                     />
    //                     <FormHelperText>{errors.email?.message}</FormHelperText>
    //                 </FormControl>

    //                 <FormControl fullWidth className="!mt-3" error={Boolean(errors.password)}>
    //                     <div className="flex justify-between">
    //                         <label htmlFor="" className="!text-black text-sm font-medium">Password</label>
    //                         <Link to='/forgot-password'><p className="text-blue-500 text-xs">Forgot password?</p></Link>
    //                     </div>
    //                     <Controller
    //                         name="password"
    //                         control={control}
    //                         rules={{
    //                             required:{value:true, message:'Please enter password'}
    //                         }}
    //                         render={({field}) => (
    //                             <div className="bg-gray-100 relative rounded-md flex items-center !px-2 !py-2 gap-3">
    //                                 <GoLock color="gray" />
    //                                 <input className="w-full outline-none" type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password"
    //                                  {...field}
    //                                 />
    //                                 <>
    //                                 {
    //                                     isPasswordVisible 
    //                                         ? <button onClick={togglePasswordVisibility} type="button" className="absolute right-4"><FiEyeOff /></button>
    //                                         : <button onClick={togglePasswordVisibility} type="button" className="absolute right-4"><BsEye /></button>
    //                                 }
    //                                 </>
    //                             </div>
    //                         )}
    //                     />
    //                     <FormHelperText>{errors.password?.message}</FormHelperText>
    //                 </FormControl>
    //                 <div className="w-full mt-3">
    //                     <Button 
    //                         type="submit"
    //                         variant="contained"
    //                         sx={{
    //                             bgcolor:'black'
    //                         }}
    //                         loading={loading}
    //                         fullWidth
    //                     >
    //                             Login
    //                     </Button>
    //                     {/* <button type="submit" className="bg-black text-white text-sm w-full !p-2 rounded-md">Sign In</button> */}
    //                 </div>
    //             </form>
    //             <div className="flex !my-3 justify-between gap-2 items-center">
    //                 <div className="border-b border-gray-300 w-full"></div>
    //                 <p className="text-sm font-light">OR</p>
    //                 <div className="border-b border-gray-300 w-full"></div>
    //             </div>
                // <div className="flex flex-col gap-2">
                //     {/* <button type="button" className="border border-gray-300 rounded-md text-xs w-full !py-1"><img src={facebookIcon} className="inline-block w-7" alt="" /> Sign In with facebook</button> */}
                //     <GoogleLoginButton />
                // </div>
    //         </div>
    //     </motion.div>
    //     </>
    // )
}