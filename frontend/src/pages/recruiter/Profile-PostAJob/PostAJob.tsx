import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { postJob } from "../../../services/recruiterServices"
import { Dayjs } from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { Autocomplete, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Textarea } from "@mui/joy"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { DateField } from "@mui/x-date-pickers/DateField"
import { Notify } from "notiflix"
import axiosInstance, { AxiosRequest } from "../../../services/util/AxiosInstance"

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

export default function PostAJobForm(){

    const navigator = useNavigate()
    const [loading, setloading] = useState(false)
    const [skillOptions, setSkillOptions] = useState<string[]>([])
    const [skillsLoading, setSkillsLoading] = useState(false)

    const {control, watch, handleSubmit, formState:{errors}, setValue, getValues} = useForm<JobDetails>({
        defaultValues: {
            jobTitle: "",
            description: "",
            requirements: "",
            responsibilities: "",
            duration: "",
            jobType: "",
            workMode: "On-site",
            location: "",
            minSalary: "",
            maxSalary: "",
            salaryCurrency: "INR",
            salaryPeriod: "annually",
            vacancies: "",
            qualification: "",
            experienceInYears: "",
            jobLevel: "Entry-level",
            requiredSkills: [],
            optionalSkills: [],
            expiresAt: null
        }
    })

    const enteredJobType = watch('jobType')
    const enteredWorkMode = watch('workMode')

    const fetchSkillSuggestions = async (query: string) => {
        if (!query) return;
        setSkillsLoading(true);
        try {
            // Assuming you have a route for recruiters to search skills. 
            // If not, you might need to create one or use a common route.
            const response = await axiosInstance.get('/admin/skills', {
                params: { search: query },
                sendAuthToken: true
            } as AxiosRequest);
            
            if (response.data?.success) {
                // Adjust based on your actual API response structure
                const skills = response.data.result.skills.map((s: any) => s.skills);
                setSkillOptions(skills);
            }
        } catch (error) {
            console.error("Failed to fetch skills", error);
        } finally {
            setSkillsLoading(false);
        }
    };

    // Debounce function for search
    const debounce = (func: Function, delay: number) => {
        let timer: any;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedFetchSkills = debounce(fetchSkillSuggestions, 500);

    async function submitJob(data: JobDetails){
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
            const result = await postJob(payload)
            
            if(result?.success){
                setloading(false)
                Swal.fire({
                    icon:'success',
                    title:'Job Created',
                    text:result?.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                    timer:2500
                }).then(() => navigator('/profile/recruiter/my-jobs'))
            }else{
                setloading(false)
                Notify.failure(result?.message, {timeout:2000})
            }

        } catch (error: unknown) {
            Notify.failure('Something went wrong', {timeout:2000})
            setloading(false)
        }
    
    }

    return(
        <>
        <div className="bg-white">
            <form onSubmit={handleSubmit(submitJob)} className="border border-gray-200 shadow-xl max-w-4xl !mx-auto !my-10 rounded-md !py-5 !px-5">
                <p className="text-center font-bold text-2xl">Create a New Job Posting</p>
                <p className="text-sm mt-3 text-gray-700 text-center">Fill out the details below to find your next great hirie.</p>

                <div className="form-group border border-gray-200 rounded-md mt-5 !p-5">
                    <p className="font-medium text-lg">Core Job Details</p>
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
                                
                                />
                            )}
                        />
                    </FormControl>

                    <div className="w-full flex gap-10 justify-between">
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
                                >
                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                    <MenuItem value="Contract">Contract</MenuItem>
                                    <MenuItem value="Internship">Internship</MenuItem>
                                    <MenuItem value="Temporary">Temporary</MenuItem>
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
                                />
                            )}
                        />
                    </FormControl>
                    </div>
                </div>

                <div className="form-group border border-gray-200 rounded-md mt-10 !p-5">
                    <p className="font-medium text-lg">Location & Logistics</p>
                    <div className="flex gap-10 justify-between mt-5 w-full">
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
                                        variant="outlined"
                                        label="Vacancies"
                                        type="number"
                                        error={Boolean(errors.vacancies)}
                                        helperText={errors?.vacancies?.message}
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
                                >
                                    <MenuItem value="On-site">On-site</MenuItem>
                                    <MenuItem value="Remote">Remote</MenuItem>
                                    <MenuItem value="Hybrid">Hybrid</MenuItem>
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
                                />
                            )}
                        />
                    </FormControl>
                    </div>
                </div>

                <div className="form-group border border-gray-200 rounded-md mt-10 !p-5">
                    <p className="font-medium text-lg">Compensation</p>
                    <div className="flex gap-10 justify-between mt-5 w-full">
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
                                        variant="outlined"
                                        label="Minimum Salary"
                                        type="number"
                                        error={Boolean(errors.minSalary)}
                                        helperText={errors?.minSalary?.message}
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
                                        variant="outlined"
                                        label="Maximum Salary"
                                        type="number"
                                        error={Boolean(errors.maxSalary)}
                                        helperText={errors?.maxSalary?.message}
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

                <div className="form-group border border-gray-200 rounded-md mt-10 !p-5">
                    <p className="font-medium text-lg">Candidate Requirements</p>
                    <div className="flex gap-10 justify-between mt-5 w-full">
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
                                    >
                                        <MenuItem value="Entry-level">Entry-level</MenuItem>
                                        <MenuItem value="Mid-level">Mid-level</MenuItem>
                                        <MenuItem value="Senior-level">Senior-level</MenuItem>
                                        <MenuItem value="Lead">Lead</MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem>
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
                                        variant="outlined"
                                        label="Experience (in years)"
                                        type="number"
                                        error={Boolean(errors.experienceInYears)}
                                        helperText={errors?.experienceInYears?.message}
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                </div>

                <div className="form-group border border-gray-200 rounded-md mt-10 !p-5">
                    <p className="font-medium text-lg">Job Descriptions</p>
                    <FormControl fullWidth sx={{marginTop:'15px'}} error={Boolean(errors.description)}>
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

                <div className="form-group border border-gray-200 rounded-md mt-10 !p-5">
                    <div className="flex gap-10 w-full">
                        <div className="w-full">
                            <Controller
                                name="requiredSkills"
                                control={control}
                                rules={{ required: "At least one skill is required" }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        options={skillOptions}
                                        loading={skillsLoading}
                                        value={value || []}
                                        onInputChange={(_, newInputValue) => debouncedFetchSkills(newInputValue)}
                                        onChange={(_, newValue) => onChange(newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Required Skills"
                                                variant="outlined"
                                                placeholder="Select or type skills"
                                                error={!!errors.requiredSkills}
                                                helperText={errors.requiredSkills?.message}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <>
                                                            {skillsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <Controller
                                name="optionalSkills"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        options={skillOptions}
                                        loading={skillsLoading}
                                        value={value || []}
                                        onInputChange={(_, newInputValue) => debouncedFetchSkills(newInputValue)}
                                        onChange={(_, newValue) => onChange(newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Optional Skills"
                                                variant="outlined"
                                                placeholder="Select or type skills"
                                            />
                                        )}
                                    />
                                )}
                            />
                        </div>
                    </div>                    
                </div>
                
                <div className="form-group border border-gray-200 rounded-md mt-10 flex items-center justify-between !p-5">
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

                    <Button type="submit" variant="contained" loading={loading}>Post Job</Button>      
                </div>
                
            </form>
        </div>
        </>
    )
}