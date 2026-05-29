import React, { useState, useRef, useEffect } from 'react';
import { Notify } from 'notiflix';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormHelperText,Modal} from '@mui/material';
import { addCompany, createRecruiterService } from '../../services/recruiterServices';
import { getCompaniesList } from '../../services/companyServices';
import { FaCircleCheck } from 'react-icons/fa6';
import { BiBuildings} from 'react-icons/bi';
import { LuBuilding2, LuCircleCheck, LuUser } from 'react-icons/lu';
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
    const companySearchInputRef = useRef<HTMLInputElement>(null)

    const logedUser = useSelector((state: RootState) => {
        return state.userAuth.user
    })

    const [isCompanyAddModalOpen, setIsCompanyAddModalOpen] = useState(false)

    const openCompanyAddModal = () => setIsCompanyAddModalOpen(true)
    const closeCompanyAddModal = () => setIsCompanyAddModalOpen(false)

    const { control, watch, setValue, reset, handleSubmit, formState: { errors } } = useForm<RecruiterFormInputs>({
        defaultValues:{
           employerType: 'corporate',
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
    
    const selectedcompanyName = watch('companyName')
    const selectedcompanyId = watch('companyId')

    const [searchResultList, setSearchResultList] = useState<Company[]>([])
    const [isSearching, setIsSearching] = useState(false)
    
    const typedCompanyName = watch('companyName')

    useEffect(() => {
        if(!typedCompanyName || typedCompanyName.length <= 2){
            setSearchResultList([])
            return
        }
        const debouncedFunction = setTimeout(async () => {
            
                // setIsSearching(true)

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
                } 
        }, 500)
        

        return () => clearTimeout(debouncedFunction)
    }, [typedCompanyName])

    const selectCompanyFromList = (company: Company) => {
        toast.success('Clicked')
        toast.info(`Company name ${company.name}`)
        toast.info(`Company id ${company._id}`)
        setValue('companyName', company.name)
        setValue('companyId', company._id)
        setIsSearching(false)

        setSearchResultList([])
    }

    const openCompanyLoadList = async () => {
        setIsSearching(true)
        setLoading(true)

        try {
            const result: FetchCompaniesListResponsePayload = await getCompaniesList('')
            if(result?.success){
                toast.success('Company loaded')
                setSearchResultList(result?.result)
            }else{
                setSearchResultList([])
            }
        } catch (error: unknown) {
            console.log('Error occured while loading company list', error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
            setSearchResultList([])
        } finally {
            setLoading(false)
        }
    }

    const closeCompanyLoadList = async (company: Company | null = null) => {
        if(!company){
            setIsSearching(false)
        }else{
            selectCompanyFromList(company)
        }
    }

    return (
        <>

        <div className='w-full p-10 lg:px-50 bg-gray-50'>
            <p className='font-bold text-2xl text-center track-wider'>Join as a recruiter</p>
            <p className='text-center text-sm mt-2 leading-relaxed text-gray-700'>Connect top talent with exceptional opportunities. Start your journey with Aspiro's professional network.</p>
            <div className="mt-10 rounded-lg bg-white p-5 border border-transparent shadow-xl md:p-10">
                <form onSubmit={handleSubmit(handleApplicationSubmit)}>

                    <p className='text-sm font-medium text-gray-500 uppercase'>I am joining as <span className="text-red-500">*</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div onClick={() => selectRecruiterType('freelance')} className={`cursor-pointer border ${selectedRecruiterType === 'freelance' ? 'ring-2 ring-blue-400 border-blue-300 bg-blue-50' : 'border-gray-300'} rounded-md px-5 py-10`}>
                        <div className={`${selectedRecruiterType === 'freelance' ? "bg-blue-500" : "bg-gray-100"} w-11 h-11 rounded-md flex items-center justify-center group hover:bg-blue-500 transition-color duration-300`}>
                            <LuUser className={`${selectedRecruiterType === 'freelance' ? "text-white" : "text-gray-500"} group-hover:text-white`} size={20} />
                        </div>
                        <p className='mt-2 text-sm font-bold'>Freelance Recruiter</p>
                        <p className='text-xs text-gray-700 mt-1'>Independant / self employed</p>
                    </div>
                    <div onClick={() => selectRecruiterType('corporate')} className={`cursor-pointer border ${selectedRecruiterType === 'corporate' ? 'ring-2 ring-blue-400 border-blue-300 bg-blue-50' : 'border-gray-300'} rounded-md px-5 py-10`}>
                        <div className={`w-11 h-11 rounded-md flex items-center justify-center ${selectedRecruiterType === 'corporate' ? "bg-blue-500" : "bg-gray-100"} hover:bg-blue-500 transition-color duration-300`}>
                            <BiBuildings className={`${selectedRecruiterType === 'corporate' ? "text-white" : "text-gray-500"} group-hover:text-white`} size={20} />
                        </div>
                        <p className='mt-2 text-sm font-bold'>Corpoarate Recruiter</p>
                        <p className='text-xs text-gray-700 mt-1'>Recruiting for a company</p>
                    </div>
                    </div>
                    <div className="mt-10">
                        <p className='font-semibold uppercase track-wider'>Professional Credentials</p>
                        <div className="mt-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormControl fullWidth error={Boolean(errors.fullName)}>
                                    <label htmlFor="" className='uppercase font-semibold !text-gray-400 '>Full Name <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='fullName'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border !border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:!border-blue-300 rounded-md p-3 !text-xs bg-gray-50' />
                                        )}
                                    />
                                    <FormHelperText>{errors.fullName?.message}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.professionalTitle)}>
                                    <label htmlFor="" className='uppercase font-semibold !text-gray-400'>Professional Title <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='professionalTitle'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border !border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:!border-blue-300 rounded-md p-3 !text-xs bg-gray-50' />
                                        )}
                                    />
                                    <FormHelperText>{errors.professionalTitle?.message}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                                <FormControl fullWidth error={Boolean(errors.email)}>
                                    <label htmlFor="" className='font-semibold uppercase !text-gray-400'>Email <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='email'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border !border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:!border-blue-300 rounded-md p-3 !text-xs bg-gray-50' />
                                        )}
                                    />
                                    <FormHelperText>{errors.email?.message}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.phone)}>
                                    <label htmlFor="" className='uppercase font-semibold !text-gray-400'>Phone <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='phone'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border !border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:!border-blue-300 rounded-md p-3 !text-xs bg-gray-50' />
                                        )}
                                    />
                                    <FormHelperText>{errors.phone?.message}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                                <FormControl fullWidth error={Boolean(errors.yearOfExperience)}>
                                    <label htmlFor="" className='uppercase font-semibold !text-gray-400'>Years of experience <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='yearOfExperience'
                                        rules={{
                                            required: {value: true, message: "This field is required"},
                                            min: {value: 0, message: 'Experience count must be valid'},
                                            pattern:{value: /^[0-9]$/, message: 'Enter a valid number'}
                                        }}
                                        render={({field}) => (
                                            <input {...field} type='number' className='border !border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:!border-blue-300 rounded-md p-3 !text-xs bg-gray-50' />
                                        )}
                                    />
                                    <FormHelperText>{errors.yearOfExperience?.message}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.linkedin)}>
                                    <label htmlFor="" className='uppercase font-semibold !text-gray-400'>Linkedin URL <span className="text-red-500">*</span></label>
                                    <Controller
                                        control={control}
                                        name='linkedin'
                                        rules={{
                                            required: {value: true, message: "This field is required"}
                                        }}
                                        render={({field}) => (
                                            <input {...field} className='border !border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:!border-blue-300 rounded-md p-3 !text-xs bg-gray-50' />
                                        )}
                                    />
                                    <FormHelperText>{errors.linkedin?.message}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <p className="mt-5 font-semibold uppercase track-wider">Identity Verification</p>
                        <p className="mt-3 text-sm font-medium uppercase text-gray-400 mt-5">Goverment Issued ID <span className="text-red-500">*</span></p>
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
                                className='mt-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 p-10 bg-gray-50 group hover:bg-white flex flex-col items-center hover:bg-gray-100 transition-colors'
                              >
                                <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange} accept="application/pdf" />
                                <div className='bg-white w-11 h-11 rounded-md flex items-center justify-center shadow-xl'>
                                    <FaUpload size={20} className='text-gray-500 group-hover:text-blue-500' />
                                </div>
                                <p className='mt-2 font-semibold'>Click to upload</p>
                                <p className="text-xs text-gray-500 leading-relaxed mt-1 text-center">Upload any goverment approved ID profe; Driving licence, Aadhar, Voter ID card</p>
                            </div>
                        }
                        {selectedRecruiterType === 'corporate' && (
    <div className="mt-5">
        <p className='font-semibold uppercase'>Company Information</p>
        <FormControl className='!mt-10' fullWidth error={Boolean(errors.companyName)}>
            <label className='uppercase font-semibold !text-gray-400'>Company Name <span className="text-red-500">*</span></label>
            <div className='w-full relative'>
                <Controller 
                    control={control}
                    name='companyName'
                    rules={{ required: selectedRecruiterType === 'corporate' ? "Company is required" : false }}
                    render={({ field }) => (
                        <input 
                            {...field}
                            ref={companySearchInputRef}
                            onFocus={openCompanyLoadList}
                            // onBlur={() => closeCompanyLoadList(null)}
                            autoComplete="off"
                            className='border border-gray-200 w-full p-3 rounded-md !text-xs focus:ring-1 focus:ring-blue-400 outline-none' 
                            placeholder='Start typing company name...' 
                        />
                    )}
                />
                
                {isSearching && (
                    <div className="absolute bg-white bottom-12 border border-slate-100 shadow-xl rounded-lg w-full">
                    {searchResultList.length > 0 && searchResultList.map((company) => (
                        <div key={company._id} onClick={() => closeCompanyLoadList(company)} className='flex cursor-pointer gap-2 group hover:bg-blue-100 transition-color p-2'>
                            <div className='bg-gray-100 w-10 h-10 rounded-md group-hover:bg-blue-500 transition-color duration-300 flex items-center justify-center'>
                                <LuBuilding2 className='text-gray-700 group-hover:text-white' />
                            </div>
                            <div>
                                <p className='font-semibold text-sm'>{company.name}</p>
                                <p className='text-xs text-gray-600'>{company.location}</p>
                            </div>
                        </div>
                    ))}
                    {searchResultList.length === 0 && (
                        <div className='p-5'>
                            <p className='text-center text-xs text-gray-600'>No companies found</p>
                        </div>
                    )}
                </div>
                )}
                {/* Suggestions Dropdown */}
                {/* { (searchResultList.length > 0 || isSearching) && (
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
                )} */}
            </div>
            <FormHelperText>{errors.companyName?.message}</FormHelperText>
        </FormControl>
        
        <p className='text-sm text-gray-600 mt-3'>
            Can't find your company? 
            <span onClick={openCompanyAddModal} className='ml-1 font-semibold text-blue-600 cursor-pointer hover:underline'>
                Add it here
            </span>
        </p>
    </div>
)}
                    </div>
                    <button type="submit" className='bg-gradient-to-br from-blue-400 to-indigo-500 w-full rounded-lg flex items-center justify-center gap-3 p-3 text-white font-semibold mt-5 shadow-xl hover:shadow-2xl'>
                        {loading
                            ? "Processing..."
                            : "Complete Registration"
                        }
                        <LuCircleCheck color='white' />
                    </button>
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
                        <p className='font-bold uppercase tracking-wide'>Add new company</p>
                        <button onClick={onClose}><CgClose /></button>
                    </div>
                    <div className="body p-5 max-h-[600px] overflow-y-auto">
                        <form onSubmit={handleSubmit(addNewCompany)}>
                            <FormControl fullWidth error={Boolean(errors.name)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Company name <span className="text-red-500">*</span></label>
                                <Controller
                                    control={control}
                                    name='name'
                                    rules={{
                                        required: {value: true, message: 'Company name can not be empty'},
                                        minLength: {value: 3, message: 'Minimum 3 charecters'},
                                        maxLength: {value: 100, message: 'Maximum 100 charecters'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' placeholder='Enter company name' />
                                    )}
                                />
                                <FormHelperText>{errors.name?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.website)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Website</label>
                                <Controller
                                    control={control}
                                    name='website'
                                    rules={{
                                        required: false,
                                        pattern:{value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: 'Enter a valid url'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' placeholder='https://www.company.com' />
                                    )}
                                />
                                <FormHelperText>{errors.website?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.linkedin)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Linkedin</label>
                                <Controller
                                    control={control}
                                    name='linkedin'
                                    rules={{
                                        required: false,
                                        pattern:{value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: 'Enter a valid url'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' placeholder='https://www.linkedin.com/company...' />
                                    )}
                                />
                                <FormHelperText>{errors.linkedin?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.slogan)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Slogan</label>
                                <Controller
                                    control={control}
                                    name='slogan'
                                    rules={{
                                        required: {value: true, message: 'Company slogan can not be empty'},
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' placeholder='Enter company slogan or tagline' />
                                    )}
                                />
                                <FormHelperText>{errors.slogan?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.location)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Location</label>
                                <Controller
                                    control={control}
                                    name='location'
                                    rules={{
                                        required: {value: true, message: 'Location can not be empty'},
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' placeholder='City, State, Country' />
                                    )}
                                />
                                <FormHelperText>{errors.location?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.industry)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Industry</label>
                                <Controller
                                    control={control}
                                    name='industry'
                                    rules={{
                                        required: {value: true, message: 'Industry can not be empty'},
                                        pattern:{value: /^[A-Z][A-Za-z\s\&\-\/]{2,49}$/, message: 'Enter a name'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' placeholder='Information Technology' />
                                    )}
                                />
                                <FormHelperText>{errors.industry?.message}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth className='!mt-3' error={Boolean(errors.description)}>
                                <label htmlFor="" className='uppercase font-semibold !text-xs !text-gray-400 !mb-1'>Company Description</label>
                                <Controller
                                    control={control}
                                    name='description'
                                    rules={{
                                        required: {value: true, message: 'Description can not be empty'},
                                        minLength: {value: 30, message: 'Minimum 30 charecters'},
                                        maxLength: {value: 300, message: 'Maximum 300 charecters'}
                                    }}
                                    render={({field}) => (
                                        <textarea {...field} className='border !border-slate-100 p-3 rounded-md bg-gray-50 placeholder:text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:!border-blue-300 focus:ring-2 focus:ring-blue-100' rows={6} placeholder='Describe the company, its mission what make its unique...' />
                                    )}
                                />
                                <FormHelperText>{errors.description?.message}</FormHelperText>
                            </FormControl>
                            <p className="text-xs text-gray-600 mt-3 leading-relaxed">After adding your company you will be able to find your company in the search box</p>
                            <div className="border border-gray-200 my-3"></div>
                            <div className="mt-5 flex justify-iitems-end gap-2">
                                    <button onClick={onClose} className='border border-slate-200 px-5 py-2 text-sm font-semibold rounded-lg text-gray-700 shadow-xl'>Cancel</button>
                                    {/* <Button type='submit' variant='contained' loading={loading}>Add Company</Button> */}
                                    <button type="submit" className='flex items-center text-sm font-semibold gap-2 px-5 py-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl hover:!shadow-2xl rounded-lg'>
                                        {loading
                                            ? "Processing..."
                                            : "Add Company"
                                        }
                                        <LuCircleCheck />
                                    </button>
                            </div>  
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}
