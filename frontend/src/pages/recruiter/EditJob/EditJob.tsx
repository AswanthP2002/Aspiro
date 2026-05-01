import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { editJob, getPostedJobDetails, postJob, recruiterFetchJobLevelLists, recruiterFetchJobTypeLists, recruiterFetchWorkModeLists } from "../../../services/recruiterServices"
import dayjs, { Dayjs } from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Textarea } from "@mui/joy"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { DateField } from "@mui/x-date-pickers/DateField"
import { Notify } from "notiflix"
import { toast } from "react-toastify"
import { JobLevelData, JobTypesData, WorkModeData } from "../../../types/entityTypes"

interface JobDetails {
    jobTitle: string,
    description: string,
    requirements: string,
    responsibilities: string,
    duration: string,
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary' | '',
    workMode: 'On-site' | 'Remote' | 'Hybrid' | '',
    location: string,
    minSalary: number | '',
    maxSalary: number | '',
    salaryCurrency: string,
    salaryPeriod: 'annually' | 'monthly' | 'weekly' | 'hourly' | '',
    vacancies: number | '',
    qualification: string,
    experienceInYears: number | '',
    jobLevel: 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Lead' | 'Manager' | '',
    requiredSkills: string[],
    optionalSkills: string[],
    expiresAt: Dayjs | null;
}

