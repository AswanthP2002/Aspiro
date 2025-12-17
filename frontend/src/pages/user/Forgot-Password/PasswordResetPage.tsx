import { FormControl, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {FaArrowLeft} from 'react-icons/fa'
import {GoLock} from 'react-icons/go'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../../../services/userServices'
import Swal from 'sweetalert2'

export default function PasswordResetPage(){

    //access token from the url
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')

    type FormInput = {
        password: string
        confirmPassword: string
    }

    const {control, watch, handleSubmit, formState:{errors}} = useForm<FormInput>()

    const typedPassword = watch('password')

    async function resetPasswordOnSubmit(data: FormInput){
        const {password} = data
        
        try {
            const result = await resetPassword(token as string, password)
        if(result?.success){
            navigate('/password-reset/success')
        }else{
            Swal.fire({
                icon:'error',
                title:'Error',
                text:result?.message,
                showConfirmButton:true,
                confirmButtonText:'Ok',
                allowOutsideClick:false,
                allowEscapeKey:false,
                showCancelButton:false
            }).then(() => {
                navigate('/login')
            })
        }
        } catch (error: unknown) {
            Swal.fire({
                icon:'error',
                title:'Error',
                text:'Something went wrong',
                showConfirmButton:true,
                confirmButtonText:'Ok',
                allowEscapeKey:false,
                allowOutsideClick:false,
                showCancelButton:false
            }).then(() => navigate('/login'))
        }
    }

    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-indigo-100 flex justify-center items-center">
            <div className='bg-white shadow-lg rounded-md border border-gray-200 !p-5 md:!p-10 w-md'>
                <div className="w-full">
                    <button className='text-gray-500 flex items-center gap-2'>
                        <FaArrowLeft />
                        Back
                    </button>
                </div>
                <div className="w-full flex justify-center !py-3">
                    <div className='bg-blue-200 rounded-full w-15 h-15 flex justify-center items-center'>
                        <GoLock color='blue' size={30} />
                    </div>
                </div>
                <div>
                    <p className="text-center text-gray-700">Reset password</p>
                    <p className='text-center !my-5 text-sm text-black font-light'>Enter your new password and confirm it</p>
                </div>
                <form onSubmit={handleSubmit(resetPasswordOnSubmit)}>
                    <FormControl fullWidth>
                        <label htmlFor="" className='!text-black font-medium text-sm !mb-1'>New Password</label>
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required:{value:true, message:'Enter new password'},
                                pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message:'Password must contain one special character, uppercase, lowercase, digit'}
                            }}
                            render={({field}) => (
                                <div className="flex gap-2 !px-2 !py-2 bg-gray-100 rounded-md items-center">
                                    <GoLock color='gray' />
                                    <input type="password"
                                        {...field}
                                        placeholder='Enter new password'
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.password?.message || 'Pasword must be atleast 8 characters long'}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth className='!mt-5'>
                        <label htmlFor="" className='!text-black font-medium text-sm !mb-1'>Confirm new password</label>
                        <Controller
                            name='confirmPassword'
                            control={control}
                            rules={{
                                validate: (value) => {
                                    return value === typedPassword ? true : "Password doesn't match";
                                },
                                required: { value: true, message: 'Confirm your password' },
                            }}
                            render={({field}) => (
                                <div className="flex gap-2 !px-2 !py-2 bg-gray-100 rounded-md items-center">
                                    <GoLock color='gray' />
                                    <input type="password"
                                        {...field}
                                        placeholder='Confirm new password'
                                    />
                                </div>
                            )}
                        />
                        <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
                    </FormControl>
                    <div className="action !mt-5">
                        <button type='submit' className='bg-black text-white text-sm font-medium w-full !py-2 rounded-md'>Reset password</button>
                    </div>
                </form>
                
    
            </div>
        </div>
    )
}