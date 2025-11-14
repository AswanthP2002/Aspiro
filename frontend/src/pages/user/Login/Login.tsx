import { Link, useNavigate } from "react-router-dom";
import facebookIcon from '/icons/icons8-facebook-48.png'
import googleIcon from '/icons/icons8-google-48.png'
import './Login.css'
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { candidateLogin } from "../../../services/userServices";
import { loginSuccess } from "../../../redux-toolkit/userAuthSlice";
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { Notify } from "notiflix";
import { SocketContext } from "../../../context/SocketContext";
import {FaArrowLeft} from 'react-icons/fa'
import {HiOutlineEnvelope} from 'react-icons/hi2'
import {GoLock} from 'react-icons/go'
import GoogleLoginButton from "../../../components/common/GoogleLoginButton";


export default function CandidateLogin(){

    const {socket} = useContext(SocketContext)

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



    const [validationerrortext, setvalidationerrortext] = useState("")

    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    async function loginOnSubmit(data : Inputs){
        //alert('testing')
        const {email, password} = data
        try {
            const result = await candidateLogin(email, password)
            console.log('Result from the backend', result?.result)

            if(result?.success){
                dispatcher(loginSuccess({
                    user:result?.result?.user,
                    userToken:result?.result?.accessToken,
                    userRole:result?.result?.role
                }))
                socket?.emit('register_user', result?.result?.user?._id)
                navigateTo('/')
            }else{
                setvalidationerrortext(result.message)
            }
        } catch (error : unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:1200})
        }
    }

    return(
        <>
        <div className="w-full bg-gradient-to-br from-white to-indigo-100 min-h-screen flex flex-col justify-center items-center">
            <div className="brand w-full !my-5">
                <p className="text-center font-medium cursor-pointer text-2xl">Aspiro</p>
            </div>
            <div className="bg-white w-sm md:w-md shadow-lg border border-gray-200 rounded-md !p-5">
                <div className="w-full">
                    <button onClick={() => navigateTo(-1)} className="text-gray-500 text-sm flex gap-2 items-center ">
                        <FaArrowLeft />
                        Back
                    </button>
                </div>
                <div className="w-full my-5">
                    <p className="text-center">Welcome back</p>
                    <p className="text-center mt-3 text-sm text-black font-light">Dont have an account? 
                        <Link to='/register'>
                            <span className="font-medium text-blue-500 cursor-pointer">Sign Up</span>
                        </Link>
                    </p>
                </div>
                <div>
                    <p className="text-center text-red-500 text-sm font-medium">{validationerrortext}</p>
                </div>
                <form onSubmit={handleSubmit(loginOnSubmit)}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                        <label htmlFor="" className="!text-black text-xs font-medium">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter email'}
                            }}
                            render={({field}) => (
                                <div className="bg-gray-100 rounded-md flex items-center !px-2 !py-2 gap-3">
                                    <HiOutlineEnvelope color="gray" />
                                    <input className="w-full outline-none" type="text" placeholder="Enter your email address"
                                     {...field}
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth className="!mt-3" error={Boolean(errors.password)}>
                        <div className="flex justify-between">
                            <label htmlFor="" className="!text-black text-sm font-medium">Password</label>
                            <Link to='/forgot-password'><p className="text-blue-500 text-xs">Forgot password?</p></Link>
                        </div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required:{value:true, message:'Please enter password'}
                            }}
                            render={({field}) => (
                                <div className="bg-gray-100 rounded-md flex items-center !px-2 !py-2 gap-3">
                                    <GoLock color="gray" />
                                    <input className="w-full outline-none" type="text" placeholder="Enter your password"
                                     {...field}
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.password?.message}</FormHelperText>
                    </FormControl>
                    <div className="w-full mt-3">
                        <button type="submit" className="bg-black text-white text-sm w-full !p-2 rounded-md">Sign In</button>
                    </div>
                </form>
                <div className="flex !my-3 justify-between gap-2 items-center">
                    <div className="border-b border-gray-300 w-full"></div>
                    <p className="text-sm font-light">OR</p>
                    <div className="border-b border-gray-300 w-full"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <button type="button" className="border border-gray-300 rounded-md text-xs w-full !py-1"><img src={facebookIcon} className="inline-block w-7" alt="" /> Sign In with facebook</button>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
        </>
    )
}