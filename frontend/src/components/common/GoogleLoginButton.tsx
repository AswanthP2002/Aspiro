import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/commonServices";
import InfinitySpinner from "./InfinitySpinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginSuccess } from "../../redux/userAuthSlice";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export default function GoogleLoginButton(){
    const dispatcher = useDispatch()
    const navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)


    const handleLoginSuccess = async (credentialResponse : CredentialResponse) => {
        const googleToken = credentialResponse.credential

        setLoading(true)
        try {
            const result = await googleLogin(googleToken as string)
            console.log('checking google login result from backend', result)
            if(result?.success){
                dispatcher(loginSuccess({
                    user:result?.result?.user,
                    userToken:result?.result?.accessToken,
                    userRole:result?.result?.role
                }))
                // setLoading(false)
                //navigateTo('/')
            }
            // setLoading(false)
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const finalErrorMessage = err.response?.data.message || err.message || 'Something went wrong'
            console.log('Error occured while google signup', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: finalErrorMessage
            })
        } finally {
            setLoading(false)
        }
    }
    const handleError = () => {
        console.log('Something went wrong, can not login via google')
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong you can not login'
        })
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