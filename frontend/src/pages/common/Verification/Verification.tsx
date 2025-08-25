import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../components/candidate/Loader";
import { verify } from "../../../services/candidateServices";

export default function VerificationPage(){
    const [otp, setotp] = useState("")
    const [otpError, setotpError] = useState(false)
    const [otpErrorText, setOtpErrorText] = useState("")
    const [loading, setloading] = useState(false)
    const [remainingtime, setreminingtime] = useState(120)
    const [resendenabled, setresendenabled] = useState(false)

    const location = useLocation()

    useEffect(() => {
        const otpExpireTimeStamp = localStorage.getItem('otpExpiresAtTS')

        if(otpExpireTimeStamp){
            const remTime = Math.floor((parseInt(otpExpireTimeStamp) - Date.now()) / 1000)
            if(remTime > 0){
                setreminingtime(remTime)
            }else{
                localStorage.removeItem('otpExpiresAtTS')
                setresendenabled(true)
            }
        }else{
            const timeStamp = Date.now() + (120 * 1000)
            localStorage.setItem('otpExpiresAtTS', timeStamp.toString())
            setreminingtime(120)
        }

        const interval = setInterval(() => {
            setreminingtime(prv => {
                if(prv > 1){
                    return prv - 1
                }else{
                    localStorage.removeItem('otpExpiresAtTS')
                    clearInterval(interval)
                    setresendenabled(true)
                    return 0
                }
            })
        }, 1000);
        
    }, [])

    const getMinute = (time : number) : number => {
        return Math.floor(time / 60)
    }

    const getSecond = (time : number) : number => {
        return Math.round(time % 60)
    }
    

    const {email} = location.state || {}

    const navigator = useNavigate()

    async function submitOtp(event : any) {
        setloading(true)
        event.preventDefault()
        const typedOtpError = !otp || false

        if(typedOtpError){
            setloading(false)
            setotpError(true)
            setOtpErrorText("Please enter the otp before continue")
            return
        }else{
            setloading(false)
            
                const result = await verify(email, otp)

                if(result.success){
                    Swal.fire({
                        title:"Success",
                        icon:"success",
                        text:'Registration completed. Please login to continue',
                        showConfirmButton:true,
                        showCancelButton:true,
                        confirmButtonText:"Login"
                    }).then((result) => {
                        if(result.isConfirmed){
                            navigator(`/login`)
                        }
                    })
                }else{
                    setotpError(true)
                    setOtpErrorText(result.message)
                }

        }
    }

    return(
        <div className="main w-full h-screen flex items-center justify-center">
            {loading ? <Loader /> : null}
            <div className="verification-wrapper">
                <h2 className="text-center">Email Verification</h2>
                <p className="text-center text-gray-500 font-bold mt-2 text-xs">We have sent a verification code to your email {email}</p>
                <p className="text-center text-red-500 mt-3 mb-3 text-xs">{otpErrorText}</p>
                <form className="form-otp" onSubmit={(event) => submitOtp(event)}>
                <input value={otp} onChange={(event) => setotp(event.target.value)} type="number" name="otp" id="otp" className="mt-4 w-full max-w-2xl border border-gray-500 rounded-sm p-2" placeholder="Enter the otp" />
                <button type="submit" className="mt-3 text-white font-bold p-2 w-full max-w-2xl bg-blue-500 rounded-sm">Verify Email</button>
                </form>
                <p className="text-center text-sm mt-2">OTP will expire in {getMinute(remainingtime)}:{getSecond(remainingtime)}</p>
                <div className="resend-otp">
                    <p className="text-center text-sm mt-2">Didin't recieved any code <button onClick={() => alert('I ve got clicked')} disabled={resendenabled ? false : true} className={resendenabled ? "link text-blue-600 resend-otp-button" : "text-gray-400"}>Resend OTP</button></p>
                </div>
            </div>
        </div>
    )
}