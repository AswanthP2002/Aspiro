import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { addCoverPhotoCloudinary, addLogoCloudinary, saveIntroDetails } from "../../../services/recruiterServices"
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Recruiter } from "../../../types/entityTypes"
import { Controller, useForm } from "react-hook-form"
import { industryTypes } from "../../../assets/data/companyDetailsArrayData"
import {Textarea} from '@mui/joy'
import { companyType } from "../../../assets/data/companyDetailsArrayData"

export default function IntroDetailsPageForm(){

    /*
    _id?: string;
      userId?: string;
      name: string;
      employerType?: string;
      organizationDetails?: {
        organizationName: string;
        organizationType: string;
        industry: string;
        logo?: {
          cloudinaryPublicId: string;
          cloudinarySecureUrl: string;
        };
        location?: {
          city: string;
          country: string;
          state: string;
          pinCode: string;
        };
        organizationContactNumber?: string;
        organizationEmail?: string;
        socialLinks?: SocialLinks[];
        teamStrength?: string;
        aboutCompany?: string;
        foundIn?: string;
        website?: string;
        vision?: string;
        benefit?: String;
      };
      location?: {
        city: string;
        country: string;
        state: string;
        pinCode: string;
      };
      socialLinks?: SocialLinks[];
      about?: string;
      createdAt?: Date;
      updatedAt?: Date;
      currentSubscription?: string;
    */

    type Inputs = {
        employerType : string
        industry : string
        summary : string
        city : string
        state : string
        country : string
        pincode : string
        organizationName : string
        organizationType : string
        teamStrength : string
        aboutCompany : string
        website : string
        vision : string
    }

    const {control, watch, handleSubmit, formState:{errors}} = useForm<Inputs>({
        defaultValues:{
            aboutCompany:"",
            city:"",
            country:"",
            employerType:"",
            industry:"",
            organizationName:"",
            organizationType:"",
            pincode:"",
            state:"",
            summary:"",
            teamStrength:"",
            vision:"",
            website:""
        }
    })
    
    const [step, setstep] = useState(1)
    // const [recruiter, setRecruiter] = useState<Recruiter>({
    //     employerType:""
    // })
    const [details, setdetails] = useState({
        logo:"",
        coverPhoto:"",
        companyName:"",
        about:"",
        benefits:"",
        companyType:"",
        industryType:"",
        teamStrength:"",
        yearOfEstablishment:"",
        website:"",
        vision:"",
        country:"",
        state:"",
        city:"",
        mobile:"",
        email:""
    })

    const [recruiter, setRecruiter] = useState<Recruiter>({
        name:"",
        about:"",
        employerType:"",
        location:{
            city:"",
            country:"",
            pinCode:"",
            state:""
        },
        organizationDetails:{
            industry:"",
            organizationName:"",
            organizationType:"",
            aboutCompany:"",
            benefit:"",
            foundIn:"",
            location:{
                city:"",
                country:"",
                pinCode:"",
                state:""
            },
            teamStrength:""
        }
    })

    const employerType = watch('employerType')

    async function saveDetails(){
        console.log('details after submit', watch())
        const {
            aboutCompany,
            city,
            country,
            employerType,
            industry,
            organizationName,
            organizationType,
            pincode,
            state,
            summary,
            teamStrength,
            vision,
            website
        } = watch()
        const updatedRecruiter = {
                ...recruiter,
                employerType:employerType,
                about:summary,
                organizationDetails:{
                    ...recruiter.organizationDetails,
                    aboutCompany:aboutCompany,
                    location:{
                        city:city,
                        country:country,
                        state:state,
                        pinCode:pincode
                    },
                    industry:industry,
                    teamStrength:teamStrength,
                    vision:vision,
                    website:website,
                    organizationName:organizationName,
                    organizationType:organizationType,
                }
            }
        // setRecruiter((prv : Recruiter) => {
        //     return {
        //         ...prv,
        //         employerType:employerType,
        //         about:summary,
        //         organizationDetails:{
        //             ...prv.organizationDetails,
        //             aboutCompany:aboutCompany,
        //             location:{
        //                 city:city,
        //                 country:country,
        //                 state:state,
        //                 pinCode:pincode
        //             },
        //             industry:industry,
        //             teamStrength:teamStrength,
        //             vision:vision,
        //             website:website,
        //             organizationName:organizationName,
        //             organizationType:organizationType,
        //         }
        //     }
        // })
        const result = await saveIntroDetails(updatedRecruiter)
        if(result.success){
                    Swal.fire({
                        icon:'success',
                        title:'Saved',
                        text:result.message,
                        showConfirmButton:true,
                        allowOutsideClick:false,
                        showCancelButton:false,
                        confirmButtonText:'Continue'
                    })
                    .then((result) => {
                        if(result.isConfirmed){
                            navigator('/recruiter/profile/overview')
                            return
                        }else{
                            navigator('/')
                        }
                    })
                }
    }

    const [nameError, setnamerror] = useState("")
    const [aboutError, setabouterror] = useState("")
    const [benefitsError, setbenefitserror] = useState("")
    const [establishmentyearError, setestablishmenterror] = useState("")
    const [websiteError, setwebsiteerror] = useState("")
    const [visionError, setvisionerror] = useState("")
    const [cityError, setcityerror] = useState("")
    const [stateError, setstaterror] = useState("")
    const [countryError, setcountryerror] = useState("")
    const [mobileError, setMobileError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [companyTypeError, setcompanytypeerror] = useState("")
    const [industryError, setindustryerror] = useState("")
    const [teamStrengthError, setteamstreangtherror] = useState("")

    const [logogpreview, setlogopreview] = useState("")
    const [logo, setlogo] = useState<File | null>(null)
    const [logourl, setlogourl] = useState("")

    const [coverphotopreview, setcoverphotoprevew] = useState("")
    const [coverPhoto, setcoverphoto] = useState<File | null>(null)
    const [coverphotourl, setcoverphotourl] = useState("")

    const logophotoinput = useRef<HTMLInputElement>(null)
    const coverphotoinput = useRef<HTMLInputElement>(null)

    const navigator = useNavigate()

    const unSelectImage = () => setlogopreview("")

    function handleLogoUploadClick(){
        if(logophotoinput.current){
            logophotoinput.current.click()
        }
    }

    function handleCoverPhotoUpload(){
        if(coverphotoinput.current){
            coverphotoinput.current.click()
        }
    }

    function handleLogoFileUpload(event : any){
        const file = event.target.files[0]
        if(file){
            setlogo(file)
            setlogopreview(URL.createObjectURL(file))
        }
    }

    function handleCoverPhotoFileUpload(event : any){
        const file = event.target.files[0]
        if(file){
            setcoverphoto(file)
            setcoverphotoprevew(URL.createObjectURL(file))
        }
    }

    function handleData(event : any){
        setdetails((prev : any) => {
            return {
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }

    const nextStep = async () => {
        let isValidated = false
        if(step === 1) isValidated = validateStepOne()
        if(step === 2) isValidated = validateStepTwo()
        if(step === 3) isValidated = validateStepThree()

        if(step === 3 && isValidated){
            
            try {
                if(logo){
                    const logoFormData = new FormData()
                    logoFormData.append('file', logo)
                    logoFormData.append('upload_preset', 'recruiter_profile_images')
                    logoFormData.append('folder', 'profile')

                    const logoResult = await addLogoCloudinary(logoFormData)
                    setlogourl(logoResult.secure_url)
                }

                if(coverPhoto){
                    const coverFormData = new FormData()
                    coverFormData.append('file', coverPhoto)
                    coverFormData.append('upload_preset', 'recruiter_profile_images')
                    coverFormData.append('folder', 'profile')


                    const coverPhotoResult = await addCoverPhotoCloudinary(coverFormData)
                    setcoverphotourl(coverPhotoResult.secure_url)
                }

                //save details in the database
                // const result = await saveIntroDetails(details, logourl, coverphotourl)

                // if(result.success){
                //     Swal.fire({
                //         icon:'success',
                //         title:'Saved',
                //         text:result.message,
                //         showConfirmButton:true,
                //         confirmButtonText:'Continue'
                //     })
                //     .then((result) => {
                //         if(result.isConfirmed){
                //             navigator('/recruiter/profile/overview')
                //             return
                //         }else{
                //             navigator('/recruiter')
                //         }
                //     })
                // }
            } catch (error : any) {
                console.log('Error occured while saving company/recruiter details', error.message)
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:'Internal server Error, please try again after some time',
                    showConfirmButton:true
                })
                .then((result) => {
                    if(result.isConfirmed) navigator('/recruiter')
                })
                return
            }
        }

        if(isValidated){
            setstep(prevstate => prevstate + 1)}
        }
        
    const previousStep = () => setstep(prevstate => prevstate - 1)

    const companyType = [
        "Startup",
        "SME(Small & Medium Scale Enterprises)",
        "MNC",
        "Government Organization",
        "Non Profit Organization",
        "Educational Institution",
        "Public Sector Unit",
        "Other"
    ]

    const industryTypes = [
        "Information Technology (IT) / Software",
        "Telecommunications",
        "Banking / Financial Services",
        "Healthcare / Medical",
        "Education / E-Learning",
        "Retail / E-commerce",
        "Manufacturing",
        "Logistics / Transportation",
        "Automobile / Automotive",
        "Construction / Real Estate",
        "Hospitality / Travel / Tourism",
        "Media / Advertising / PR",
        "Legal / Law Services",
        "Government / Public Sector",
        "Non-Profit / NGO",
        "Pharmaceuticals / Biotech",
        "Energy / Oil & Gas",
        "Agriculture / Food Processing",
        "Aerospace / Aviation",
        "Others"
    ];

    const strength = [
        '1-10',
        '10-30',
        '30-50',
        '50-100',
        'More than 100'
    ]

    function validateStepOne() : boolean {
        const nameerror = !details.companyName || !/^[A-Za-z0-9&.,' -]{2,100}$/.test(details.companyName) || false
        const abouterror = !details.about || !/^[\w\s.,!?'"():;\/\-–—’]{10,1000}$/.test(details.about) || false
        const benefitserror = !details.benefits || !/^[\w\s.,!?'"():;\/\-–—’]{10,1000}$/.test(details.benefits) || false

        nameerror ? setnamerror("Enter valid company name") : setnamerror("")
        abouterror ? setabouterror("Enter valid summary") : setabouterror("")
        benefitserror ? setbenefitserror("Enter valid benefits") : setbenefitserror("")

        if(nameerror || abouterror || benefitserror){
            return false
        }
        return true
    }

    function validateStepTwo() : boolean {
        const yearofestablishmenterror = !details.yearOfEstablishment || !/^(18|19|20)\d{2}$/.test(details.yearOfEstablishment) || false
        const websiteerror = !/^$|^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/.test(details.website) || false
        const visionerror = !details.vision || !/^[A-Za-z0-9.,!?'"():;\- \n\r]{10,1000}$/.test(details.vision) || false
        const companyTypeerror = !details.companyType || false
        const industryerror = !details.industryType || false
        const teamstrengtherror = !details.teamStrength || false

        yearofestablishmenterror ? setestablishmenterror("Enter valid year") : setestablishmenterror("")
        websiteerror ? setwebsiteerror("Enter valid url") : setwebsiteerror("")
        visionerror ? setvisionerror('Enter company vision') : setvisionerror("")
        companyTypeerror ? setcompanytypeerror('Select Company Type') : setcompanytypeerror("")
        industryerror ? setindustryerror('Select Industry') : setindustryerror("") 
        teamstrengtherror ? setteamstreangtherror('Select team strength') : setteamstreangtherror("")

        if(yearofestablishmenterror || websiteError || visionerror || companyTypeerror || industryerror || teamstrengtherror){
            return false
        }

        return true
    }

    function validateStepThree() : boolean {
        const cityerror = !details.city || !/^[a-zA-Z\s]{2,50}$/.test(details.city) || false
        const stateerror = !details.state || !/^[a-zA-Z\s]{2,50}$/.test(details.state) || false
        const countryerror = !details.country || !/^[a-zA-Z\s]{2,50}$/.test(details.country) || false
        const mobileerror = !details.mobile || !/^[6-9]\d{9}$/.test(details.mobile) || false
        const emailerror = !details.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(details.email) || false

        cityerror ? setcityerror("Enter valid city") : setcityerror("")
        stateerror ? setstaterror('Enter valid state') : setstaterror("")
        countryerror ? setcountryerror('Enter valid country') : setcountryerror("")
        mobileerror ? setMobileError('Enter valid mobile') : setMobileError("")
        emailerror ? setEmailError('Enter valid email') : setEmailError("")

        if(cityerror || stateerror || countryerror || mobileerror || emailerror){
            return false
        }

        return true
    }

    return(
        <>
            <div className="w-full h-screen">
                <form onSubmit={handleSubmit(saveDetails)} className="w-[500px] mx-auto my-10">
                    <p className="text-xl">Fill some basic details about you</p>

                    <FormControl fullWidth sx={{marginTop:'30px'}} error={Boolean(errors.employerType)}>
                        <InputLabel id="employer-type-label">Employer Type</InputLabel>
                        <Controller
                            name="employerType"
                            control={control}
                            rules={{
                                required:{value:true, message:'Select employer type'}
                            }}
                            render={({field}) => {
                                return <Select error={Boolean(errors.employerType)} labelId="employer-type-label" label="Employer Type" {...field}>
                                    <MenuItem value="self">I am an independant employer / self employer</MenuItem>
                                    <MenuItem value="company">I am Recruiting for a company</MenuItem>
                                </Select>
                            }}
                        />
                        <FormHelperText>{errors.employerType?.message}</FormHelperText>
                    </FormControl>

                    {
                        employerType === 'self' && (
                            <div className="w-full">
                                <FormControl fullWidth sx={{marginTop:'20px'}} error={Boolean(errors.industry)}>
                                    <InputLabel id="industry-label">Focusing Industry</InputLabel>
                                    <Controller
                                        name="industry"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:'Please select industry'}
                                        }}
                                        render={({field}) => {
                                            return <Select error={Boolean(errors.industry)} labelId="industry-label" label="Focusing Industry" {...field}>
                                                {
                                                    industryTypes.map((inustry : string, index : number) => {
                                                        return <MenuItem key={index} value={inustry}>{inustry}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        }}
                                    />
                                    <FormHelperText>{errors.industry?.message}</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth sx={{marginTop:'20px'}} error={Boolean(errors.summary)}>
                                    <Controller
                                        name="summary"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:'Summary can not be empty'},
                                            pattern:{value:/^[\w\s.,:;'?!"-()]{10,500}$/, message:'Please enter a valid summary'}
                                        }}
                                        render={({field}) => {
                                            return <Textarea error={Boolean(errors.summary)} {...field} sx={{height:'100px'}} placeholder="Write your summary" />
                                        }}
                                    />
                                    <FormHelperText>{errors?.summary?.message}</FormHelperText>
                                </FormControl>
                                <div className="mt-8 flex gap-5">
                                    <FormControl fullWidth>
                                        <Controller 
                                            name="city"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Please enter city name'},
                                                pattern:{value:/^[a-zA-Z\s\-']{2,50}$/, message:'Enter valid data'}
                                            }}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.city)} helperText={errors.city?.message} {...field} variant="outlined" label="City" />
                                            }}
                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth>
                                        <Controller 
                                            name="state"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Please enter state name'},
                                                pattern:{value:/^[a-zA-Z\s\-']{2,50}$/, message:'Enter valid data'}
                                            }}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.state)} helperText={errors.state?.message} {...field} variant="outlined" label="State" />
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <div className="mt-8 flex gap-5">
                                    <FormControl fullWidth>
                                        <Controller
                                            name="country"
                                            rules={{
                                                required:{value:true, message:'Country can not be empty'},
                                                pattern:{value:/^[a-zA-Z\s\-']{2,50}$/, message:'Enter valid data'}
                                            }}
                                            control={control}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.country)} helperText={errors.country?.message} {...field} variant="outlined" label="Country" />
                                            }}
                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth>
                                        <Controller 
                                            name="pincode"
                                            rules={{
                                                required:{value:true, message:'Pincode can not be empty'},
                                                pattern:{value:/^[1-9]\d{5}$/, message:'Enter a valid pincode'}
                                            }}
                                            control={control}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.pincode)} helperText={errors.pincode?.message} {...field} variant="outlined" label="Pincode" />
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        )
                    }

                    {
                        employerType === 'company' && (
                            <div className="w-full">
                                <FormControl fullWidth sx={{marginTop:'20px'}}>
                                    <Controller
                                        name="organizationName"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:'Comapny name can not be empty'},
                                            pattern:{value:/^[A-Za-z0-9&.,' -]{2,100}$/, message:'Enter a valid name'}
                                        }}
                                        render={({field}) => {
                                            return <TextField error={Boolean(errors.organizationName)} helperText={errors.organizationName?.message} {...field} variant="outlined" label="Organization Name" />
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{marginTop:'20px'}} error={Boolean(errors.organizationType)}>
                                    <InputLabel id="organization-type-label">Organization Type</InputLabel>
                                    <Controller
                                        name="organizationType"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:'Select Organization Type'}
                                        }}
                                        render={({field}) => {
                                            return <Select error={Boolean(errors.organizationType)} labelId="organization-type-label" label="Employer Type" {...field}>
                                                {
                                                    companyType.map((companyType : string, index : number) => {
                                                        return <MenuItem key={index} value={companyType}>{companyType}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        }}
                                    />
                                    <FormHelperText>{errors.organizationType?.message}</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth sx={{marginTop:'20px'}} error={Boolean(errors.industry)}>
                                    <InputLabel id="industry-label">Industry</InputLabel>
                                    <Controller
                                        name="industry"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:'Please select industry'}
                                        }}
                                        render={({field}) => {
                                            return <Select error={Boolean(errors.industry)} labelId="industry-label" label="Industry" {...field}>
                                                {
                                                    industryTypes.map((inustry : string, index : number) => {
                                                        return <MenuItem key={index} value={inustry}>{inustry}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        }}
                                    />
                                    <FormHelperText>{errors.industry?.message}</FormHelperText>
                                </FormControl>

                                <div className="mt-8 flex gap-5">
                                    <FormControl fullWidth>
                                        <Controller 
                                            name="city"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Please enter city name'},
                                                pattern:{value:/^[a-zA-Z\s\-']{2,50}$/, message:'Enter valid data'}
                                            }}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.city)} helperText={errors.city?.message} {...field} variant="outlined" label="City" />
                                            }}
                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth>
                                        <Controller 
                                            name="state"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Please enter state name'},
                                                pattern:{value:/^[a-zA-Z\s\-']{2,50}$/, message:'Enter valid data'}
                                            }}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.state)} helperText={errors.state?.message} {...field} variant="outlined" label="State" />
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <div className="mt-8 flex gap-5">
                                    <FormControl fullWidth>
                                        <Controller
                                            name="country"
                                            rules={{
                                                required:{value:true, message:'Country can not be empty'},
                                                pattern:{value:/^[a-zA-Z\s\-']{2,50}$/, message:'Enter valid data'}
                                            }}
                                            control={control}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.country)} helperText={errors.country?.message} {...field} variant="outlined" label="Country" />
                                            }}
                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth>
                                        <Controller 
                                            name="pincode"
                                            rules={{
                                                required:{value:true, message:'Pincode can not be empty'},
                                                pattern:{value:/^[1-9]\d{5}$/, message:'Enter a valid pincode'}
                                            }}
                                            control={control}
                                            render={({field}) => {
                                                return <TextField error={Boolean(errors.pincode)} helperText={errors.pincode?.message} {...field} variant="outlined" label="Pincode" />
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <FormControl fullWidth sx={{marginTop:'20px'}}>
                                    <Controller
                                        name="teamStrength"
                                        control={control}
                                        rules={{
                                            pattern:{value:/^\d{1,2}$/, message:'Enter a value in a range with - or to'}
                                        }}
                                        render={({field}) => {
                                            return <TextField error={Boolean(errors.teamStrength)} helperText={errors.teamStrength?.message} variant="outlined" label="Team strength" {...field} />
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{marginTop:'20px'}} error={Boolean(errors.aboutCompany)}>
                                    <Controller
                                        name="aboutCompany"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:"Please give a short intro about your company"},
                                            //pattern:{value:/^\d{1,2}$/, message:'Enter a value in a range with - or to'}
                                        }}
                                        render={({field}) => {
                                            return <Textarea error={Boolean(errors.aboutCompany)} {...field} sx={{height:'100px'}} placeholder="About your company" />
                                        }}
                                    />
                                    <FormHelperText>{errors.aboutCompany?.message}</FormHelperText>
                                </FormControl>
                            </div>
                        )
                    }

                    <div className="mt-10">
                        <button type="submit" className="text-white text-sm px-5 py-2  rounded bg-gradient-to-br from-blue-500 to-indigo-600">Save</button>
                    </div>
                </form>
            </div>
        </>
        // 
    )
}
