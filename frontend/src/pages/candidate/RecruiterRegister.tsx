import React, { useState, useRef, useEffect } from 'react';
import { Notify } from 'notiflix';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormHelperText,Modal} from '@mui/material';
import { addCompany, createRecruiterService, getCompaniesList } from '../../services/recruiterServices';
import { FaCircleCheck } from 'react-icons/fa6';
import { BiBuildings, BiCheckCircle} from 'react-icons/bi';
import { LuUser } from 'react-icons/lu';
import { FaUpload} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CgClose } from 'react-icons/cg';
import { Company } from '../../types/entityTypes';
import { toast } from 'react-toastify';

interface RootState {
    userAuth: {
        user: {
            _id: string,
            name: string,
            email: string,
            headline: string
        }
    }
}

export default function RecruiterRegisterPage() {

    type FetchCompaniesListResponsePayload = {
        success: boolean
        message: string
        result: Company[]
    }

    type RecruiterFormInputs = {
        employerType: "freelance" | "corporate"
        fullName: string;
        professionalTitle: string;
        email: string
        phone: string
        yearOfExperience: number
        linkedin: string
        companyId?: string
        companyName?: string
    }

    const [verificationDoc, setVerificationDoc] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const logedUser = useSelector((state: RootState) => {
        return state.userAuth.user
    })

    const [isCompanyAddModalOpen, setIsCompanyAddModalOpen] = useState(false)

    const openCompanyAddModal = () => setIsCompanyAddModalOpen(true)
    const closeCompanyAddModal = () => setIsCompanyAddModalOpen(false)

    const { control, watch, setValue, reset, handleSubmit, formState: { errors } } = useForm<RecruiterFormInputs>({
        defaultValues:{
           employerType: 'freelance',
           email: logedUser.email,
           phone: "",
           professionalTitle: logedUser.headline,
           fullName: logedUser.name,
           linkedin: "",
           yearOfExperience:0,
           companyName: "",
           companyId: ""
        }
    })
    
    const selectRecruiterType = (recruiterType: 'freelance' | 'corporate') => {
        reset({
            employerType: recruiterType
        })
    }

    const selectedRecruiterType = watch('employerType')

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVerificationDoc(file);
        }
    };

    const handleApplicationSubmit = async (data: RecruiterFormInputs) => {
        if (!verificationDoc) {
            Notify.failure('Please upload identity verification document');
            return;
        }

        setLoading(true);
        try {
            console.log('-->>> checking professional title before submiting -- ', data.professionalTitle)
            const formData = new FormData()
            formData.append("recruiterType", data.employerType)
            formData.append("fullName", data.fullName)
            formData.append("professionalTitle", data.professionalTitle)
            formData.append("email", data.email)
            formData.append("phone", data.phone)
            formData.append("yearOfExperience", data.yearOfExperience.toString())
            formData.append("linkedinUrl", data.linkedin)
            if(data.companyId){
                formData.append("companyId", data.companyId)
            }
            formData.append("document", verificationDoc)
            console.log('-- checking fordata converted -->>')
            for(const [key, value] of formData.entries()){
                console.log(`${key}: ${value}`)
            }
            const result = await createRecruiterService(formData)

               Swal.fire({
                    icon:'success',
                    title:'Submitted',
                    text:'Application for enabling recruiter profile submitted',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowEscapeKey:false,
                    allowOutsideClick:false,
                    timer:2000
                }).then(() => navigate('/profile/recruiter/overview'))
        } catch (error: unknown) {
           toast.error(error instanceof Error ? error.message : 'Something went wrong')
            
        } finally {
            setLoading(false)
        }
    };
      

    const [searchResultList, setSearchResultList] = useState<Company[]>([])
    const [isSearching, setIsSearching] = useState(false)
    
    const typedCompanyName = watch('companyName')

    useEffect(() => {
        if(!typedCompanyName || typedCompanyName.length <= 2){
            setSearchResultList([])
            return
        }
        const debouncedFunction = setTimeout(async () => {
            
                setIsSearching(true)

                try {
                    console.log('fetching for :', typedCompanyName)
                    const result: FetchCompaniesListResponsePayload = await getCompaniesList(typedCompanyName)
                    if(result && result.success){
                        setSearchResultList(result.result)
                    }else{
                        setSearchResultList([])
                    }
                } catch (error: unknown) {
                    console.log('error occured while fetching company list', error)
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                } finally {
                    setIsSearching(false)
                }
        }, 500)
        

        return () => clearTimeout(debouncedFunction)
    }, [typedCompanyName])

    const selectCompanyFromList = (company: Company) => {
        setValue('companyName', company.name)
        setValue('companyId', company._id)

        setSearchResultList([])
    }

    return (
        <>

        <div className='w-full p-10 lg:px-50'>
            <p className='font-semibold text-xl text-center'>Join as a recruiter</p>
            <p className='text-xs text-center'>Connect top talent with exceptional opportunities. Start your journey with Aspiro's professional network.</p>
            <div className="mt-10 rounded-md bg-white p-5 border border-gray-300 shadow md:p-10">
                <form onSubmit={handleSubmit(handleApplicationSubmit)}>

                    <p className='text-xs'>I am joining as <span className="red-500">*</span></p>
                    <div className="grid grid-cols-2 gap-5 mt-2">
                    <div onClick={() => selectRecruiterType('freelance')} className={`cursor-pointer border ${selectedRecruiterType === 'freelance' ? 'border-2 border-blue-300' : 'border-gray-300'} rounded-md flex flex-col items-center py-10`}>
                        <LuUser color='gray' size={20} />
                        <p className='mt-2 text-sm font-medium'>Freelance Recruiter</p>
                        <p className='text-xs text-gray-700 mt-1'>Independant / self employed</p>
                    </div>
                    <div onClick={() => selectRecruiterType('corporate')} className={`cursor-pointer border ${selectedRecruiterType === 'corporate' ? 'border-2 border-blue-300' : 'border-gray-300'} rounded-md flex flex-col items-center py-10`}>
                        <BiBuildings color='gray' size={20} />
                        <p className='mt-2 text-sm font-medium'>Corpoarate Recruiter</p>
                        <p className='text-xs text-gray-700 mt-1'>Recruiting for a company</p>
                    </div>
                    </div>
                    <div className="mt-5">
                        <p className='font-medium text-sm'>Professional Credentials</p>
                        <div className="mt-3">
                            <div className="flex gap-5">
                                <FormControl fullWidth error={Boolean(errors.fullName)}>
                                    <label htmlFor="" className='!text-xs'>Full Name <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='fullName'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' />
                                        )}
                                    />
                                    <FormHelperText>{errors.fullName?.message}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.professionalTitle)}>
                                    <label htmlFor="" className='!text-xs'>Professional Title <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='professionalTitle'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' />
                                        )}
                                    />
                                    <FormHelperText>{errors.professionalTitle?.message}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="flex gap-5 mt-3">
                                <FormControl fullWidth error={Boolean(errors.email)}>
                                    <label htmlFor="" className='!text-xs'>Email <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='email'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' />
                                        )}
                                    />
                                    <FormHelperText>{errors.email?.message}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.phone)}>
                                    <label htmlFor="" className='!text-xs'>Phone <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='phone'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' />
                                        )}
                                    />
                                    <FormHelperText>{errors.phone?.message}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="flex gap-5 mt-3">
                                <FormControl fullWidth error={Boolean(errors.yearOfExperience)}>
                                    <label htmlFor="" className='!text-xs'>Years of experience <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='yearOfExperience'
                                        rules={{
                                            required: {value: true, message: "This field is required"},
                                            min: {value: 0, message: 'Experience count must be valid'},
                                            pattern:{value: /^[0-9]$/, message: 'Enter a valid number'}
                                        }}
                                        render={({field}) => (
                                            <input {...field} type='number' className='border border-gray-200 rounded-md p-3 !text-xs' />
                                        )}
                                    />
                                    <FormHelperText>{errors.yearOfExperience?.message}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.linkedin)}>
                                    <label htmlFor="" className='!text-xs'>Linkedin URL <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='linkedin'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' />
                                        )}
                                    />
                                    <FormHelperText>{errors.linkedin?.message}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <p className="mt-5 font-medium text-sm">Identity Verification</p>
                        <p className="mt-3 text-xs">Goverment Issued ID <span className="text-red-500">*</span></p>
                        {verificationDoc
                            ? <div className='mt-2 border border-gray-200 rounded-md p-3 flex justify-between items-center bg-gray-50'>
                                <div className='flex items-center gap-2'>
                                    <FaCircleCheck className='text-green-500' />
                                    <p className='text-sm text-gray-700 truncate max-w-xs'>{verificationDoc.name}</p>
                                </div>
                                <button type='button' onClick={() => setVerificationDoc(null)} className='text-xs text-red-500 hover:underline'>Remove</button>
                              </div>
                            : <div 
                                onClick={() => fileInputRef.current?.click()} 
                                className='mt-2 cursor-pointer border border-dotted border-gray-300 rounded-md p-10 bg-gray-50 flex flex-col items-center hover:bg-gray-100 transition-colors'
                              >
                                <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange} accept="application/pdf" />
                                <FaUpload size={24} className='text-gray-500' />
                                <p className='mt-2 text-sm font-medium'>Click to upload</p>
                                <p className="text-xs text-gray-500 mt-1">Upload any goverment approved ID profe; Driving licence, Aadhar, Voter ID card</p>
                            </div>
                        }
                        {selectedRecruiterType === 'corporate' && (
    <div className="mt-5">
        <p className='font-medium text-sm'>Company Information</p>
        <FormControl className='!mt-5' fullWidth error={Boolean(errors.companyName)}>
            <label className='!text-xs text-gray-600'>Company Name <span className="text-red-500">*</span></label>
            <div className='w-full relative'>
                <Controller 
                    control={control}
                    name='companyName'
                    rules={{ required: selectedRecruiterType === 'corporate' ? "Company is required" : false }}
                    render={({ field }) => (
                        <input 
                            {...field} 
                            autoComplete="off"
                            className='border border-gray-200 w-full p-3 rounded-md !text-xs focus:ring-1 focus:ring-blue-400 outline-none' 
                            placeholder='Start typing company name...' 
                        />
                    )}
                />
                
                {/* Suggestions Dropdown */}
                { (searchResultList.length > 0 || isSearching) && (
                    <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg w-full mt-1 max-h-[250px] overflow-y-auto">
                        {isSearching ? (
                            <p className="p-3 text-xs text-gray-500">Searching...</p>
                        ) : (
                            searchResultList.map((company) => (
                                <div 
                                    key={company._id} 
                                    onClick={() => selectCompanyFromList(company)} 
                                    className='flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 border-b border-gray-50 last:border-none'
                                >
                                    <div className='bg-gray-100 w-9 h-9 rounded-md flex items-center justify-center shrink-0'>
                                        <BiBuildings size={18} className="text-gray-500" />
                                    </div>
                                    <div className='overflow-hidden'>
                                        <p className='text-sm font-semibold text-gray-800 truncate'>{company.name}</p>
                                        <p className='text-[10px] text-gray-500 truncate'>{company.location}</p>
                                    </div>
                                    <BiCheckCircle className="ml-auto text-transparent hover:text-blue-500" />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <FormHelperText>{errors.companyName?.message}</FormHelperText>
        </FormControl>
        
        <p className='text-xs text-gray-600 mt-3'>
            Can't find your company? 
            <span onClick={openCompanyAddModal} className='ml-1 font-semibold text-blue-600 cursor-pointer hover:underline'>
                Add it here
            </span>
        </p>
    </div>
)}
                    </div>
                    <Button disabled={loading} type='submit' variant='contained' fullWidth className='!mt-5'>{loading ? 'Submitting...' : 'Submit'} <BiCheckCircle className='ml-2' /></Button>
                </form>
            </div>
        </div>

        {isCompanyAddModalOpen && (
            <AddCompanyModal open={isCompanyAddModalOpen} onClose={closeCompanyAddModal} />
        )}
        </>
    );
}


function AddCompanyModal({open, onClose}: {open: boolean, onClose: () => void}){
    
    type AddcompanyResultPayload = {
        success: true,
        message: string,
        result: Company
    }

    type CompanyDetailsInputs = {
        name: string
        website?: string
        linkedin?: string
        slogan: string
        industry: string
        description: string
        location: string
    }
    const [loading, setLoading] = useState(false)

    const addNewCompany = async (data: CompanyDetailsInputs) => {
        console.log(data)
        const {name, linkedin, website, slogan, description, industry, location} = data
        setLoading(true)
        try {
            const result: AddcompanyResultPayload = await addCompany(
                name, linkedin as string, website as string, industry, slogan, description, location
            )
            if(result.success){
                Notify.success(result.message)
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setLoading(false)
            onClose()
        }
    }

    const {control, handleSubmit, formState: {errors}} = useForm<CompanyDetailsInputs>()
    return(
        <>
            <Modal open={open} onClose={onClose} className='flex items-center justify-center'>
                <div className='bg-white w-lg rounded-md'>
                    <div className="header p-5 border-b border-gray-200 flex justify-between">
                        <p>Add new company</p>
                        <button onClick={onClose}><CgClose /></button>
                    </div>
                    <div className="body p-5 max-h-[600px] overflow-y-auto">
                        <form onSubmit={handleSubmit(addNewCompany)}>
                            <FormControl fullWidth error={Boolean(errors.name)}>
                                <label htmlFor="" className='!text-xs !text-black'>Company name <span className="text-red-500">*</span></label>
                                <Controller
                                    control={control}
                                    name='name'
                                    rules={{
                                        required: {value: true, message: 'Company name can not be empty'},
                                        minLength: {value: 3, message: 'Minimum 3 charecters'},
                                        maxLength: {value: 100, message: 'Maximum 100 charecters'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' placeholder='Enter company name' />
                                    )}
                                />
                                <FormHelperText>{errors.name?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.website)}>
                                <label htmlFor="" className='!text-xs !text-black'>Website</label>
                                <Controller
                                    control={control}
                                    name='website'
                                    rules={{
                                        required: false,
                                        pattern:{value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: 'Enter a valid url'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' placeholder='https://www.company.com' />
                                    )}
                                />
                                <FormHelperText>{errors.website?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.linkedin)}>
                                <label htmlFor="" className='!text-xs !text-black'>Linkedin</label>
                                <Controller
                                    control={control}
                                    name='linkedin'
                                    rules={{
                                        required: false,
                                        pattern:{value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: 'Enter a valid url'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' placeholder='https://www.linkedin.com/company...' />
                                    )}
                                />
                                <FormHelperText>{errors.linkedin?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.slogan)}>
                                <label htmlFor="" className='!text-xs !text-black'>Slogan</label>
                                <Controller
                                    control={control}
                                    name='slogan'
                                    rules={{
                                        required: {value: true, message: 'Company slogan can not be empty'},
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' placeholder='Enter company slogan or tagline' />
                                    )}
                                />
                                <FormHelperText>{errors.slogan?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.location)}>
                                <label htmlFor="" className='!text-xs !text-black'>Location</label>
                                <Controller
                                    control={control}
                                    name='location'
                                    rules={{
                                        required: {value: true, message: 'Location can not be empty'},
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' placeholder='City, State, Country' />
                                    )}
                                />
                                <FormHelperText>{errors.location?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.industry)}>
                                <label htmlFor="" className='!text-xs !text-black'>Industry</label>
                                <Controller
                                    control={control}
                                    name='industry'
                                    rules={{
                                        required: {value: true, message: 'Industry can not be empty'},
                                        pattern:{value: /^[A-Z][A-Za-z\s\&\-\/]{2,49}$/, message: 'Enter a name'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border border-gray-200 rounded-md p-3 !text-xs' placeholder='Information Technology' />
                                    )}
                                />
                                <FormHelperText>{errors.industry?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.description)}>
                                <label htmlFor="" className='!text-xs !text-black'>Company Description</label>
                                <Controller
                                    control={control}
                                    name='description'
                                    rules={{
                                        required: {value: true, message: 'Description can not be empty'},
                                        minLength: {value: 30, message: 'Minimum 30 charecters'},
                                        maxLength: {value: 300, message: 'Maximum 300 charecters'}
                                    }}
                                    render={({field}) => (
                                        <textarea {...field} className='border border-gray-200 rounded-md p-3 !text-xs' rows={6} placeholder='Describe the company, its mission what make its unique...' />
                                    )}
                                />
                                <FormHelperText>{errors.description?.message}</FormHelperText>
                            </FormControl>
                            <p className="text-xs text-gray-500">After adding your company you will be able to find your company in the search box</p>
                            <div className="border border-gray-200 my-3"></div>
                            <div className="mt-5 flex justify-iitems-end gap-2">
                                    <button onClick={onClose} className='text-xs border border-gray-200 px-3 py-2 rounded-md'>Cancel</button>
                                    <Button type='submit' variant='contained' loading={loading}>Add Company</Button>
                            </div>  
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}
