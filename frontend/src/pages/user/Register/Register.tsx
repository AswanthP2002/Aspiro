import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useState } from 'react';
import { registerCandiate } from '../../../services/userServices';
import GoogleLoginButton from '../../../components/common/GoogleLoginButton';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormHelperText} from '@mui/material';
import {FaArrowLeft} from 'react-icons/fa'
import {HiOutlineEnvelope, HiOutlinePhone, HiOutlineLockClosed, HiOutlineUser} from 'react-icons/hi2'


export default function CandidateRegister() {
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

  const [validationerrortext, setvalidationerrortext] = useState('');

  const navigate = useNavigate();

  async function registerOnSubmit(data: Inputs) {
    const { name, email, phone, password } = data;

    try {
      const result = await registerCandiate(name, email, phone, password);
      if (result.success) {
        navigate(`/verify`, { state: { email: result?.userEmail, id: result?.userId } });
      } else {
        setvalidationerrortext(result.message);
      }
    } catch (error : unknown) {
      setvalidationerrortext(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      console.log('done')
    }
  }

  const typedPassword = watch('password');

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex flex-col items-center">
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
                  <div className='flex items-center gap-3 bg-gray-100 !p-2 rounded-md'>
                    <HiOutlineLockClosed color='gray' />
                    <input {...field} type="password" placeholder='Enter your password' className='outline-none w-full' />
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
              <button type='submit' className='bg-black text-white text-sm w-full !p-2 rounded-md !mt-2'>Create Account</button>
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
      </div>
    </>
  );
}