export default function EditJobForm(){

    const location = useLocation()
    const jobData = location.state?.jobData || {}

    const [requiredSkills, setRequiredSkills] = useState<string[]>([])
    const requiredSkillRef = useRef<HTMLInputElement | null>(null)
    const [jobLevelData, setJobLevelData] = useState<JobLevelData[]>([])
    const [jobTypeData, setJobTypeData] = useState<JobTypesData[]>([])
    const [workModeData, setWorkModeData] = useState<WorkModeData[]>([])
    const [optionalSkills, setOptionalSkills] = useState<string[]>([])
    const optionalSkillRef = useRef<HTMLInputElement | null>(null)
    const navigator = useNavigate()
    const [loading, setloading] = useState(false)

    const {control, watch, reset, handleSubmit, formState:{errors}, setValue, getValues} = useForm<JobDetails>({
        defaultValues: {
            jobTitle: "",
            description: "",
            jobType: "",
            workMode: "",
            location: "",
            salaryCurrency: "",
            salaryPeriod: "",
            jobLevel: "",
            qualification: "",
            requiredSkills: [],
            optionalSkills: [],
            expiresAt: null,
            duration: ""
        }
    })

    useEffect(() => {
        async function fetchEditableJobData(){
            try {
                const jobDetailsFetchResult = await getPostedJobDetails(jobData._id)
                console.log('-- checking editable data from backend --', jobDetailsFetchResult)
                const [
                    jobLevelDataResult,
                    workModeDataResult,
                    jobTypeDataResult
                ] = await Promise.all([recruiterFetchJobLevelLists(), recruiterFetchWorkModeLists(), recruiterFetchJobTypeLists()])
                
                if(jobDetailsFetchResult.success){
                    reset({
                jobTitle: jobDetailsFetchResult.result.jobTitle,
                description: jobDetailsFetchResult.result.description,
                requirements: jobDetailsFetchResult.result.requirements,
                responsibilities: jobDetailsFetchResult.result.responsibilities,
                duration: jobDetailsFetchResult.result.duration,
                jobType: jobDetailsFetchResult.result.jobType,
                workMode: jobDetailsFetchResult.result.workMode,
                location: jobDetailsFetchResult.result.location,
                minSalary: jobDetailsFetchResult.result.minSalary,
                maxSalary: jobDetailsFetchResult.result.maxSalary,
                salaryCurrency: jobDetailsFetchResult.result.salaryCurrency,
                salaryPeriod: jobDetailsFetchResult.result.salaryPeriod,
                vacancies: jobDetailsFetchResult.result.vacancies,
                qualification: jobDetailsFetchResult.result.qualification,
                experienceInYears: jobDetailsFetchResult.result.experienceInYears,
                jobLevel: jobDetailsFetchResult.result.jobLevel,
                requiredSkills: jobDetailsFetchResult.result.requiredSkills,
                optionalSkills: jobDetailsFetchResult.result.optionalSkills,
                expiresAt: dayjs(jobDetailsFetchResult.result.expiresAt)
            })

            setJobTypeData(jobTypeDataResult.result)
            setJobLevelData(jobLevelDataResult.result)
            setWorkModeData(workModeDataResult.result)
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        if(jobData){
            fetchEditableJobData()
        }else{
            toast.warn('Can not edit job now')
            navigator(-1)
        }
        // if(jobData){
        //     const jobDetailsResult = await
        //     console.log('this is job data for editing', jobData)
        //     reset({
        //         jobTitle: jobData.jobTitle,
        //         description: jobData.description,
        //         requirements: jobData.requirements,
        //         responsibilities: jobData.responsibilities,
        //         duration: jobData.duration,
        //         jobType: jobData.jobType,
        //         workMode: jobData.workMode,
        //         location: jobData.location,
        //         minSalary: jobData.minSalary,
        //         maxSalary: jobData.maxSalary,
        //         salaryCurrency: jobData.salaryCurrency,
        //         salaryPeriod: jobData.salaryPeriod,
        //         vacancies: jobData.vacancies,
        //         qualification: jobData.qualification,
        //         experienceInYears: jobData.experienceInYears,
        //         jobLevel: jobData.jobLevel,
        //         requiredSkills: jobData.requiredSkills,
        //         optionalSkills: jobData.optionalSkills,
        //         expiresAt: dayjs(jobData.expiresAt)
        //     })
        // }
    }, [jobData, reset])

    const enteredJobType = watch('jobType')
    const enteredWorkMode = watch('workMode')

    const addRequiredSkill = (event : any) => {
        event.preventDefault()
        const skill = requiredSkillRef.current?.value
        if(!skill) return
        setValue('requiredSkills', [...getValues('requiredSkills'), skill]);
        if(requiredSkillRef.current) requiredSkillRef.current.value = ""
    }
    
    const removeRequiredSkill = (event : any, skill : string) => {
        event.preventDefault()
        const updatedSkills = getValues('requiredSkills').filter((s: string) => skill.toLocaleLowerCase() !== s.toLocaleLowerCase());
        setValue('requiredSkills', updatedSkills);
    }

    const addOptionalSkill = (event : any) => {
        event.preventDefault()
        const skill = optionalSkillRef.current?.value
        if(!skill) return
        setValue('optionalSkills', [...getValues('optionalSkills'), skill]);
        if(optionalSkillRef.current) optionalSkillRef.current.value = ""
        
    }

    const removeOptionalSkill = (event : any, skill : string) => {
        event.preventDefault()
        const updatedSkills = getValues('optionalSkills').filter((s: string) => skill.toLowerCase() !== s.toLocaleLowerCase());
        setValue('optionalSkills', updatedSkills);
    }

    async function editJobOnSubmit(data: JobDetails){
        const editConfirmResult = await Swal.fire({
            icon: 'question',
            title: 'Do you want to update the changes?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continute',
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        if(editConfirmResult.isDismissed || !editConfirmResult.isConfirmed){
            return
        }
        setloading(true)
        console.log("Form Data on Submit:", data);
        const payload = {
            ...data,
            minSalary: Number(data.minSalary),
            maxSalary: Number(data.maxSalary),
            vacancies: Number(data.vacancies),
            experienceInYears: Number(data.experienceInYears),
            expiresAt: data.expiresAt ? data.expiresAt.toDate() : new Date()
        };
        console.log('testing data', payload)
        
        try {
            const result = await editJob({_id:jobData._id, recruiterId:jobData.recruiterId, ...payload})
            
            if(result?.success){
                setloading(false)
                Swal.fire({
                    icon:'success',
                    title:'Job Edited succesfully',
                    text:result?.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                    timer:3500
                }).then(() => navigator('/profile/recruiter/my-jobs'))
            }else{
                setloading(false)
                toast.error(result?.message)
            }

        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
            setloading(false)
        }
    
    }

    const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#fff',
    '& fieldset': { borderColor: '#e2e8f0' }, // slate-200
    '&:hover fieldset': { borderColor: '#cbd5e1' }, // slate-300
    '&.Mui-focused fieldset': { borderColor: '#2563eb' }, // blue-600
  },
  '& .MuiInputLabel-root': { color: '#64748b' }, // slate-500
};

const textareaStyles = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '1rem',
  '&:hover': {
    borderColor: '#cbd5e1',
  },
  '&:focus': {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 1px #2563eb', // Simulates the MUI focus look
  },
};

const selectStyles = {
  // Target the root of the OutlinedInput
  borderRadius: '10px',
  backgroundColor: '#fff',
  
  // Target the border (notchedOutline)
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2e8f0', // slate-200
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#cbd5e1', // slate-300
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#2563eb', // blue-600
    borderWidth: '2px',
  },
  
  // Icon and Label
  '& .MuiSvgIcon-root': { color: '#64748b' },
};

    return(
        <>
        <div className="bg-gray-50 py-20 px-5">
            <form onSubmit={handleSubmit(editJobOnSubmit)} className="border border-slate-200 bg-white shadow-xl max-w-4xl !mx-auto rounded-md !py-5 !px-5">
                <p className="text-start font-semibold text-gray-900 text-2xl">Edit job post</p>
                <p className="text-sm mt-1 text-gray-600 font-medium text-start">Currently editing <span className="text-blue-500 font-semibold">{jobData.jobTitle}</span>.</p>

                <div className="form-group rounded-md mt-5 !p-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-500 font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                            <p>1</p>
                        </div>
                        <p className="font-semibold text-gray-700 uppercase">Core Job Details</p>
                    </div>
                    <FormControl fullWidth sx={{marginTop:'15px'}}>
                        <Controller
                            name="jobTitle"
                            control={control}
                            rules={{
                                required: { value: true, message: 'Job Title can not be empty' },
                                pattern: { value: /^[A-Za-z0-9\s\-.,()]{3,100}$/, message: 'Enter a valid job title (3-100 characters)' }
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label="Job title"
                                    error={Boolean(errors.jobTitle)}
                                    helperText={errors?.jobTitle?.message}
                                    sx={inputStyles}
                                />
                            )}
                        />
                    </FormControl>

                    <div className="w-full grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-10 justify-between">
                        <FormControl error={Boolean(errors.jobType)} fullWidth sx={{marginTop:'15px'}}>
                        <InputLabel id="job-type-label">Job Type</InputLabel>
                        <Controller
                            name="jobType"
                            control={control}
                            rules={{required:{value:true, message:'Job type can not be empty'}}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    label="Job Type"
                                    labelId="job-type-label"
                                    variant="outlined"
                                    error={Boolean(errors.jobType)}
                                    sx={selectStyles}
                                >   {jobTypeData.map((jobType: JobTypesData) => (
                                    <MenuItem key={jobType._id} value={jobType.name}>{jobType.name}</MenuItem>
                                ))}
                                    {/* <MenuItem value="Full-time">Full-time</MenuItem>
                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                    <MenuItem value="Contract">Contract</MenuItem>
                                    <MenuItem value="Internship">Internship</MenuItem>
                                    <MenuItem value="Temporary">Temporary</MenuItem> */}
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors?.jobType?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{marginTop:'15px'}}>
                        <Controller
                            name="duration"
                            control={control}
                            rules={{
                                required:{value:enteredJobType === 'Contract' || enteredJobType === 'Internship' ? true : false, message:'Please specify the job duration'},
                                pattern:{value:/^[A-Za-z0-9\s-]{3,30}$/, message:'Enter a valid duration (e.g., "6 months", "1 year")'}
                            }}
                            render={({field}) => (
                                <TextField
                                  {...field}
                                  disabled={enteredJobType !== 'Contract' && enteredJobType !== 'Internship' ? true : false}
                                  variant="outlined"
                                  label="Duration (Internships & Contracts only)"
                                  error={Boolean(errors.duration)}
                                  helperText={errors?.duration?.message}
                                  sx={inputStyles}
                                />
                            )}
                        />
                    </FormControl>
                    </div>
                </div>

                <div className="form-group rounded-md mt-10 !p-5">
                <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-500 font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                            <p>2</p>
                        </div>
                        <p className="font-semibold text-gray-700 uppercase">Location & Logistics</p>
                    </div>                    
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-10 justify-between mt-5 w-full">
                        
                        <FormControl fullWidth>
                            <Controller
                                name="vacancies"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Vacancies can not be empty'},                                    
                                    pattern:{value:/^[1-9]/, message:'Enter a valid number'}
                                }}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        InputLabelProps={{shrink: !!field.value}}
                                        variant="outlined"
                                        label="Vacancies"
                                        type="number"
                                        error={Boolean(errors.vacancies)}
                                        helperText={errors?.vacancies?.message}
                                        sx={inputStyles}
                                     />
                                )}
                            />
                        </FormControl>

                        <FormControl error={Boolean(errors.workMode)} fullWidth>
                        <InputLabel id="work-mode-label">Work Mode</InputLabel>
                        <Controller
                            name="workMode"
                            control={control}
                            rules={{required:{value:true, message:'Please select work mode'}}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    label="Work Mode"
                                    labelId="word-mode-label"
                                    variant="outlined"
                                    error={Boolean(errors.workMode)}
                                    sx={selectStyles}
                                >   
                                    {workModeData.map((workMode: WorkModeData) => (
                                        <MenuItem key={workMode._id} value={workMode.name}>{workMode.name}</MenuItem>
                                    ))}
                                    {/* <MenuItem value="On-site">On-site</MenuItem>
                                    <MenuItem value="Remote">Remote</MenuItem>
                                    <MenuItem value="Hybrid">Hybrid</MenuItem> */}
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors?.workMode?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <Controller
                            name="location"
                            control={control}
                            rules={{
                                required:{value:enteredWorkMode === 'Remote' ? false : true, message:'Please provide working location'},
                                pattern:{value:/^[A-Za-z\s,.-]{2,100}$/, message:'Enter a valid location'}
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label="Location"
                                    disabled={enteredWorkMode === 'Remote' ? true : false}
                                    error={Boolean(errors.location)}
                                    helperText={errors?.location?.message}
                                    sx={inputStyles}
                                />
                            )}
                        />
                    </FormControl>
                    </div>
                </div>

                <div className="form-group rounded-md mt-10 !p-5">
                <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-500 font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                            <p>3</p>
                        </div>
                        <p className="font-semibold text-gray-700 uppercase">Compensation</p>
                    </div>                   
                <div className="grid gird-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 mt-5 w-full">
                        <FormControl fullWidth>
                            <Controller
                                name="minSalary"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Please provide minimum eliible salary'},
                                    pattern:{value:/^\d{1,8}$/, message:'Please enter a valid salary'}
                                }}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        InputLabelProps={{shrink: !!field.value}}
                                        variant="outlined"
                                        label="Minimum Salary"
                                        type="number"
                                        error={Boolean(errors.minSalary)}
                                        helperText={errors?.minSalary?.message}
                                        sx={inputStyles}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <Controller
                                name="maxSalary"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Please profide maximum eligibel salary'},
                                    pattern:{value:/^\d{1,8}$/, message:'Please enter a valid salary'}
                                }}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        InputLabelProps={{shrink: !!field.value}}
                                        variant="outlined"
                                        label="Maximum Salary"
                                        type="number"
                                        error={Boolean(errors.maxSalary)}
                                        helperText={errors?.maxSalary?.message}
                                        sx={inputStyles}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth error={Boolean(errors.salaryCurrency)}>
                            <InputLabel id="salary-currency-label">Salary Currency</InputLabel>
                            <Controller 
                                name="salaryCurrency"
                                control={control}
                                rules={{ required: { value: true, message: 'Currency is required' } }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        label="Salary Currency"
                                        labelId="salary-currency-label"
                                        variant="outlined"
                                        error={Boolean(errors.salaryCurrency)}
                                        sx={selectStyles}
                                    >
                                        <MenuItem value="INR">INR</MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors?.salaryCurrency?.message}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth error={Boolean(errors.salaryPeriod)}>
                            <InputLabel id="salary-period-label">Salary Period</InputLabel>
                            <Controller
                                name="salaryPeriod"
                                control={control}
                                rules={{ required: { value: true, message: 'Salary period is required' } }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        label="Salary Period"
                                        labelId="salary-period-label"
                                        variant="outlined"
                                        error={Boolean(errors.salaryPeriod)}
                                        sx={selectStyles}
                                    >
                                        <MenuItem value="annually">Annually</MenuItem>
                                        <MenuItem value="monthly">Monthly</MenuItem>
                                        <MenuItem value="weekly">Weekly</MenuItem>
                                        <MenuItem value="hourly">Hourly</MenuItem>
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors?.salaryPeriod?.message}</FormHelperText>
                        </FormControl>
                    </div>
                </div>

                <div className="form-group rounded-md mt-10 !p-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-500 font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                            <p>4</p>
                        </div>
                        <p className="font-semibold text-gray-700 uppercase">Candidate Requirements</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-10 justify-between mt-5 w-full">
                        <FormControl fullWidth error={Boolean(errors.jobLevel)}>
                            <InputLabel id="job-level-id">Job Level</InputLabel>
                            <Controller 
                                name="jobLevel"
                                control={control}
                                rules={{ required: { value: true, message: 'Job level is required' } }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        label="Job Level"
                                        labelId="job-level-id"
                                        variant="outlined"
                                        error={Boolean(errors.jobLevel)}
                                        sx={selectStyles}
                                    >
                                        {jobLevelData.map((jobLevel: JobLevelData) => (
                                            <MenuItem key={jobLevel._id} value={jobLevel.name}>{jobLevel.name}</MenuItem>
                                        ))}
                                        {/* <MenuItem value="Entry-level">Entry-level</MenuItem>
                                        <MenuItem value="Mid-level">Mid-level</MenuItem>
                                        <MenuItem value="Senior-level">Senior-level</MenuItem>
                                        <MenuItem value="Lead">Lead</MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem> */}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors?.jobLevel?.message}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth>
                            <Controller
                                name="qualification"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Enter Qualifications, if nothing enter any'},
                                    pattern: { value: /^(?!\d+$)(?!.*\d$)[A-Za-z.,()\-]+(?:\s[A-Za-z.,()\-]+)*$/, message: 'Enter valid qualifications' }
                                }}
                                render={({field}) => (
                                    <TextField 
                                        {...field}
                                        variant="outlined"
                                        label="Qualification"
                                        error={Boolean(errors.qualification)}
                                        helperText={errors?.qualification?.message}
                                        sx={inputStyles}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <Controller 
                                name="experienceInYears"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Enter expereince in years'},
                                    pattern:{value:/^[0-9]+$/, message:'Please provide a valid experience'}
                                }}
                                render={({field}) => (
                                    <TextField 
                                        {...field}
                                        InputLabelProps={{shrink: !!field.value}}
                                        variant="outlined"
                                        label="Experience (in years)"
                                        type="number"
                                        error={Boolean(errors.experienceInYears)}
                                        helperText={errors?.experienceInYears?.message}
                                        sx={inputStyles}
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                </div>

                <div className="form-group rounded-md mt-10 !p-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-500 font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                            <p>5</p>
                        </div>
                        <p className="font-semibold text-gray-700 uppercase">Job Description & Details</p>
                    </div>
                    <FormControl fullWidth sx={{marginTop:'15px'}} error={Boolean(errors.description)}>
                        <label htmlFor="" className="text-xs uppercase mb-2">description</label>
                        <Controller 
                            name="description"
                            control={control}
                            rules={{
                                required:{value:true, message:'Job Description can nob be empty'},
                                minLength: { value: 20, message: 'Description must be at least 20 characters' }
                            }}
                            render={({field}) => (
                                <Textarea
                                 minRows={5}
                                  {...field}
                                  placeholder="About the job"
                                  error={Boolean(errors.description)}
                                  
                                />
                            )}
                        />
                        <FormHelperText>{errors?.description?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{marginTop:'15px'}} error={Boolean(errors.requirements)}>
                        <label htmlFor="" className="text-xs uppercase mb-2">Requirements</label>
                        <Controller 
                            name="requirements"
                            control={control}
                            rules={{
                                required:{value:true, message:'Requirements can nob be empty'},
                                minLength: { value: 20, message: 'Requirements must be at least 20 characters' }
                            }}
                            render={({field}) => (
                                <Textarea
                                 minRows={5}
                                  {...field}
                                  placeholder="Requirements"
                                  error={Boolean(errors.requirements)}
                                  
                                />
                            )}
                        />
                        <FormHelperText>{errors?.requirements?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{marginTop:'15px'}} error={Boolean(errors.responsibilities)}>
                        <label htmlFor="" className="text-xs uppercase mb-2">description</label>
                        <Controller 
                            name="responsibilities"
                            control={control}
                            rules={{
                                required:{value:true, message:'Responsibilities can nob be empty'},
                                minLength: { value: 20, message: 'Responsibilities must be at least 20 characters' }
                            }}
                            render={({field}) => (
                                <Textarea
                                 minRows={5}
                                  {...field}
                                  placeholder="Responsibilities"
                                  error={Boolean(errors.responsibilities)}
                                  
                                />
                            )}
                        />
                        <FormHelperText>{errors?.responsibilities?.message}</FormHelperText>
                    </FormControl>
                </div>

                <div className="form-group rounded-md mt-10 !p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
                        <div className="w-full">
                            <label htmlFor="">Required Skills</label>
                            <div className="flex mt-1 gap-2">
                            <input ref={requiredSkillRef} type="text" name="" placeholder="eg., React" className="w-full border h-[40px] p-2 rounded-md" id="" />
                            <button onClick={addRequiredSkill} type="button" className="text-xs bg-blue-500 text-white !px-5 !py-2 rounded-md cursor-pointer">Add</button>
                            </div>

                            <div className="skills !mt-2 flex flex-wrap gap-2">
                                {
                                    watch('requiredSkills').map((skill: string, index: number) => {
                                        return <span key={index} className="text-xs text-gray-500 bg-gray-200 !px-3 rounded-full !py-2">{skill} <i onClick={(e) => removeRequiredSkill(e, skill)} className="fa-solid fa-circle-xmark ms-1 cursor-pointer"></i></span>
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="">Optional Skills</label>
                            <div className="flex mt-1 gap-2">
                            <input ref={optionalSkillRef} type="text" name="" placeholder="eg., GraphQL" className="w-full border h-[40px] p-2 rounded-md" id="" />
                            <button onClick={addOptionalSkill} type="button" className="text-xs bg-blue-500 text-white !px-5 !py-2 rounded-md cursor-pointer">Add</button>
                            </div>

                            <div className="skills !mt-2 flex flex-wrap gap-2">
                                {
                                    watch('optionalSkills').map((skill: string, index: number) => {
                                        return <span key={index} className="text-xs text-gray-500 bg-gray-200 !px-3 rounded-full !py-2">{skill} <i onClick={(e) => removeOptionalSkill(e, skill)} className="fa-solid fa-circle-xmark ms-1 cursor-pointer"></i></span>
                                    })
                                }
                            </div>
                        </div>
                    </div>                    
                </div>
                
                <div className="form-group border border-gray-200 rounded-md mt-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between !p-5">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <FormControl error={Boolean(errors.expiresAt)}>
                                <Controller
                                name="expiresAt"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Expiry date is madatory'}
                                }}
                                render={({field}) => (
                                    <DateField
                                        label="Application Deadline"
                                        variant="outlined"
                                        {...field}
                                        onChange={(pickerValue) => field.onChange(pickerValue)}
                                        value={field.value}                                    />
                                )}
                            />
                            <FormHelperText>{errors.expiresAt?.message as string}</FormHelperText>
                            </FormControl>
                        </DemoContainer>
                    </LocalizationProvider>
                    <div className="flex gap-2">
                        <button className="text-sm font-semibold text-gray-700 border border-slate-400 transition-color duration-300 hover:bg-slate-100 hover:shadow-xl px-5 py-3 rounded-lg" type="button" onClick={() => navigator(-1)}>Cancel</button>
                        <button className="border border-transparent bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm px-5 py-3 shadow-[0_0_30px_2px_rgba(0,0,230,0.2)] transition-color duration-300 rounded-lg" type="submit">{loading ? "Processing..." : "Edit Job"}</button>  </div>    
                </div>
                
            </form>
        </div>
        </>
    )
}