import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InfinitySpinner from "../../../components/common/InfinitySpinner";
import { resendOtp, verify } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { Notify } from "notiflix";

export default function VerificationPage(){

    type Inputs = {
        otp : string
    }

    const {handleSubmit, formState:{errors}, control, setError} = useForm<Inputs>({defaultValues:{otp:""}})

    const OTP_EXPIRY_SECONDS = 120;

    const [loading, setloading] = useState(false)
    const [remainingtime, setreminingtime] = useState(OTP_EXPIRY_SECONDS)
    const [resendenabled, setresendenabled] = useState(false)

    const location = useLocation()
    const {email, id} = location.state || {}

    const navigate = useNavigate()

    // if(!email || !id){
    //     navigate('/error')
    // }

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

    async function onSubmit(data : Inputs) {
        const {otp} = data
        if(!id){
            Notify.failure('Something went wrong', {timeout:1400})
            return
        }
        setloading(true)

        const result = await verify(id, otp)

        if(result.success){
            Swal.fire({
                title:"Success",
                icon:"success",
                text:'Email verified successfully',
                showConfirmButton:true,
                showCancelButton:false,
                confirmButtonText:"Login"
            }).then((result) => {
                if(result.isConfirmed){
                    navigate(`/login`)
                }
                return
            })
        }else{
            setError("otp", { type: "manual", message: result.message || "Invalid OTP" });
        }
        setloading(false);
    }

    async function handleResendOtp() {
        if (!email) {
            Notify.failure('Email not found. Cannot resend OTP.', {timeout: 2000});
            return;
        }
        setloading(true);
        // const result = await resendOtpService(email); // Assuming you have a service for this
        // For demonstration, let's simulate a successful resend
        const result = await resendOtp(email, id)
        setloading(false);

        if (result.success) {
            Notify.success('A new OTP has been sent to your email.', {timeout: 2000});
            startTimer();
        } else {
            Notify.failure('Failed to resend OTP. Please try again later.', {timeout: 2000});
        }
    }

    return(
        <div className="main w-full h-screen flex items-center justify-center">
            {loading ? <InfinitySpinner /> : null}
            <div className="verification-wrapper">
                <h2 className="text-center">Email Verification</h2>
                <p className="text-center text-gray-500 font-medium mt-2 text-xs">We have sent a verification code to your email {email}</p>
                <form className="form-otp" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <Controller
                        name="otp"
                        control={control}
                        rules={{
                            required:{value:true, message:'Enter otp before continuing'},
                            minLength:{value:6, message:'OTP length must have 6'},
                            maxLength:{value:6, message:'OTP length maximum 6'},
                            pattern:{value:/^\d+$/, message:'OTP can only contain digits'}
                        }}
                        render={({field}) => {
                            return <TextField
                                {...field}
                                variant="outlined"
                                label="OTP"
                                error={Boolean(errors.otp)}
                                helperText={errors.otp?.message}
                            />
                        }}
                    />
                </FormControl>
                <button type="submit" className="mt-3 text-white font-medium p-2 w-full max-w-2xl bg-gradient-to-br from-blue-500 to-indigo-600 rounded-sm">Submit</button>
                </form>
                <p className="text-center text-sm mt-2">OTP will expire in {getMinute(remainingtime)}:{getSecond(remainingtime)}</p>
                <div className="resend-otp">
                    <p className="text-center text-sm mt-2">Didn't receive any code? <button onClick={handleResendOtp} disabled={!resendenabled} className={resendenabled ? "link text-blue-600 resend-otp-button" : "text-gray-400"}>Resend OTP</button></p>
                </div>
            </div>
        </div>
    )
}