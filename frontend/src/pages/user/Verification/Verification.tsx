import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resendOtp, verify } from "../../../services/userServices";
import { Notify } from "notiflix";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Button } from "@mui/material";

type ResultPayload = {
    success: boolean,
    message: string
}

export default function VerificationPage(){

    const digit1Ref = useRef<HTMLInputElement | null>(null)
    const digit2Ref = useRef<HTMLInputElement | null>(null)
    const digit3Ref = useRef<HTMLInputElement | null>(null)
    const digit4Ref = useRef<HTMLInputElement | null>(null)
    const digit5Ref = useRef<HTMLInputElement | null>(null)
    const digit6Ref = useRef<HTMLInputElement | null>(null)

    const [digit1, setDigit1] = useState<string>('')
    const [digit2, setDigit2] = useState<string>('')
    const [digit3, setDigit3] = useState<string>('')
    const [digit4, setDigit4] = useState<string>('')
    const [digit5, setDigit5] = useState<string>('')
    const [digit6, setDigit6] = useState<string>('')


    const [valuesFilled, setValuesFilled] = useState<boolean>(false)
    const [otpError, setOtpError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

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

    if(!email || !id){
        return navigate('/login')
    }

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

    async function verifyOnSubmit(): Promise<void> {
        setLoading(true)
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

        try {
            setLoading(true)
            const result: ResultPayload = await verify(id, otp)
    
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
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error)
        } finally {
            setLoading(false)
        }
    }

    async function handleResendOtp() {
        alert('Handle resend clicked')
        Notify.info(`Emai ${email}`)
        Notify.info(`Id ${id}`)
        if (!email) {
            alert('No Email present')
            Notify.failure('Email not found. Cannot resend OTP.', {timeout: 2000});
            return;
        }
        alert('Email is available')
        try {
            alert('going to call api')
            const result = await resendOtp(email, id)
    
            if (result.success) {
                alert('a')
                Notify.success('A new OTP has been sent to your email.', {timeout: 2000});
                startTimer();
            } else {
                Notify.failure('Failed to resend OTP. Please try again later.', {timeout: 2000});
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    return(
        <>
            <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
  {/* Branding (Optional but professional) */}
  <div className="mb-8">
    <p className='text-2xl font-black tracking-tighter text-slate-900'>Aspiro<span className="text-blue-600">.</span></p>
  </div>

  <div className="w-full max-w-md bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl p-8 md:p-12 border border-slate-100">
    {/* Icon Header */}
    <div className="flex justify-center w-full mb-8">
      <div className="bg-blue-50 text-blue-600 rounded-2xl w-16 h-16 flex justify-center items-center shadow-inner">
        <HiOutlineEnvelope size={32} strokeWidth={1.5} />
      </div>
    </div>

    {/* Typography Hierarchy */}
    <div className="text-center mb-10">
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Check your email</h2>
      <p className="text-slate-500 text-sm mt-3 leading-relaxed">
        We've sent a 6-digit verification code to <br />
        <span className="font-semibold text-slate-900">{email || 'test@gmail.com'}</span>
      </p>
    </div>

    <form className="space-y-8">
      <div className="space-y-4">
        <p className="text-center text-[11px] font-bold uppercase tracking-[2px] text-slate-400">Enter Verification Code</p>
        
        {/* OTP Inputs */}
        <div className="flex gap-2 sm:gap-3 w-full justify-center">
          {[
            { val: digit1, set: setDigit1, ref: digit1Ref },
            { val: digit2, set: setDigit2, ref: digit2Ref },
            { val: digit3, set: setDigit3, ref: digit3Ref },
            { val: digit4, set: setDigit4, ref: digit4Ref },
            { val: digit5, set: setDigit5, ref: digit5Ref },
            { val: digit6, set: setDigit6, ref: digit6Ref },
          ].map((digit, idx) => (
            <div key={idx} className="w-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-xl transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"> 
              <input 
                maxLength={1} 
                className="w-full h-full text-center text-xl font-bold text-slate-900 bg-transparent outline-none" 
                type="text" 
                value={digit.val} 
                onChange={(e) => digit.set(e.target.value)} 
                ref={digit.ref} 
              />
            </div>
          ))}
        </div>

        {/* Error Handling */}
        {otpError && (
          <div className="bg-red-50 border border-red-100 py-2 rounded-lg">
            <p className="text-center text-xs font-bold text-red-500 uppercase tracking-tight">{otpError}</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-slate-600">
          Code expires in <span className="font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{getMinute(remainingtime)}:{getSecond(remainingtime)}</span>
        </p>
      </div>

      <div className="w-full">
        <Button 
          type="button" 
          variant="contained" 
          loading={loading} 
          onClick={verifyOnSubmit} 
          disabled={!valuesFilled}
          fullWidth
          sx={{
            py: 1.8,
            borderRadius: '16px',
            textTransform: 'none',
            fontWeight: 800,
            fontSize: '0.95rem',
            bgcolor: valuesFilled ? '#0F172A' : '#E2E8F0',
            color: valuesFilled ? 'white' : '#94A3B8',
            '&:hover': { bgcolor: '#000' },
            boxShadow: valuesFilled ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          Verify & Continue
        </Button>
      </div>

      <div className="pt-2">
        <p className="text-center text-sm text-slate-500">
          Didn't receive the code?{' '}
          <button 
            type="button" 
            onClick={handleResendOtp} 
            disabled={!resendenabled} 
            className={`font-bold transition-colors ${resendenabled ? "text-blue-600 hover:text-blue-700 underline underline-offset-4" : "text-slate-300"}`}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </form>
  </div>
</div>
        </>
    )
}