import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resendOtp, verify } from "../../../services/userServices";
import { Notify } from "notiflix";
import { HiOutlineEnvelope } from "react-icons/hi2";

export default function VerificationPage(){

    const digit1Ref = useRef<HTMLInputElement | null>(null)
    const digit2Ref = useRef<HTMLInputElement | null>(null)
    const digit3Ref = useRef<HTMLInputElement | null>(null)
    const digit4Ref = useRef<HTMLInputElement | null>(null)
    const digit5Ref = useRef<HTMLInputElement | null>(null)
    const digit6Ref = useRef<HTMLInputElement | null>(null)

    const [digit1, setDigit1] = useState('')
    const [digit2, setDigit2] = useState('')
    const [digit3, setDigit3] = useState('')
    const [digit4, setDigit4] = useState('')
    const [digit5, setDigit5] = useState('')
    const [digit6, setDigit6] = useState('')


    const [valuesFilled, setValuesFilled] = useState(false)
    const [otpError, setOtpError] = useState('')

    useEffect(() => {
        if(digit1){
            digit2Ref.current?.focus()
        }

        if(digit2){
            digit3Ref.current?.focus()
        }

        if(digit3){
            digit4Ref.current?.focus()
        }

        if(digit4){
            digit5Ref.current?.focus()
        }

        if(digit5){
            digit6Ref.current?.focus()
        }

        if(digit1 && digit2 && digit3 && digit4 && digit5 && digit6){
            setValuesFilled(true)
        }else{
            setValuesFilled(false)
        }
    
    }, [digit1, digit2, digit3, digit4, digit5, digit6])

    const OTP_EXPIRY_SECONDS = 120;

    const [remainingtime, setreminingtime] = useState(OTP_EXPIRY_SECONDS)
    const [resendenabled, setresendenabled] = useState(false)

    const location = useLocation()
    const {email, id} = location.state || {}

    const navigate = useNavigate()

    const startTimer = () => {
        setresendenabled(false);

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
            const timeStamp = Date.now() + (OTP_EXPIRY_SECONDS * 1000)
            localStorage.setItem('otpExpiresAtTS', timeStamp.toString())
            setreminingtime(OTP_EXPIRY_SECONDS)
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

        return () => clearInterval(interval);
    }

    useEffect(() => {
        const cleanup = startTimer();
        return cleanup;
    }, []);

    const getMinute = (time : number) : number => {
        return Math.floor(time / 60)
    }

    const getSecond = (time : number) : number => {
        return Math.round(time % 60)
    }

    async function verifyOnSubmit() {
        
        if(
            isNaN(parseInt(digit1)) ||
            isNaN(parseInt(digit2)) ||
            isNaN(parseInt(digit3)) ||
            isNaN(parseInt(digit4)) ||
            isNaN(parseInt(digit5)) ||
            isNaN(parseInt(digit6))
        ){
            setOtpError('OTP can only contain digits')
            return
        }else{
            setOtpError('')
        }
        
        const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

        if(otp.length !== 6){
            setOtpError('OTP length must be 6')
            return
        }

        if(!id){
            Notify.failure('Something went wrong', {timeout:1400})
            return
        }

        const result = await verify(id, otp)

        if(result.success){
            Swal.fire({
                title:"Success",
                icon:"success",
                text:'Email verified successfully',
                showConfirmButton:true,
                showCancelButton:false,
                allowOutsideClick:false,
                allowEscapeKey:false,
                confirmButtonText:"Login"
            }).then((result) => {
                if(result.isConfirmed){
                    navigate(`/login`)
                }
                return
            })
        }else{
            setOtpError(result.message)
        }
    }

    async function handleResendOtp() {
        if (!email) {
            Notify.failure('Email not found. Cannot resend OTP.', {timeout: 2000});
            return;
        }
        
        const result = await resendOtp(email, id)

        if (result.success) {
            Notify.success('A new OTP has been sent to your email.', {timeout: 2000});
            startTimer();
        } else {
            Notify.failure('Failed to resend OTP. Please try again later.', {timeout: 2000});
        }
    }

    return(
        <>
            <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex flex-col items-center justify-center">
                <div className="shadow-lg w-sm md:w-md bg-white border border-gray-200 rounded-md p-7 md:p-10">
                    <div className="flex justify-center w-full items-center">
                        <div className="bg-blue-100 rounded-full w-13 h-13 flex justify-center items-center">
                            <HiOutlineEnvelope color="blue" size={23} />
                        </div>
                    </div>
                    <div className="!my-5">
                        <p className="text-center">Email verification</p>
                        <p className="text-center text-gray-700 font-light text-sm mt-2">We have sent a verification code to your email {email || 'test@gmail.com'}</p>
                    </div>
                    <form>
                        <p className="text-center text-sm text-gray-700">Enter 6 digit code</p>
                        <div className="flex gap-2 w-full justify-center mt-3">
                            <div className="bg-gray-100 rounded-md !p-2 w-8"> 
                                <input min={1} max={1} className="w-[100%] " type="text" value={digit1} onChange={(e) => setDigit1(e.target.value)} ref={digit1Ref} />
                            </div>

                            <div className="bg-gray-100 rounded-md !p-2 w-8"> 
                                <input min={1} max={1} className="w-[100%] " type="text" value={digit2} onChange={(e) => setDigit2(e.target.value)} ref={digit2Ref} />
                            </div>

                            <div className="bg-gray-100 rounded-md !p-2 w-8"> 
                                <input min={1} max={1} className="w-[100%] " type="text" value={digit3} onChange={(e) => setDigit3(e.target.value)} ref={digit3Ref} />
                            </div>

                            <div className="bg-gray-100 rounded-md !p-2 w-8"> 
                                <input min={1} max={1} className="w-[100%] " type="text" value={digit4} onChange={(e) => setDigit4(e.target.value)} ref={digit4Ref} />
                            </div>

                            <div className="bg-gray-100 rounded-md !p-2 w-8"> 
                                <input min={1} max={1} className="w-[100%] " type="text" value={digit5} onChange={(e) => setDigit5(e.target.value)} ref={digit5Ref} />
                            </div>

                            <div className="bg-gray-100 rounded-md !p-2 w-8"> 
                                <input min={1} max={1} className="w-[100%] " type="text" value={digit6} onChange={(e) => setDigit6(e.target.value)} ref={digit6Ref} />
                            </div>
                        </div>
                        <div>
                            <p className="text-center text-xs !my-4 text-red-500">{otpError}</p>
                        </div>
                        <div>
                            <p className="text-center text-sm mt-3 text-gray-500">OTP will expire in <span className="text-blue-500">{getMinute(remainingtime)}:{getSecond(remainingtime)}</span></p>
                        </div>
                        <div className="mt-3 w-full">
                            <button type="button" onClick={verifyOnSubmit} disabled={!valuesFilled} className={`w-full bg-${valuesFilled ? 'black' : 'gray-400'} text-sm text-white rounded-sm py-2`}>Verify & continue</button>
                        </div>
                        <div className="resend-otp">
                          <p className="text-center text-sm mt-3">Didn't receive any code? <button onClick={handleResendOtp} disabled={!resendenabled} className={resendenabled ? "link text-blue-600 resend-otp-button" : "text-gray-400"}>Resend OTP</button></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}