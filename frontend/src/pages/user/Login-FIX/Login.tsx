import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../services/userServices';
import { loginSuccess } from '../../../redux/userAuthSlice';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormHelperText } from '@mui/material';
import { Notify } from 'notiflix';
import { FaChartLine } from 'react-icons/fa';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { GoLock } from 'react-icons/go';
import GoogleLoginButton from '../../../components/common/GoogleLoginButton';
import { FiEyeOff } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';
import whiteAspiro from '/white-icon-aspiro.png';
import { BiPointer } from 'react-icons/bi';
import { LuUsers } from 'react-icons/lu';

interface UserSuccessfullLoginResult {
  user: {
    id: string;
    name: string;
    profilePicture: string;
    email: string;
  };
  accessToken: string;
  role: string;
}
type LoginResultPayload = {
  success: boolean;
  message: string;
  result?: UserSuccessfullLoginResult | null;
};

export default function UserLogin(): React.ReactNode {
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [validationerrortext, setvalidationerrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prv) => !prv);

  const dispatcher = useDispatch();
  const navigateTo = useNavigate();

  async function loginOnSubmit(data: Inputs): Promise<void> {
    setLoading(true);
    const { email, password } = data;
    try {
      const result: LoginResultPayload = await userLogin(email, password);
      console.log('Login result from the backend--', result?.result);

      if (result?.success && result?.result) {
        dispatcher(
          loginSuccess({
            user: result?.result?.user,
            userToken: result?.result?.accessToken,
            userRole: result?.result?.role,
          })
        );
        // socket?.emit('register_user', result?.result?.user?.id)
        navigateTo('/');
      } else {
        setvalidationerrortext(result.message);
      }
    } catch (error: unknown) {
      Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {
        timeout: 1200,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Left Side: Brand Experience */}
          <div className="hidden col-span-12 md:col-span-7 md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-12 relative overflow-hidden">
            {/* Subtle background decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

            <div className="relative z-10 max-w-lg">
              <img className="w-32 drop-shadow-lg" src={whiteAspiro} alt="Aspiro Logo" />
              <h1 className="text-white font-black text-6xl tracking-tighter mt-6">
                Hello Aspiro! 👋🏻
              </h1>
              <p className="text-blue-100 text-lg font-light mt-4 leading-relaxed">
                Grow with us; Empowering careers, connecting opportunities across the professional
                world.
              </p>

              {/* Feature Cards */}
              <div className="space-y-4 mt-12">
                {[
                  {
                    icon: <BiPointer size={22} />,
                    title: 'Discover Opportunities',
                    desc: 'Access thousands of opportunities matching your skills',
                    color: 'bg-orange-500',
                  },
                  {
                    icon: <LuUsers size={22} />,
                    title: 'Build your network',
                    desc: 'Connect with thousands of professionals globally',
                    color: 'bg-blue-500',
                  },
                  {
                    icon: <FaChartLine size={22} />,
                    title: 'Grow your career',
                    desc: 'Get insights and resources to scale your professional journey',
                    color: 'bg-green-500',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 text-white border border-white/10 rounded-2xl p-5 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all cursor-default group"
                  >
                    <div
                      className={`${item.color} w-12 h-12 flex items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-base">{item.title}</p>
                      <p className="text-blue-100/80 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Authentication */}
          <div className="col-span-12 md:col-span-5 flex flex-col items-center justify-center p-8 md:p-16 bg-slate-50/30">
            <div className="w-full max-w-md">
              {/* Mobile/Small Screen Logo */}
              <p className="font-black text-2xl tracking-tighter text-slate-900 md:hidden mb-8">
                Aspiro<span className="text-blue-600">.</span>
              </p>

              <div className="mb-10">
                <h2 className="font-black text-4xl text-slate-900 tracking-tight">Welcome back!</h2>
                <p className="text-sm text-slate-500 mt-3 font-medium">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="ml-2 text-blue-600 hover:underline decoration-2 underline-offset-4"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(loginOnSubmit)}>
                {/* Email Field */}
                <FormControl fullWidth error={Boolean(errors.email)}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: { value: true, message: 'Please enter email' } }}
                    render={({ field }) => (
                      <div
                        className={`flex items-center gap-3 border-b-2 py-3 transition-colors ${errors.email ? 'border-red-400' : 'border-slate-200 focus-within:border-blue-600'}`}
                      >
                        <HiOutlineEnvelope
                          className={errors.email ? 'text-red-400' : 'text-slate-400'}
                          size={20}
                        />
                        <input
                          className="w-full outline-none bg-transparent text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal"
                          type="text"
                          placeholder="Email address"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <FormHelperText className="!mt-2">{errors.email?.message}</FormHelperText>
                </FormControl>

                {/* Password Field */}
                <FormControl fullWidth error={Boolean(errors.password)}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: { value: true, message: 'Please enter password' } }}
                    render={({ field }) => (
                      <div
                        className={`relative flex items-center gap-3 border-b-2 py-3 transition-colors ${errors.password ? 'border-red-400' : 'border-slate-200 focus-within:border-blue-600'}`}
                      >
                        <GoLock
                          className={errors.password ? 'text-red-400' : 'text-slate-400'}
                          size={20}
                        />
                        <input
                          className="w-full outline-none bg-transparent text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal"
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          type="button"
                          className="absolute right-0 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {isPasswordVisible ? <FiEyeOff size={18} /> : <BsEye size={18} />}
                        </button>
                      </div>
                    )}
                  />
                  <FormHelperText className="!mt-2">{errors.password?.message}</FormHelperText>
                </FormControl>

                {/* Error Message */}
                {validationerrortext && (
                  <div className="bg-red-50 border border-red-100 p-3 rounded-lg animate-pulse">
                    <p className="text-center text-red-500 text-xs font-bold uppercase tracking-tight">
                      {validationerrortext}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="contained"
                    loading={loading}
                    fullWidth
                    sx={{
                      bgcolor: 'black',
                      py: 1.8,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      '&:hover': { bgcolor: '#1a1a1a' },
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    }}
                  >
                    Login
                  </Button>
                </div>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="h-[1px] bg-slate-200 w-full"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Or
                </p>
                <div className="h-[1px] bg-slate-200 w-full"></div>
              </div>

              <div className="space-y-4 text-center">
                <GoogleLoginButton />

                <p className="text-slate-500 text-xs font-medium">
                  Forgot password?
                  <Link to="/forgot-password">
                    <span className="ml-1 text-blue-600 hover:underline font-bold">
                      Click here to reset
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
