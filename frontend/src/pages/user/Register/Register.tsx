import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import facebookIcon from '/icons/icons8-facebook-48.png';
import { useState } from 'react';
import { registerCandiate } from '../../../services/userServices';
import InfinitySpinner from '../../../components/common/InfinitySpinner';
import GoogleLoginButton from '../../../components/common/GoogleLoginButton';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';

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
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(data: Inputs) {
    setloading(true);
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
      setloading(false);
    }
  }

  const typedPassword = watch('password');

  return (
    <div className="w-full min-h-screen">
      <div className="brand aspiro-container !py-10">
        <Link to="/">
          <h3 className="brand-text text-black text-l font-bold">Aspiro</h3>
        </Link>
      </div>
      <div className="flex items-center justify-center w-full">
        {loading ? <InfinitySpinner /> : null}
        <div className="candidate-register-form-wrapper w-full max-w-md p-5">
          <h2 className="text-center font-bold">Create Account</h2>
          <p className="text-center text-xs mt-1" id="login-switch">
            Already have an account?{' '}
            <span>
              <Link to={'/login'} className="link">
                Login
              </Link>
            </span>
          </p>

          <form className="form w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center">
              <label htmlFor="" className="error-label mt-2" style={{ textAlign: 'center' }}>
                {validationerrortext}
              </label>
            </div>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: { value: true, message: 'Name is mandatory' },
                  minLength: { value: 3, message: 'Minimum 3 charecters' },
                  maxLength: { value: 30, message: 'Maximum 30 charecters' },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/,
                    message: 'Please enter a valid name',
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Name"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />
                  );
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: { value: true, message: 'Email is mandatory' },
                  maxLength: { value: 50, message: 'Maximum 50 charecters' },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email',
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  );
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: { value: true, message: 'Phone number is mandatory' },
                  minLength: { value: 10, message: 'Minimum 10 charecters' },
                  maxLength: { value: 13, message: 'Maximum 13 charecters' },
                  pattern: {
                    value: /^(?:\+91|0)?[6-9]\d{9}$/,
                    message: 'Please enter a valid mobile number',
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Phone"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                    />
                  );
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <Controller
                control={control}
                name="password"
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
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                    />
                  );
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <Controller
                control={control}
                name="confirmpassword"
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
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Confirm Password"
                      error={Boolean(errors.confirmpassword)}
                      helperText={errors.confirmpassword?.message}
                    />
                  );
                }}
              />
            </FormControl>

            <FormControl sx={{ marginTop: '10px' }}>
              <FormControlLabel
                control={<Checkbox required={true} />}
                label="I have read and agree with yoru terms and conditions"
              />
            </FormControl>

            <div className="mt-3">
              <button
                type="submit"
                id="register-button"
                className="bg-blue-600 rounded-sm w-full py-2 text-xs transition transform active:scale-95"
                style={{ cursor: 'pointer' }}
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center w-full mt-2">
            <p>OR</p>
          </div>
          <div className="social-auth w-full flex justify-between mt-2 gap-3">
            <button type="button" className="border border-gray-300 text-xs w-1/2 py-2">
              <img src={facebookIcon} className="inline-block" alt="" /> Sign In with facebook
            </button>
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}
