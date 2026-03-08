import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getLocationDetails, saveBasicDetails } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, FormHelperText } from "@mui/material";
import { Notify } from "notiflix";
import { BiBriefcase } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import { CgCheck } from "react-icons/cg";

interface FormState {
    headline: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    summary: string;
}


export default function StoreDetails(){

    const {formState:{errors}, control, watch, handleSubmit} = useForm<FormState>({
        defaultValues:{
            headline:"",
            city:"",
            district:"",
            state:"",
            country:"",
            pincode:"",
            summary:""
        }
    })

    const [query, setQuery] = useState("")
    const [suggestions, setSuggestion] = useState([])
    const [selectedLocation, setSelectedLocation] = useState<any>(null)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if(value.length < 3){
            setSuggestion([])
            return
        }

        try {
            const result = await getLocationDetails(value)
            setSuggestion(result)
            
        } catch (error: unknown) {
            console.log('error occured while geting location details', error)
            Notify.failure('Something went wrong while geting location deetails')
        }
    }

    const handleLocationSelect = (place: any) => {
        const components = place.address
        setSelectedLocation({
            formattedAddress: place.display_name,
            city: components.city || components.town || components.village || "",
            district: components.state_district || components.county || components.district || "",
            state: components.state || "",
            country: components.country || "",
            pinCode: components.postcode || "",
            lat: parseFloat(place.lat),
            lon: parseFloat(place.lon)
        })
        setQuery(place.display_name)
        setSuggestion([])
    } 

    const [loading, setLoading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    
    
    const [isSummaryFieldFocused, setIsSummaryFieldFocused] = useState<boolean>(false)
    const [isHeadlineFieldFocused, setIsHeadlineFieldFocused] = useState<boolean>(false)
    const [isLocationFieldFocused, setIsLocationFieldFocused] = useState<boolean>(false)
    
    const onSummaryFieldFocus = () =>  setIsSummaryFieldFocused(true)
    const onSummaryFieldBlur = () => setIsSummaryFieldFocused(false)

    const onHeadlineFieldFocus = () => setIsHeadlineFieldFocused(true)
    const onHeadlineFieldBlur = () => setIsHeadlineFieldFocused(false)

    const onLocationFieldFocus = () => setIsLocationFieldFocused(true)
    const onLocationFieldBlur = () => setIsLocationFieldFocused(false)

    async function onSubmit(data : FormState){
        setLoading(true)
        const {headline, summary} = data
        try {
            // console.log('--printing longtitude and latitude before calling api', selectedLocation.lon, selectedLocation.lat)
            // console.log('--printing selected location credentials for fallback', selectedLocation)
            
            const result = await saveBasicDetails(
                headline,
                selectedLocation.city,
                selectedLocation.district,
                selectedLocation.state,
                selectedLocation.country,
                selectedLocation.pinCode,
                summary,
                selectedLocation.lon,
                selectedLocation.lat
            )

            if(result?.success){
                Swal.fire({
                    icon: "success",
                    title: "Saved",
                    text: 'Thank you for providing your basic details, you can add more details from the profile',
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonText: "Continue",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                         navigateTo('/profile/personal')
                    }
                })
            }else{
                Swal.fire({icon:'error', title:'Save Failed', text:result?.message})
            }
        } catch (error : unknown) {
            console.log('--error--', error instanceof Error ? error.message : error)
            Swal.fire({icon:'error', title:'Oops', text:'Something went wrong'})
        } finally {
            setLoading(false)
        }

          
    }

    const typedHeadline = watch('headline')
    const typedSummary = watch('summary')
    
    const location = useLocation()
    const { userName, userId } = location.state || {};

    const navigateTo = useNavigate()

      useEffect(() : any => {
        if(!userId || !userName){
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Required user information is missing.' });
            return navigateTo(-1)
        }
      }, [])
      
    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-200 to-indogo-200">
            <div className="w-full h-full flex flex-col items-center">
                <p className="mt-10 font-semibold text-2xl">Welcome {userName}! 👋</p>
                <p className="text-xs text-gray-500 mt-2">Let's set up your profile to help you connect with the right opportunities</p>
                <div className="flex gap-1 mt-10">
                    <div className="flex items-center gap-1">
                        <div className={`${isHeadlineFieldFocused ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow shadow-xl shadow-blue-300' : (typedHeadline ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-xl' : 'bg-gray-300')} w-10 h-10 rounded-full flex items-center justify-center text-white`}>
                            {
                                typedHeadline
                                    ? <CgCheck size={25} />
                                    : 1
                            }
                        </div>
                        <div className={`${typedHeadline ? 'bg-gradient-to-br from-green-400 to-green-500' : 'bg-gray-300'} w-20 h-1 rounded-md`}></div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className={`${isLocationFieldFocused ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow shadow-xl shadow-blue-300' : (selectedLocation ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-xl' : 'bg-gray-300')} w-10 h-10 rounded-full flex items-center justify-center text-white`}>
                            {
                                selectedLocation
                                    ? <CgCheck size={25} />
                                    : 2
                            }
                        </div>
                        <div className={`${selectedLocation ? 'bg-gradient-to-br from-green-400 to-green-500' : 'bg-gray-300'} w-20 h-1 rounded-md`}></div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className={`${isSummaryFieldFocused ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow shadow-xl shadow-blue-300' : (typedSummary ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-xl' : 'bg-gray-300')} w-10 h-10 rounded-full flex items-center justify-center text-white`}>
                            {
                                typedSummary
                                    ? <CgCheck size={25} />
                                    : 3
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-10 bg-white rounded-md w-lg md:w-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div id="one" className={`px-5 py-8 border-b border-gray-200 ${isHeadlineFieldFocused ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}>
                            <div className="flex gap-2 ">
                                <div className="bg-blue-500 rounded-md w-10 h-10 flex items-center justify-center"><BiBriefcase color="white" /></div>
                                <div className="flex-1">
                                    <p className="font-medium">What's your professional headline?</p>
                                    <p className="text-xs text-gray-500 mt-2">Describe your current role or the position you are seeking. This helps recruiters find you easily</p>
                                </div>
                            </div>
                            <FormControl fullWidth sx={{marginTop:'15px'}} error={Boolean(errors.headline)}>
                                        <Controller
                                            name="headline"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Headline can not be empty'},
                                                minLength:{value:3, message:'Minimum 3 charecters'},
                                                maxLength:{value:30, message:'Maximum 30 charecters'},
                                                pattern:{value:/^[A-Za-z\s-.,&()]+$/, message:'Please choose a valid headline/job role'}
                                            }}
                                            render={({field}) => {
                                                return <div className="w-full">
                                                    <label htmlFor="" className="!text-xs !text-black !mb-1">Professional Headline <span className="text-red-500">*</span></label>
                                                    <input
                                                            {...field}
                                                            onFocus={onHeadlineFieldFocus}
                                                            onBlur={onHeadlineFieldBlur}
                                                            type="text"
                                                            placeholder="e.g; Senior Software Engineer | Fullstack Developer"
                                                            className="!text-xs border border-gray-300 p-3 w-full rounded-md"
                                                        />
                                                </div>
                                            }}
                                        />
                                        <FormHelperText>{errors.headline?.message}</FormHelperText>
                            </FormControl>
                        </div>

                        <div id="two" className={`px-5 py-8 border-b border-gray-200 ${isLocationFieldFocused ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}>
                            <div className="flex gap-2 ">
                                <div className="bg-violet-500 rounded-md w-10 h-10 flex items-center justify-center"><IoLocation color="white" /></div>
                                <div className="flex-1">
                                    <p className="font-medium">Where are you located at?</p>
                                    <p className="text-xs text-gray-500 mt-2">This helps us personalize job recommendations near you and show relevant opportunities.</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                    <label htmlFor="" className="!mb-1 !text-xs !text-black">Enter your location <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text"
                                        className="border border w-full p-3 rounded-md !text-xs"
                                        placeholder="Start typing your city, district, state format"
                                        value={query}
                                        onFocus={onLocationFieldFocus}
                                        onBlur={onLocationFieldBlur}
                                        onChange={handleChange}
                                    />
                                    {suggestions?.length > 0 && (
                                        <ul className="border mt-1 max-h-48 overflow-y-auto bg-white">
                                            {suggestions.map((place: any) => (
                                            <li
                                                key={place.place_id}
                                                className="p-2 hover:bg-gray-100 text-xs text-gray-500 cursor-pointer"
                                                onClick={() => handleLocationSelect(place)}
                                            >
                                                {place.display_name}
                                            </li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        </div>

                        <div id="three" className={`px-5 py-8 border-b border-gray-200 ${isSummaryFieldFocused ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}>
                            <div className="flex gap-2 ">
                                <div className="bg-blue-500 rounded-md w-10 h-10 flex items-center justify-center"><BiBriefcase color="white" /></div>
                                <div className="flex-1">
                                    <p className="font-medium">Tell me about yourself</p>
                                    <p className="text-xs text-gray-500 mt-2">Give a brief summary of your experience, skills, and what makes you unique.</p>
                                </div>
                            </div>
                            <FormControl fullWidth sx={{marginTop:'10px'}} error={Boolean(errors.summary)}>
                                    <Controller
                                        name="summary"
                                        control={control}
                                        rules={{
                                            required: 'Please provide a brief summary about yourself.',
                                            minLength: { value: 30, message: 'Summary must be at least 30 characters.' }
                                        }}
                                        render={({field}) => {
                                            return <div>
                                                <label htmlFor="" className="!text-black !text-xs">Professional summary <span className="text-red-500">*</span></label>
                                                <textarea 
                                                    {...field}
                                                    onFocus={onSummaryFieldFocus}
                                                    onBlur={onSummaryFieldBlur}
                                                    name="" id=""
                                                    className="border border-gray-200 rounded-md w-full p-3 outline-none text-xs"
                                                    placeholder="Share abobout who you are your experience, skills and achivements"
                                                    rows={6}
                                                >

                                                </textarea>
                                            
                                            </div>
                                        }}
                                    />
                                    <FormHelperText>{errors.summary?.message}</FormHelperText>
                                </FormControl>
                        </div>
                        <div className="p-5 flex items-center justify-between">
                            <p className="text-xs text-gray-500">All fields are required to continue</p>
                            <Button type="submit" disabled={isButtonDisabled} variant="contained" loading={loading}>Save and continue</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}