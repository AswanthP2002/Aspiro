import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Notify } from "notiflix";
import { googleLogin } from "../../services/commonServices";
import InfinitySpinner from "./InfinitySpinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginSuccess } from "../../redux-toolkit/userAuthSlice";

export default function GoogleLoginButton(){
    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)


    const handleLoginSuccess = async (credentialResponse : CredentialResponse) => {
        const googleToken : any = credentialResponse.credential

        setLoading(true)
        const result = await googleLogin(googleToken)

        if(result?.success){
            console.log('--testing user object from the server ---', result?.result)
            dispatcher(loginSuccess({
                user:result?.result?.user,
                userToken:result?.result?.token,
                userRole:result?.result?.role
            }))
            //dispatcher(loginSucess({user:result?.result?.user, token:result?.result?.token}))
            setLoading(false)
            navigateTo('/')
        }
        setLoading(false)
    }
    const handleError = () => {
        console.log('Something went wrong, can not login via google')
        Notify.failure('Something went wrong')
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