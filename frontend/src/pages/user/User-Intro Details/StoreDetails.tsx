import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getLocationDetails, saveBasicDetails } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, FormHelperText } from "@mui/material";
import { Notify } from "notiflix";
// import { BiBriefcase } from "react-icons/bi";
// import { IoLocation } from "react-icons/io5";
// import { CgCheck } from "react-icons/cg";

interface FormState {
    headline: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    summary: string;
}

interface LocationPlace {
    display_name: string;
    address?: {
        city: string,
        town: string,
        village: string,
        state_district: string,
        county: string,
        country: string,
        district: string,
        state: string,
        postcode: string
    };
    lat?: string;
    lon?: string;
}

type SelectedLocationType = {
    formattedAddress: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pinCode: string;
    lon: number;
    lat: number;
}


export default function StoreDetails(){

    const {formState:{errors}, control, handleSubmit} = useForm<FormState>({
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
    const [selectedLocation, setSelectedLocation] = useState<SelectedLocationType | null>(null)

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

    const handleLocationSelect = (place: LocationPlace) => {
        const components = place.address
        setSelectedLocation({
            formattedAddress: place.display_name,
            city: components?.city || components?.town || components?.village || "",
            district: components?.state_district || components?.county || components?.district || "",
            state: components?.state || "",
            country: components?.country || "",
            pinCode: components?.postcode || "",
            lat: parseFloat(place?.lat as string),
            lon: parseFloat(place?.lon as string)
        })
        setQuery(place.display_name)
        setSuggestion([])
    } 

    const [loading, setLoading] = useState<boolean>(false)

    async function onSubmit(data : FormState){
        setLoading(true)
        const {headline, summary} = data
        try {
            
            const result = await saveBasicDetails(
                headline,
                selectedLocation?.city as string,
                selectedLocation?.district as string,
                selectedLocation?.state as string,
                selectedLocation?.country as string,
                selectedLocation?.pinCode as string,
                summary,
                selectedLocation?.lon ?? 0,
                selectedLocation?.lat ?? 0
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
    
    const location = useLocation()
    const { userName, userId } = location.state || {};

    const navigateTo = useNavigate()

      useEffect(() => {
        if(!userId || !userName){
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Required user information is missing.' });
            navigateTo(-1)
        }
      }, [])
      
    return(
        <div className="w-full min-h-screen bg-white">
            <div className="w-full h-full flex flex-col items-start ps-10 pe-10 lg:ps-100 py-10 lg:py-20">
                <p className="font-bold text-5xl tracking-wide w-100 lg:w-full text-gray-900">Let's start with you</p>
                <div className="mt-10 text-sm font-medium text-slate-400">Lets set up your profile to help you connect with the right people and right opportunities</div>
                
                <div className="mt-10 w-full md:w-155">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div id="one" className={``}>
                            <div className="flex gap-2 ">
                                
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
                                                    <label htmlFor="" className="!text-[.7rem] !text-slate-400 tracking-wide font-medium !mb-1 uppercase">Professional Headline <span className="text-red-500">*</span></label>
                                                    <input
                                                            {...field}
                                                            type="text"
                                                            placeholder="e.g; Senior Software Engineer | Fullstack Developer"
                                                            className="!text-[.9rem] pt-3 py-2 mt-2 border-b focus:!border-blue-400 transition-all duration-300 w-full placeholder:font-medium placeholder:text-slate-300 placeholder:text-[.9rem] focus:placeholder:text-slate-200"
                                                        />
                                                </div>
                                            }}
                                        />
                                        <FormHelperText>{errors.headline?.message}</FormHelperText>
                            </FormControl>
                        </div>

                        <div id="two" className={`mt-6`}>
                        
                            <div className="">
                                    <label htmlFor="" className="!text-[.7rem] !text-slate-400 tracking-wide font-medium !mb-1 uppercase">Enter your location <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text"
                                        className="!text-[.9rem] pt-3 py-2 mt-2 border-b focus:!border-blue-400 transition-all duration-300 w-full placeholder:font-medium placeholder:text-slate-300 placeholder:text-[.9rem] focus:placeholder:text-slate-200"
                                        placeholder="Start typing your city, district, state format"
                                        value={query}
                                        onChange={handleChange}
                                    />
                                    {suggestions?.length > 0 && (
                                        <ul className="border mt-1 max-h-48 overflow-y-auto bg-white">
                                            {suggestions.map((place: {place_id: string, display_name: string}) => (
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

                        <div id="three" className={`mt-6`}>
                            
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
                                                <label htmlFor="" className="!text-[.7rem] !text-slate-400 tracking-wide font-medium !mb-1 uppercase">Professional summary <span className="text-red-500">*</span></label>
                                                <textarea 
                                                    {...field}
                                                    name="" id=""
                                                    className="!text-[.9rem] pt-3 py-2 mt-2 border-b border-slate-300 focus:!border-blue-400 transition-all duration-300 w-full placeholder:font-medium placeholder:text-slate-300 placeholder:text-[.9rem] outline-none focus:placeholder:text-slate-200"
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
                        <div className="">
                            <p className="text-xs text-gray-500">All fields are required to continue</p>
                            <div className="flex justify-end mt-5">
                                <Button type="submit" variant="contained" loading={loading}>Save and continue</Button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div className="flex gap-1 mt-10">
                </div>
            </div>
        </div>
    )
}