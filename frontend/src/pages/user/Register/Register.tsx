import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useState } from 'react';
import { registerUser } from '../../../services/userServices';
import GoogleLoginButton from '../../../components/common/GoogleLoginButton';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormHelperText } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineUser,
} from 'react-icons/hi2';
import { BsEye } from 'react-icons/bs';
import { FiEyeOff } from 'react-icons/fi';

type registerResultPayload = {
  success: boolean;
  message: string;
  userId: string;
  userEmail: string;
};

export default function UserRegister(): React.ReactNode {
  type Inputs = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
  };

  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmpassword: '',
    },
  });

  const [validationerrortext, setvalidationerrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prv) => !prv);

  const navigate = useNavigate();

  async function registerOnSubmit(data: Inputs): Promise<void> {
    setLoading(true);
    const { name, email, phone, password } = data;

    try {
      const result: registerResultPayload = await registerUser(name, email, phone, password);
      if (result.success) {
        navigate(`/verify`, { state: { email: result.userEmail, id: result.userId } });
      } else {
        setvalidationerrortext(result.message);
      }
    } catch (error: unknown) {
      setvalidationerrortext(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
      console.log('done');
    }
  }

  const typedPassword = watch('password');

  return (
    <>
      <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center p-6">
        {/* Simple Branding Header */}
        <div className="w-full max-w-md my-10 text-center">
          <p className="text-3xl font-black tracking-tighter text-slate-900">
            Aspiro<span className="text-blue-600">.</span>
          </p>
        </div>

        {/* The Main Card */}
        <div className="w-full max-w-md bg-white shadow-xl shadow-blue-900/5 rounded-2xl border border-slate-100 p-8 md:p-10 mb-10 transition-all">
          {/* Back Navigation */}
          <div className="w-full mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 hover:text-blue-600 text-sm flex gap-2 items-center transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>

          {/* Header Text */}
          <div className="w-full mb-8">
            <p className="text-2xl font-bold text-slate-900">Create Account</p>
            <p className="mt-2 text-sm text-slate-500">
              Already have an account?
              <Link to="/login" className="ml-1 font-semibold text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Validation Error Message */}
          {validationerrortext && (
            <div className="w-full mb-4">
              <p className="text-center text-xs font-medium text-red-500 bg-red-50 py-2 rounded-md border border-red-100">
                {validationerrortext}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(registerOnSubmit)} className="flex flex-col gap-4">
            {/* Name Field */}
            <FormControl fullWidth error={Boolean(errors.name)}>
              <label className="text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: { value: true, message: 'Name is mandatory' },
                  minLength: { value: 3, message: 'Minimum 3 characters' },
                  maxLength: { value: 30, message: 'Maximum 30 characters' },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/,
                    message: 'Please enter a valid name',
                  },
                }}
                render={({ field }) => (
                  <div
                    className={`flex items-center gap-3 bg-slate-50 border transition-all p-3 rounded-lg focus-within:bg-white focus-within:ring-2 ${errors.name ? 'border-red-300 focus-within:ring-red-100' : 'border-slate-100 focus-within:ring-blue-50 focus-within:border-blue-400'}`}
                  >
                    <HiOutlineUser
                      className={errors.name ? 'text-red-400' : 'text-slate-400'}
                      size={18}
                    />
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                      className="outline-none w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                )}
              />
              <FormHelperText className="!mx-0">{errors.name?.message}</FormHelperText>
            </FormControl>

            {/* Email Field */}
            <FormControl fullWidth error={Boolean(errors.email)}>
              <label className="text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: { value: true, message: 'Email is mandatory' },
                  maxLength: { value: 50, message: 'Maximum 50 characters' },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email',
                  },
                }}
                render={({ field }) => (
                  <div
                    className={`flex items-center gap-3 bg-slate-50 border transition-all p-3 rounded-lg focus-within:bg-white focus-within:ring-2 ${errors.email ? 'border-red-300 focus-within:ring-red-100' : 'border-slate-100 focus-within:ring-blue-50 focus-within:border-blue-400'}`}
                  >
                    <HiOutlineEnvelope
                      className={errors.email ? 'text-red-400' : 'text-slate-400'}
                      size={18}
                    />
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your email address"
                      className="outline-none w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                )}
              />
              <FormHelperText className="!mx-0">{errors.email?.message}</FormHelperText>
            </FormControl>

            {/* Phone Field */}
            <FormControl fullWidth error={Boolean(errors.phone)}>
              <label className="text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                Phone
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: { value: true, message: 'Phone number is mandatory' },
                  minLength: { value: 10, message: 'Minimum 10 characters' },
                  maxLength: { value: 13, message: 'Maximum 13 characters' },
                  pattern: {
                    value: /^(?:\+91|0)?[6-9]\d{9}$/,
                    message: 'Please enter a valid mobile number',
                  },
                }}
                render={({ field }) => (
                  <div
                    className={`flex items-center gap-3 bg-slate-50 border transition-all p-3 rounded-lg focus-within:bg-white focus-within:ring-2 ${errors.phone ? 'border-red-300 focus-within:ring-red-100' : 'border-slate-100 focus-within:ring-blue-50 focus-within:border-blue-400'}`}
                  >
                    <HiOutlinePhone
                      className={errors.phone ? 'text-red-400' : 'text-slate-400'}
                      size={18}
                    />
                    <input
                      {...field}
                      type="number"
                      placeholder="Enter your phone number"
                      className="outline-none w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                )}
              />
              <FormHelperText className="!mx-0">{errors.phone?.message}</FormHelperText>
            </FormControl>

            {/* Password Field */}
            <FormControl fullWidth error={Boolean(errors.password)}>
              <label className="text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: { value: true, message: 'Password is mandatory' },
                  minLength: { value: 8, message: 'Password length must be 8' },
                  maxLength: { value: 15, message: 'Maximum length is 15' },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                    message: 'One special character, uppercase, lowercase, digit required',
                  },
                }}
                render={({ field }) => (
                  <div
                    className={`flex items-center gap-3 bg-slate-50 border transition-all p-3 rounded-lg focus-within:bg-white focus-within:ring-2 ${errors.password ? 'border-red-300 focus-within:ring-red-100' : 'border-slate-100 focus-within:ring-blue-50 focus-within:border-blue-400'} relative`}
                  >
                    <HiOutlineLockClosed
                      className={errors.password ? 'text-red-400' : 'text-slate-400'}
                      size={18}
                    />
                    <input
                      {...field}
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="outline-none w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                    <div className="absolute right-3">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {isPasswordVisible ? <FiEyeOff size={16} /> : <BsEye size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              />
              <FormHelperText className="!mx-0">{errors.password?.message}</FormHelperText>
            </FormControl>

            {/* Confirm Password Field */}
            <FormControl fullWidth error={Boolean(errors.confirmpassword)}>
              <label className="text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                Confirm password
              </label>
              <Controller
                name="confirmpassword"
                control={control}
                rules={{
                  validate: (value) => (value === typedPassword ? true : "Password doesn't match"),
                  required: { value: true, message: 'Confirm your password' },
                  minLength: { value: 8, message: 'Password length must be 8' },
                  maxLength: { value: 15, message: 'Maximum length is 15' },
                }}
                render={({ field }) => (
                  <div
                    className={`flex items-center gap-3 bg-slate-50 border transition-all p-3 rounded-lg focus-within:bg-white focus-within:ring-2 ${errors.confirmpassword ? 'border-red-300 focus-within:ring-red-100' : 'border-slate-100 focus-within:ring-blue-50 focus-within:border-blue-400'}`}
                  >
                    <HiOutlineLockClosed
                      className={errors.confirmpassword ? 'text-red-400' : 'text-slate-400'}
                      size={18}
                    />
                    <input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                      className="outline-none w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                )}
              />
              <FormHelperText className="!mx-0">{errors.confirmpassword?.message}</FormHelperText>
            </FormControl>

            {/* Terms and Submit */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-xs font-medium text-slate-500">
                I agree to the terms and conditions
              </label>
            </div>

            <div className="mt-2">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                loading={loading}
                sx={{
                  py: 1.5,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  bgcolor: 'black',
                  '&:hover': { bgcolor: '#1a1a1a' },
                }}
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="flex gap-4 items-center my-6">
            <div className="border-b border-slate-100 w-full"></div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest">OR</p>
            <div className="border-b border-slate-100 w-full"></div>
          </div>

          <div className="w-full">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
      {/* <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex flex-col items-center">
        <div className="w-full !my-10">
          <p className='text-center font-medium text-2xl'>Aspiro</p>
        </div>
        <div className="w-sm bg-white md:w-md shadow-lg rounded-md border border-gray-200 p-7 md:p-10 !mb-10">
          <div className="w-full">
            <button onClick={() => navigate(-1)} className='text-gray-500 text-sm flex gap-2 items-center'>
              <FaArrowLeft />
              Back
            </button>
          </div>
          <div className="w-full my-5">
            <p className="text-center">Create Account</p>
            <p className="text-center mt-3 text-sm text-black font-light">Already have an account? 
              <Link to='/login'>
                <span className="font-medium text-blue-500 cursor-pointer">Login</span>
              </Link>
            </p>
          </div>
          <div className="w-full">
            <p className='text-center text-xs text-red-500'>{validationerrortext}</p>
          </div>

          <form onSubmit={handleSubmit(registerOnSubmit)}>
            <FormControl fullWidth error={Boolean(errors.name)}>
              <label htmlFor="" className="!text-black text-xs font-medium">Name</label>
              <Controller 
                name='name'
                control={control}
                rules={{
                  required: { value: true, message: 'Name is mandatory' },
                  minLength: { value: 3, message: 'Minimum 3 charecters' },
                  maxLength: { value: 30, message: 'Maximum 30 charecters' },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/,
                    message: 'Please enter a valid name',
                  },
                }}
                render={({field}) => (
                  <div className='flex items-center gap-3 bg-gray-100 !p-2 rounded-md'>
                    <HiOutlineUser color='gray' />
                    <input {...field} type="text" placeholder='Enter your name' className='outline-none w-full' />
                  </div>
                )}
              />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.email)} className='!mt-3'>
              <label htmlFor="" className="!text-black text-xs font-medium">Email</label>
              <Controller 
                name='email'
                control={control}
                rules={{
                  required: { value: true, message: 'Email is mandatory' },
                  maxLength: { value: 50, message: 'Maximum 50 charecters' },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email',
                  },
                }}
                render={({field}) => (
                  <div className='flex items-center gap-3 bg-gray-100 !p-2 rounded-md'>
                    <HiOutlineEnvelope color='gray' />
                    <input {...field} type="text" placeholder='Enter your email address' className='outline-none w-full' />
                  </div>
                )}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.phone)} className='!mt-3'>
              <label htmlFor="" className="!text-black text-xs font-medium">Phone</label>
              <Controller 
                name='phone'
                control={control}
                rules={{
                  required: { value: true, message: 'Phone number is mandatory' },
                  minLength: { value: 10, message: 'Minimum 10 charecters' },
                  maxLength: { value: 13, message: 'Maximum 13 charecters' },
                  pattern: {
                    value: /^(?:\+91|0)?[6-9]\d{9}$/,
                    message: 'Please enter a valid mobile number',
                  },
                }}
                render={({field}) => (
                  <div className='flex items-center gap-3 bg-gray-100 !p-2 rounded-md'>
                    <HiOutlinePhone color='gray' />
                    <input {...field} type="number" placeholder='Enter your phone number' className='outline-none w-full' />
                  </div>
                )}
              />
              <FormHelperText>{errors.phone?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.password)} className='!mt-3'>
              <label htmlFor="" className="!text-black text-xs font-medium">Password</label>
              <Controller 
                name='password'
                control={control}
                rules={{
                  required: { value: true, message: 'Password is mandatory' },
                  minLength: { value: 8, message: 'Password length must be 8' },
                  maxLength: { value: 15, message: 'Maximum length is 15' },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                    message:
                      'Password must contain one special character, uppercase, lowercase, digit',
                  },
                }}
                render={({field}) => (
                  <div className='flex items-center gap-3 bg-gray-100 !p-2 rounded-md relative'>
                    <HiOutlineLockClosed color='gray' />
                    <input {...field} type={isPasswordVisible ? "text" : "password"} placeholder='Enter your password' className='outline-none w-full' />
                    <div className="absolute right-4">
                      {
                        isPasswordVisible
                          ? <button type='button' onClick={togglePasswordVisibility}><FiEyeOff /></button>
                          : <button type='button' onClick={togglePasswordVisibility}><BsEye /></button>
                          
                      }
                    </div>
                  </div>
                )}
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.confirmpassword)} className='!mt-3'>
              <label htmlFor="" className="!text-black text-xs font-medium">Confirm password</label>
              <Controller 
                name='confirmpassword'
                control={control}
                rules={{
                  validate: (value) => {
                    return value === typedPassword ? true : "Password doesn't match";
                  },
                  required: { value: true, message: 'Confirm your password' },
                  minLength: { value: 8, message: 'Password length must be 8' },
                  maxLength: { value: 15, message: 'Maximum length is 15' },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                    message:
                      'Password must contain one special character, uppercase, lowercase, digit',
                  },
                }}
                render={({field}) => (
                  <div className='flex items-center gap-3 bg-gray-100 !p-2 rounded-md'>
                    <HiOutlineLockClosed color='gray' />
                    <input {...field} type="password" placeholder='Confirm your password' className='outline-none w-full' />
                  </div>
                )}
              />
              <FormHelperText>{errors.confirmpassword?.message}</FormHelperText>
            </FormControl>

            <div className='!mt-2'>
              <input type="checkbox" className='!me-2' />
              <label htmlFor="" className='text-xs font-light'>I have read and agree with your terms and conditions</label>
            </div>
            <div>
              <Button 
                type='submit' 
                variant='contained' 
                fullWidth loading={loading}
                sx={{
                  marginTop:'5px',
                  bgcolor:'black'
                }}
              >
                  Crate Account
              </Button>
            </div>
          </form>
          <div className="flex gap-2 justify-between items-center !mt-3">
            <div className="border-b border-gray-300 w-full"></div>
                <p className="text-sm font-light">OR</p>
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          <div className="w-full !mt-2">
            <GoogleLoginButton />
          </div>
        </div>
      </div> */}
    </>
  );
}
