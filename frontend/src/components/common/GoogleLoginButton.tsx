import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import {toast} from 'react-toastify'
import { Notify } from "notiflix";
import { googleLogin } from "../../services/commonServices";
import InfinitySpinner from "./InfinitySpinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginSuccess } from "../../redux/userAuthSlice";

export default function GoogleLoginButton(){
    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)


    const handleLoginSuccess = async (credentialResponse : CredentialResponse) => {
        const googleToken = credentialResponse.credential

        setLoading(true)
        const result = await googleLogin(googleToken as string)
        console.log('checking google login result from backend', result)
        if(result?.success){
            dispatcher(loginSuccess({
                user:result?.result?.user,
                userToken:result?.result?.accessToken,
                userRole:result?.result?.role
            }))
            setLoading(false)
            //navigateTo('/')
        }
        setLoading(false)
    }
    const handleError = () => {
        console.log('Something went wrong, can not login via google')
        toast.error('Something went wrong')
    }
    return(
        <div className="">
            {
                loading && (
                    <div className="absolute z-100 left-0 top-0 w-full">
                        <InfinitySpinner />
                    </div>
                )
            }
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleError} />
        </div>
    )
}