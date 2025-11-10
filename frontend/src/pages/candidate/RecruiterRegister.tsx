import React, { useState } from 'react';
import { Notify } from 'notiflix';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import { industryTypes, companyType } from '../../assets/data/companyDetailsArrayData';
import { createRecruiterService } from '../../services/recruiterServices';


export default function RecruiterRegisterPage() {

    type Inputs = {
        employerType: string;
        industry: string;
        about: string; 
        city: string;
        state: string;
        country: string;
        pincode: string;
        organizationName: string;
        organizationType: string;
        teamStrength: string;
        aboutCompany: string;
        website: string;
        vision: string;
        organizationContactNumber: string;
        organizationEmail: string;
    };

    const { control, watch, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const [loading, setLoading] = useState(false);
    const employerType = watch('employerType');

    const handleApplicationSubmit = async (data: Inputs) => {
        setLoading(true);
        console.log(data)
        const {
            aboutCompany, employerType, industry, organizationName, organizationType, 
            teamStrength, vision, website, organizationContactNumber, organizationEmail
        } = data
        try {
            const result = await createRecruiterService(employerType, industry, organizationName, 
            organizationType, teamStrength, aboutCompany, website, vision, organizationContactNumber, 
            organizationEmail)

            setLoading(false)
            Notify.success('Recruiter profile enabled', {timeout: 2000})
        } catch (error: unknown) {
            Notify.failure('Something went wrong', {timeout: 2000})
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
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

                {/* {employerType === 'self' && (
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

                        <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.about)}>
                            <Controller
                                name="about"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'About section cannot be empty' },
                                    minLength: { value: 20, message: 'Please provide a more detailed summary' }
                                }}
                                render={({ field }) => (
                                    <Textarea {...field} sx={{ height: '100px' }} placeholder="Write a brief summary about your recruitment focus and experience..." />
                                )}
                            />
                            <FormHelperText>{errors?.about?.message}</FormHelperText>
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
                )} */}

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
        </div>
    );
}

declare module '@mui/joy/Textarea' {
    interface TextareaPropsOverrides {
      error?: boolean;
    }
  }
