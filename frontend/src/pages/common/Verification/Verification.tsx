import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../components/candidate/Loader";

export default function VerificationPage(){
    const [otp, setotp] = useState("")
    const [otpError, setotpError] = useState(false)
    const [otpErrorText, setOtpErrorText] = useState("")
    const [loading, setloading] = useState(false)
    const [remainingtime, setreminingtime] = useState(60)
    const [resendenabled, setresendenabled] = useState(false)

    useEffect(() => {
        if(remainingtime <= 0){
            setresendenabled(true)
            return
        }

        let countDown = setTimeout(() => {
            setreminingtime(prev => prev - 1)
        }, 1000)

        return () => clearInterval(countDown)
    }, [remainingtime])

    const getMinute = (time : number) : number => {
        return Math.floor(time / 60)
    }

    const getSecond = (time : number) : number => {
        return Math.round(time % 60)
    }
    

    const {email} = useParams()

    const navigator = useNavigate()

    function submitOtp(event : any) : void {
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
            fetch('http://localhost:5000/verify', {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({otp, email})
            })
            .then((response) => {
                if(response.status === 500) throw new Error('Internal server error, please try again after some time')
                return response.json()
            })
            .then((result) => {
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
            })
            .catch((error) => {
                Swal.fire({
                    title:"Oops",
                    icon:"error",
                    text:error.message
                })
            })
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