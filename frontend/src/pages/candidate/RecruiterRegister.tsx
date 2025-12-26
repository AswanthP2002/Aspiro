import React, { useState } from 'react';
import { Notify } from 'notiflix';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import { industryTypes, companyType } from '../../assets/data/companyDetailsArrayData';
import { createRecruiterService } from '../../services/recruiterServices';
import { FaCircleCheck } from 'react-icons/fa6';
import { CiCircleCheck } from 'react-icons/ci';
import { BiBuilding, BiEnvelope } from 'react-icons/bi';
import { PiCallBell } from 'react-icons/pi';
import { MdPhone } from 'react-icons/md';
import { AiFillRedEnvelope } from 'react-icons/ai';
import { LuUsers } from 'react-icons/lu';
import { FaGlobe, FaLinkedin, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Marketing",
    "Sales",
    "Engineering",
    "Design",
    "Human Resources",
    "Education",
    "Legal"
]

export default function RecruiterRegisterPage() {

    type Inputs = {
        employerType: string;
        industry: string;
        summary: string; 
        country: string;
        organizationName: string;
        organizationType: string;
        teamStrength: string;
        linkedinUrl: string
        website: string;
        organizationContactNumber: string;
        organizationEmail: string;
        recruitingExperience: string;
        focusingIndustries: string[]
    };

    //userform isntance for basic details
    // const {control: basicInputFormControl, handleSubmit: basicInputFormHandleSubmit, formState:{errors: basicInputFormErrors}} = useForm<BasicInfoFormInputs>()
    const [section, setSection] = useState<'basic' | 'professional' | 'specialization'>('basic')
    const { control, watch, handleSubmit, formState: { errors }, reset, getValues } = useForm<Inputs>({
        defaultValues:{
            employerType: 'self',
            industry: '',
            summary: '',
            country: '',
            organizationName: '',
            organizationType: '',
            teamStrength: '',
            linkedinUrl: '',
            website: '',
            organizationContactNumber: '',
            organizationEmail: '',
            recruitingExperience: '',
            focusingIndustries: []
        }
    })

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const employerType = watch('employerType');
    const focusingIndustry = watch('focusingIndustries')

    const toggleFocusedIndustry = (industry: string) => {
        const existingValues = getValues()
        if(focusingIndustry.includes(industry)){
            reset({
                ...existingValues,
                focusingIndustries:focusingIndustry.filter((item: string) => item !== industry)
            })
        }else{
            reset({
                ...existingValues,
                focusingIndustries:[...focusingIndustry, industry]
            })
        }
    }

    const timeConsuming = () => {
        return new Promise((res) =>{
            setTimeout(() => res(true), 3000)
        })
    }

    const handleApplicationSubmit = async (data: Inputs) => {
        //Notify.success('Path is clear', {timeout:3000})
        console.log('Application data', data)
        setLoading(true);
        // console.log(data)
        const {
            summary, employerType, industry, organizationName, organizationType, 
            teamStrength, website, organizationContactNumber, organizationEmail,
            focusingIndustries, linkedinUrl, recruitingExperience
        } = data
        try {
            //await timeConsuming()
            const result = await createRecruiterService(
                employerType, industry, organizationName, organizationType, teamStrength,
                summary, website, organizationContactNumber, organizationEmail, focusingIndustries,
                recruitingExperience, linkedinUrl
            )

               Swal.fire({
                    icon:'success',
                    title:'Submitted',
                    text:result?.message || 'Application for enabling recruiter profile submitted',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowEscapeKey:false,
                    allowOutsideClick:false,
                    timer:2000
                }).then(() => navigate('/profile/recruiter/overview'))
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 2000})
            
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
        <div className="w-full px-5 md:px-20 py-10 bg-gray-100 min-h-screen">
            <div>
                <p className='text-2xl'>Become a Recruiter</p>
                <p className='mt-3 text-xs text-gray-700 leading-relaxed'>Join our network of recruiters to find the best talent. Fill out the form below to get started
                Your application will be reviewed by our team.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5 w-full">
                    <div className="flex items-center gap-2">
                        <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-full text-xs'>1</div>
                        <p className="text-xs">Submit Your application</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-full text-xs'>1</div>
                        <p className="text-xs">Get Reviewd</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-full text-xs'>1</div>
                        <p className="text-xs">Enables recruiter profile after successful revision</p>
                    </div>
                </div>
                {/* <div className='flex justify-between items-center gap-1 md:gap-10 mt-10'>
                    <div className='flex items-center gap-2'>
                        {
                            false
                             ? <>
                                <div className='bg-green-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                    <CiCircleCheck color='white' size={20} />
                                </div>
                               </>
                            : <>
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center w-10 h-10 text-white">
                                    <p className='text-xs'>1</p>
                                </div>
                              </>
                        }
                        <p className='text-xs'>Basic Info</p>
                    </div>
                    <div className='bg-gray-200 flex-1 h-[3px]'></div>
                    <div className='flex items-center gap-2'>
                         {
                            false
                             ? <>
                                <div className='bg-green-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                    <CiCircleCheck color='white' size={20} />
                                </div>
                               </>
                            : <>
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center w-10 h-10 text-white">
                                    <p className='text-xs'>2</p>
                                </div>
                              </>
                        }
                        <p className='text-xs'>Content</p>
                    </div>
                    <div className='bg-gray-200 w-full h-[3px]'></div>
                    <div className='flex items-center gap-2'>
                        {
                            false
                             ? <>
                                <div className='bg-green-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                    <CiCircleCheck color='white' size={20} />
                                </div>
                               </>
                            : <>
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center w-10 h-10 text-white">
                                    <p className='text-xs'>3</p>
                                </div>
                              </>
                        }
                        <p className='text-xs'>Content</p>
                    </div>
                </div> */}
                <div className="mt-10 border border-gray-200 rounded-md p-5 md:p-10 shadow bg-white">
                    {
                        section === 'basic' && (
                            <form onSubmit={handleSubmit(handleApplicationSubmit)}>
                                <FormControl fullWidth error={Boolean(errors.employerType)}>
                                    <label htmlFor="" className='!text-xs mb-1'>I am <span className='text-red-500'>*</span></label>
                                    <Controller
                                        name="employerType"
                                        control={control}
                                        render={({field}) => (
                                            <select
                                                {...field}
                                                className='border outline-none text-xs border-gray-200 rounded-md px-2 py-2'
                                            >
                                                <option value="self">An independent recruiter / self-employed</option>
                                                <option value="company">Recruiting for a company</option>
                                            </select>
                                        )}
                                    />
                                </FormControl>
                                {
                                    employerType === 'company' && (
                                        <>
                                        <div className="flex gap-5 mt-5">
                                            <FormControl fullWidth error={Boolean(errors.organizationName)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>Organization Name <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    name='organizationName'
                                                    rules={{
                                                        required:{value:true, message:'Business Name can not be empty'},
                                                        pattern:{value:/^[A-Za-z0-9&.,' -]{2,100}$/, message:'Enter a valid name'}
                                                    }}
                                                    control={control}
                                                    render={({field}) => (
                                                        <div className='border border-gray-200 rounded-md p-2 flex items-center gap-2'>
                                                            <BiBuilding />
                                                            <input type="text" className='text-xs' placeholder='' {...field} />
                                                        </div>
                                                    )}
                                                />
                                                <FormHelperText>{errors.organizationName?.message}</FormHelperText>
                                            </FormControl>
                                            <FormControl fullWidth error={Boolean(errors.organizationType)}>
                                                <label htmlFor="" className="!text-xs !mb-1">Organization Type</label>
                                                <Controller 
                                                    control={control}
                                                    name='organizationType'
                                                    rules={{
                                                        required:{value:true, message:'Please select organization type'}
                                                    }}
                                                    render={({field}) => (
                                                        <select
                                                            className='text-xs outline-none border border-gray-200 rounded-md p-2 w-full'
                                                            {...field}
                                                            
                                                        >
                                                            <option value="">--Select Company Type--</option>
                                                            {
                                                                companyType.map((type: string, index: number) => (
                                                                    <option key={index} value={type}>{type}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    )}
                                                />
                                                <FormHelperText>{errors.organizationType?.message}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <FormControl fullWidth className='!mt-5' error={Boolean(errors.industry)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>Industry <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    name='industry'
                                                    control={control}
                                                    rules={{
                                                        required:{value:true, message:'Please select your business industry'}
                                                    }}
                                                    render={({field}) => (
                                                        <select
                                                            className='text-xs outline-none border border-gray-200 rounded-md p-2 w-full'
                                                            {...field}
                                                            
                                                        >
                                                            <option value="">--Select Industry--</option>
                                                            {
                                                                industryTypes.map((industry: string, index: number) => (
                                                                    <option key={index} value={industry}>{industry}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    )}
                                                />
                                                <FormHelperText>{errors.industry?.message}</FormHelperText>
                                            </FormControl>
                                            <FormControl fullWidth className='!mt-5' error={Boolean(errors.summary)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>About company <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    control={control}
                                                    name='summary'
                                                    rules={{
                                                        required:{value:true, message:'Please enter summary about your company focus'}
                                                    }}
                                                    render={({field}) => (
                                                        <textarea {...field} className='border border-gray-200 outline-none rounded-md' rows={4}>

                                                        </textarea>
                                                    )}
                                                />
                                                <FormHelperText>{errors.summary?.message || 'Minimum 100 charecters'}</FormHelperText>
                                            </FormControl>
                                            <div className="flex gap-5 mt-5">
                                            <FormControl fullWidth error={Boolean(errors.organizationContactNumber)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>Organization Phone <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    name='organizationContactNumber'
                                                    control={control}
                                                    // rules={{
                                                    //     required:{value:true, message:'Enter company cotact number'},
                                                    //     // min:{value:10, message:'Minimum 10 charecters'},
                                                    //     // max:{value:10, message:'Maximum 10 charecters'},
                                                    //     pattern:{value:/^[6-9]\d{9}$/, message:'Enter a valid 10-digit mobile number'}
                                                    // }}
                                                    render={({field}) => (
                                                        <div className='border border-gray-200 rounded-md p-2 flex items-center gap-2'>
                                                            <MdPhone />
                                                            <input type="text" className='text-xs' placeholder='' {...field} />
                                                        </div>
                                                    )}
                                                />
                                                <FormHelperText>{errors.organizationContactNumber?.message}</FormHelperText>
                                            </FormControl>
                                            <FormControl fullWidth error={Boolean(errors.organizationEmail)}>
                                                <label htmlFor="" className="!text-xs !mb-1">Organization Email <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    control={control}
                                                    name='organizationEmail'
                                                    rules={{
                                                        required:{value:true, message:'Enter company email'},
                                                        pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'Enter a valid email'}
                                                    }}
                                                    render={({field}) => (
                                                        <div className='border border-gray-200 rounded-md p-2 flex items-center gap-2'>
                                                            <BiEnvelope />
                                                            <input type="text" className='text-xs' placeholder='' {...field} />
                                                        </div>
                                                    )}
                                                />
                                                <FormHelperText>{errors.organizationEmail?.message}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="flex gap-5 mt-5">
                                            <FormControl fullWidth error={Boolean(errors.teamStrength)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>Team Strength <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    name='teamStrength'
                                                    control={control}
                                                    rules={{
                                                        required:{value:true, message:'Enter your team strength not need to be accurate'}
                                                    }}
                                                    render={({field}) => (
                                                        <div className='border border-gray-200 rounded-md p-2 flex items-center gap-2'>
                                                            <LuUsers />
                                                            <input type="text" className='!text-xs' placeholder='eg: 2 - 7' {...field} />
                                                        </div>
                                                    )}
                                                />
                                                <FormHelperText>{errors.teamStrength?.message}</FormHelperText>
                                            </FormControl>
                                            <FormControl fullWidth error={Boolean(errors.recruitingExperience)}>
                                                <label htmlFor="" className="!text-xs !mb-1">Recruiting Experience in years</label>
                                                <Controller 
                                                    control={control}
                                                    name='recruitingExperience'
                                                    rules={{
                                                        required:{value:true, message:'Select Year of recruiting experience'}
                                                    }}
                                                    render={({field}) => (
                                                        <select
                                                            className='text-xs outline-none border border-gray-200 rounded-md p-2 w-full'
                                                            {...field}
                                                            
                                                        >
                                                            <option value="">--Recruiting Experience--</option>
                                                            <option value='0 - 1 Years'>0 - 1 Years</option>
                                                            <option value='1 - 3 Years'>1 - 3 Years</option>
                                                            <option value='3 - 5 Years'>3 - 5 Years</option>
                                                            <option value='5+ Years'>5+ Years</option>

                                                        </select>
                                                    )}
                                                />
                                                <FormHelperText>{errors.recruitingExperience?.message}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="flex gap-5 mt-5">
                                            <FormControl fullWidth error={Boolean(errors.website)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>Company Website</label>
                                                <Controller 
                                                    name='website'
                                                    control={control}
                                                    rules={{
                                                        pattern:{value:/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/, message:'Enter a valid website URL'}
                                                    }}
                                                    render={({field}) => (
                                                        <div className='border border-gray-200 rounded-md p-2 flex items-center gap-2'>
                                                            <FaGlobe />
                                                            <input type="text" className='!text-xs' placeholder='www.company.com' {...field} />
                                                        </div>
                                                    )}
                                                />
                                                <FormHelperText>{errors.website?.message}</FormHelperText>
                                            </FormControl>

                                            <FormControl fullWidth error={Boolean(errors.linkedinUrl)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>Linkedin Url</label>
                                                <Controller 
                                                    name='linkedinUrl'
                                                    control={control}
                                                    rules={{
                                                        pattern:{value:/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/, message:'Plese enter a valid url'}
                                                    }}
                                                    render={({field}) => (
                                                        <div className='border border-gray-200 rounded-md p-2 flex items-center gap-2'>
                                                            <FaLinkedin />
                                                            <input type="text" className='!text-xs w-full' placeholder='https://www.linkedin.com' {...field} />
                                                        </div>
                                                    )}
                                                />
                                                <FormHelperText>{errors.linkedinUrl?.message}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        </>
                                        
                                    )
                                }
                                {
                                    employerType === 'self' && (
                                        <div>
                                            <FormControl fullWidth className='!mt-5' error={Boolean(errors.summary)}>
                                                <label htmlFor="" className='!text-xs !mb-1'>About Recruiting summary <span className='text-red-500'>*</span></label>
                                                <Controller 
                                                    control={control}
                                                    name='summary'
                                                    rules={{
                                                        required:{value:true, message:'Enter summury about your hiring focus'},
                                                        min:{value:100, message:'Minimum 100 charecters'}
                                                    }}
                                                    render={({field}) => (
                                                        <textarea {...field} className='border border-gray-200 outline-none rounded-md' rows={4}>

                                                        </textarea>
                                                    )}
                                                />
                                                <FormHelperText>{errors.summary?.message || 'Minimum 100 charecters'}</FormHelperText>
                                            </FormControl>

                                            <FormControl fullWidth className='!mt-5' error={Boolean(errors.recruitingExperience)}>
                                                <label htmlFor="" className="!text-xs !mb-1">Recruiting Experience in years</label>
                                                <Controller 
                                                    control={control}
                                                    name='recruitingExperience'
                                                    rules={{
                                                        required:{value:true, message:'Please select your recruiting experience'}
                                                    }}
                                                    render={({field}) => (
                                                        <select
                                                            className='text-xs outline-none border border-gray-200 rounded-md p-2 w-full'
                                                            {...field}
                                                            
                                                        >
                                                            <option value="">--Recruiting Experience--</option>
                                                            <option value='0 - 1 Years'>0 - 1 Years</option>
                                                            <option value='1 - 3 Years'>1 - 3 Years</option>
                                                            <option value='3 - 5 Years'>3 - 5 Years</option>
                                                            <option value='5+ Years'>5+ Years</option>

                                                        </select>
                                                    )}
                                                />
                                                <FormHelperText>{errors.recruitingExperience?.message}</FormHelperText>
                                            </FormControl>
                                        </div>
                                    )
                                }
                                <div className="mt-5">
                                            <FormControl error={Boolean(errors.focusingIndustries)}>
                                                <label htmlFor="" className='!text-xs'>Focusing Industris <span className="text-red-500">*</span></label>
                                                <p className="text-xs text-gray-500 mt-1">Select one or more industries that you are focusing for hirings (Atleast 1 industry required)</p>
                                                <Controller
                                                    name='focusingIndustries'
                                                    control={control}
                                                    rules={{
                                                        required:{value:true, message:'Select atleast 1 industry that you are focusing to recruite'}
                                                    }}
                                                    render={({field}) => (
                                                        <input className='hidden' {...field} />
                                                    )}

                                                />

                                                <div className='mt-5 grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5'>
                                                    {
                                                        industries.map((industry: string, index: number) => (
                                                            <div onClick={() => toggleFocusedIndustry(industry)} className={`cursor-pointer text-xs ${focusingIndustry.includes(industry) ? 'text-blue-500' : 'text-gray-500'} border ${focusingIndustry.includes(industry) ? 'border-blue-500' : 'border-gray-300'} rounded-md p-2 text-center`} key={index}>{industry}</div>
                                                        ))
                                                    }
                                                </div>
                                                <FormHelperText>{errors.focusingIndustries?.message}</FormHelperText>
                                            </FormControl>
                                            <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-md">
                                                <p className='text-sm text-blue-800'>Application Review Process</p>
                                                <p className='text-xs text-blue-500 mt-3 leading-relaxed'>
                                                    Once you submit your application, our team will review your profile within 2-3 business days. 
                                                    You'll receive an email notification with the status of your application. If approved, 
                                                    you'll gain access to our recruiter dashboard and can start posting opportunities immediately.
                                                </p>
                                            </div>
                                            
                                        </div>
                                <div className="w-full flex justify-end mt-5">
                                    {/* <button type='submit' className='text-xs bg-gradient-to-br from-blue-500 to-indigo-700 text-white px-3 py-2 rounded-md'>Submit Application</button> */}
                                    <Button type='submit' variant='contained' loading={loading}>Submit Application</Button>
                                </div>

                            </form>
                        )
                    }
                </div>
            </div>
        </div>
        {/* <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Become a Recruiter</h1>
            <p className="text-gray-600 mb-8">
                Join our network of recruiters to find the best talent. Fill out the form below to get started.
                Your application will be reviewed by our team.
            </p>
            <form onSubmit={handleSubmit(handleApplicationSubmit)} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FormControl fullWidth error={Boolean(errors.employerType)}>
                    <InputLabel id="employer-type-label">I am...</InputLabel>
                    <Controller
                        name="employerType"
                        control={control}
                        rules={{ required: { value: true, message: 'Please select an employer type' } }}
                        render={({ field }) => (
                            <Select labelId="employer-type-label" label="I am..." {...field}>
                                <MenuItem value="self">An independent recruiter / self-employed</MenuItem>
                                <MenuItem value="company">Recruiting for a company</MenuItem>
                            </Select>
                        )}
                    />
                    <FormHelperText>{errors.employerType?.message}</FormHelperText>
                </FormControl>

               {employerType === 'self' && (
                    <div className="w-full mt-5">
                        <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.industry)}>
                            <InputLabel id="industry-label">Primary Industry</InputLabel>
                            <Controller
                                name="industry"
                                control={control}
                                rules={{ required: { value: true, message: 'Please select an industry' } }}
                                render={({ field }) => (
                                    <Select labelId="industry-label" label="Primary Industry" {...field}>
                                        {industryTypes.map((industry: string, index: number) => (
                                            <MenuItem key={index} value={industry}>{industry}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.industry?.message}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.summary)}>
                            <Controller
                                name="summary"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'About section cannot be empty' },
                                    minLength: { value: 20, message: 'Please provide a more detailed summary' }
                                }}
                                render={({ field }) => (
                                    <Textarea {...field} sx={{ height: '100px' }} placeholder="Write a brief summary about your recruitment focus and experience..." />
                                )}
                            />
                            <FormHelperText>{errors?.summary?.message}</FormHelperText>
                        </FormControl>

                         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                             <FormControl fullWidth>
                                 <Controller
                                    name="city"
                                    control={control}
                                    rules={{
                                        required: { value: true, message: 'Please enter city name' },
                                        pattern: { value: /^[a-zA-Z\s\-']{2,50}$/, message: 'Enter valid data' }
                                    }}
                                    render={({ field }) => (
                                        <TextField error={Boolean(errors.city)} helperText={errors.city?.message} {...field} variant="outlined" label="City" />
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Controller
                                    name="state"
                                    control={control}
                                    rules={{
                                        required: { value: true, message: 'Please enter state name' },
                                        pattern: { value: /^[a-zA-Z\s\-']{2,50}$/, message: 'Enter valid data' }
                                    }}
                                    render={({ field }) => (
                                        <TextField error={Boolean(errors.state)} helperText={errors.state?.message} {...field} variant="outlined" label="State" />
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Controller
                                    name="country"
                                    control={control}
                                    rules={{ required: { value: true, message: 'Country cannot be empty' }, pattern: { value: /^[a-zA-Z\s\-']{2,50}$/, message: 'Enter valid data' } }}
                                    render={({ field }) => <TextField error={Boolean(errors.country)} helperText={errors.country?.message} {...field} variant="outlined" label="Country" />}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Controller name="pincode" rules={{ required: { value: true, message: 'Pincode cannot be empty' }, pattern: { value: /^[1-9]\d{5}$/, message: 'Enter a valid pincode' } }} control={control} render={({ field }) => <TextField error={Boolean(errors.pincode)} helperText={errors.pincode?.message} {...field} variant="outlined" label="Pincode" />} />
                            </FormControl>
                        </div>
                    </div>
                )}

                 {employerType === 'company' && (
                    <div className="w-full mt-5">
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <Controller
                                name="organizationName"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'Company name cannot be empty' },
                                    pattern: { value: /^[A-Za-z0-9&.,' -]{2,100}$/, message: 'Enter a valid name' }
                                }}
                                render={({ field }) => (
                                    <TextField error={Boolean(errors.organizationName)} helperText={errors.organizationName?.message} {...field} variant="outlined" label="Organization Name" />
                                )}
                            />
                        </FormControl>

                         <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.organizationType)}>
                             <InputLabel id="organization-type-label">Organization Type</InputLabel>
                             <Controller
                                name="organizationType"
                                control={control}
                                rules={{ required: { value: true, message: 'Select Organization Type' } }}
                                render={({ field }) => (
                                    <Select labelId="organization-type-label" label="Organization Type" {...field}>
                                        {companyType.map((type: string, index: number) => (
                                            <MenuItem key={index} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.organizationType?.message}</FormHelperText>
                        </FormControl>

                         <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.industry)}>
                             <InputLabel id="industry-label">Industry</InputLabel>
                             <Controller
                                name="industry"
                                control={control}
                                rules={{ required: { value: true, message: 'Please select industry' } }}
                                render={({ field }) => (
                                    <Select labelId="industry-label" label="Industry" {...field}>
                                        {industryTypes.map((industry: string, index: number) => (
                                            <MenuItem key={index} value={industry}>{industry}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.industry?.message}</FormHelperText>
                        </FormControl>

                         <FormControl fullWidth sx={{ marginTop: '20px' }}>
                             <Controller
                                name="website"
                                control={control}
                                rules={{
                                    required: { value: false, message: 'Website URL is required' },
                                    pattern: { value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/, message: 'Please enter a valid website URL' }
                                }}
                                render={({ field }) => (
                                    <TextField error={Boolean(errors.website)} helperText={errors.website?.message} {...field} variant="outlined" label="Company Website" placeholder="https://yourcompany.com" />
                                )}
                            />
                        </FormControl>

                         <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.aboutCompany)}>
                             <Controller
                                name="aboutCompany"
                                control={control}
                                rules={{
                                    required: { value: true, message: "Please provide a short intro about your company" },
                                    minLength: { value: 50, message: "Please provide more details about the company (min 50 characters)." }
                                }}
                                render={({ field }) => (
                                    <Textarea {...field} sx={{ height: '100px' }} placeholder="About your company..." />
                                )}
                            />
                            <FormHelperText>{errors.aboutCompany?.message}</FormHelperText>
                        </FormControl>

                         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                              <FormControl fullWidth>
                                 <Controller
                                    name="organizationContactNumber"
                                    control={control}
                                    rules={{
                                        required: { value: true, message: 'Contact number is required' },
                                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }
                                    }}
                                    render={({ field }) => <TextField error={Boolean(errors.organizationContactNumber)} helperText={errors.organizationContactNumber?.message} {...field} variant="outlined" label="Organization Contact Number" />}
                                />
                            </FormControl>
                             <FormControl fullWidth>
                                <Controller
                                    name="organizationEmail"
                                    control={control}
                                    rules={{
                                        required: { value: true, message: 'Email is required' },
                                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Enter a valid email address' }
                                    }}
                                    render={({ field }) => <TextField error={Boolean(errors.organizationEmail)} helperText={errors.organizationEmail?.message} {...field} variant="outlined" label="Organization Email" />}
                                />
                            </FormControl>
                        </div>

                         <FormControl fullWidth sx={{ marginTop: '20px' }}>
                             <Controller name="teamStrength" control={control} render={({ field }) => <TextField variant="outlined" label="Team Strength (e.g., 10-50)" {...field} />} />
                         </FormControl>

                         <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <Controller name="vision" control={control} render={({ field }) => <Textarea {...field} sx={{ height: '100px' }} placeholder="Company Vision..." />} />
                         </FormControl>

                     </div>
                )}

                {employerType && (
                    <div className="mt-8">
                        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors">
                            {loading ? 'Submitting...' : 'Enable Recruiter Profile'}
                        </button>
                    </div>
                )}
            </form>
        </div> */}
        </>
    );
}

