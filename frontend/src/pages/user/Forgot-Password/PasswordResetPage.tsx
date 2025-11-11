import { FormControl, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {HiOutlineEnvelope} from 'react-icons/hi2'
import {FaArrowLeft} from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import {GoLock} from 'react-icons/go'

export default function PasswordResetPage(){

    type FormInput = {
        password: string
        confirmPassword: string
    }

    const {control, handleSubmit, formState:{errors}, reset} = useForm<FormInput>()

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
                <form>
                    <FormControl fullWidth>
                        <label htmlFor="" className='!text-black font-medium text-sm !mb-1'>New Password</label>
                        <Controller
                            name='password'
                            control={control}
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
                        <FormHelperText>Password must be at least 8 charecters long</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth className='!mt-5'>
                        <label htmlFor="" className='!text-black font-medium text-sm !mb-1'>Confirm new password</label>
                        <Controller
                            name='confirmPassword'
                            control={control}
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
                    </FormControl>
                </form>
                <div className="action !mt-5">
                    <button className='bg-black text-white text-sm font-medium w-full !py-2 rounded-md'>Reset password</button>
                </div>
    
            </div>
        </div>
    )
}