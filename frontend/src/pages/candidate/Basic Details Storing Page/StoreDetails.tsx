import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {motion, AnimatePresence} from 'motion/react'
import { getLocationDetails, saveBasicDetails } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Textarea } from "@mui/joy";

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

    
    async function onSubmit(data : FormState){
        const {headline, city, district, state, country, pincode, summary} = data
        try {
            const result = await saveBasicDetails(headline, city    , district, state, country, pincode, summary)

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
            Swal.fire({icon:'error', title:'Oops', text:'Something went wrong'})
        }

          
    }
    //const [errors, setErrors] = useState<ValidationErrors>({});
    //const [isLocationUsing, setIsLocationUsing] = useState(false)
    
    const location = useLocation()
    const { userName, userId } = location.state || {};

    const navigateTo = useNavigate()

      useEffect(() : any => {
        if(!userId || !userName){
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Required user information is missing.' });
            return navigateTo(-1)
        }
      }, [])

      //handle error visibility when user types
    
      
    //   ask live location permission
    //   function getLocation(){
    //     Swal.fire({
    //         icon:'info',
    //         title:'Access',
    //         text:'Aspiro need access to your location',
    //         showConfirmButton:true,
    //         confirmButtonText:'Allow',
    //         showCancelButton:true,
    //         cancelButtonText:'Deny'
    //     }).then(async (response) => {
            
    //         if(response.isConfirmed){
    //             if(navigator.geolocation){
    //                 navigator.geolocation.getCurrentPosition(async (position : GeolocationPosition) => {
    //                     console.log('This is user current position', position)
    //                     const result = await getLocationDetails(position.coords.latitude, position.coords.longitude)
    //                     if (result?.address) {
    //                         setFormData(prev => ({
    //                             ...prev,
    //                             country: result.address.country || "",
    //                             state: result.address.state || "",
    //                             district: result.address.state_district || "",
    //                             city: result.address.county || "",
    //                             pincode: result.address.postcode || ""
    //                         }));
    //                     }
    //                 }, (error : GeolocationPositionError) => {
    //                     console.log('Error occured while geting users position ', error)
    //                 })
    //             }
    //         }else{
    //             return
    //         }
    //     })
        

//      }
      
    return(
        <div className="w-full min-h-screen grid grid-cols-1 relative store-details">

            <AnimatePresence mode="wait">
                            
                        <motion.section
                            key="section-one" 
                            className="flex flex-col !py-10 justify-center items-center store-details"
                            initial={{opacity:0, y:50}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:0.6}}
                            exit={{opacity:0}}
                        >   
                        <form className="max-w-[600px]" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <p className="text-blue-500 !mt-10 text-4xl">Welcome {userName}</p>
                                <p className="text-xl mt-5">We would love to know a bit more about you!</p>
                                <div className="group mt-5">
                                    <label htmlFor="headline" className="text-white block">Which one should describe your interested job role/headline?</label>
                                    <FormControl fullWidth sx={{marginTop:'10px'}}>
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
                                                return <TextField
                                                    {...field}
                                                    label="Headline"
                                                    variant="outlined"
                                                    error={Boolean(errors.headline)}
                                                    helperText={errors.headline?.message}
                                                />
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                    
                            <div className="!mt-10">
                                <p className="text-blue-500 text-3xl">May I know about your location?</p>
                                <p className="mt-5 text-black text-lg">This will help us to personalize near by jobs.</p>
                                <div className="mt-2">
                                    {/* {
                                        isLocationUsing
                                            ? <button onClick={() => setIsLocationUsing(false)} className="text-xs text-blue-500">Fill manually</button>
                                            : <button onClick={getLocation} className="text-xs text-blue-500">Use my current location</button>
                                    } */}
                                </div>
                                <FormControl fullWidth sx={{marginTop:'10px'}}>
                                        <Controller
                                            name="city"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'City can not be empty'},
                                                minLength:{value:3, message:'Minimum 3 charecters'},
                                                maxLength:{value:30, message:'Maximum 30 charecters'},
                                                pattern:{value:/^[a-zA-Z\s\-]{2,50}$/, message:'Please enter a valid district'}
                                            }}
                                            render={({field}) => {
                                                return <TextField
                                                    {...field}
                                                    label="City"
                                                    variant="outlined"
                                                    error={Boolean(errors.city)}
                                                    helperText={errors.city?.message}
                                                />
                                            }}
                                        />
                                    </FormControl>
                                
                                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                                        <Controller
                                            name="district"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'District can not be empty'},
                                                minLength:{value:3, message:'Minimum 3 charecters'},
                                                maxLength:{value:30, message:'Maximum 30 charecters'},
                                                pattern:{value:/^[a-zA-Z\s\-]{2,50}$/, message:'Please enter a valid district'}
                                            }}
                                            render={({field}) => {
                                                return <TextField
                                                    {...field}
                                                    label="District"
                                                    variant="outlined"
                                                    error={Boolean(errors.district)}
                                                    helperText={errors.district?.message}
                                                />
                                            }}
                                        />
                                    </FormControl>
                                
                                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                                        <Controller
                                            name="state"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'State can not be empty'},
                                                minLength:{value:3, message:'Minimum 3 charecters'},
                                                maxLength:{value:30, message:'Maximum 30 charecters'},
                                                pattern:{value:/^[a-zA-Z\s\-]{2,50}$/, message:'Please enter a valid state name'}
                                            }}
                                            render={({field}) => {
                                                return <TextField
                                                    {...field}
                                                    label="State"
                                                    variant="outlined"
                                                    error={Boolean(errors.state)}
                                                    helperText={errors.state?.message}
                                                />
                                            }}
                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                                        <Controller
                                            name="country"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Country can not be empty'},
                                                minLength:{value:3, message:'Minimum 3 charecters'},
                                                maxLength:{value:30, message:'Maximum 30 charecters'},
                                                pattern:{value:/^[a-zA-Z\s\-]{2,50}$/, message:'Please enter a valid country name'}
                                            }}
                                            render={({field}) => {
                                                return <TextField
                                                    {...field}
                                                    label="Country"
                                                    variant="outlined"
                                                    error={Boolean(errors.country)}
                                                    helperText={errors.country?.message}
                                                />
                                            }}
                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth sx={{marginTop:'10px'}}>
                                        <Controller
                                            name="pincode"
                                            control={control}
                                            rules={{
                                                required:{value:true, message:'Pincode can not be empty'},
                                                minLength:{value:6, message:'Minimum 6 charecters'},
                                                maxLength:{value:6, message:'Maximum 6 charecters'},
                                                pattern:{value:/^[1-9][0-9]{5}$/, message:'Please enter a valid country name'}
                                            }}
                                            render={({field}) => {
                                                return <TextField
                                                    {...field}
                                                    label="Pincode"
                                                    variant="outlined"
                                                    error={Boolean(errors.pincode)}
                                                    helperText={errors.pincode?.message}
                                                />
                                            }}
                                        />
                                    </FormControl>
                            </div>   
                        
                            <div className="!mt-10 flex flex-col items-center">
                                <p className="text-blue-500 text-4xl">Now the final part</p>
                                <p className="text-lg text-black mt-5">Give a brief summary of yourself. This will help others to know about you more</p>
                                <FormControl fullWidth sx={{marginTop:'10px'}} error={Boolean(errors.summary)}>
                                    <Controller
                                        name="summary"
                                        control={control}
                                        rules={{
                                            required: 'Please provide a brief summary about yourself.',
                                            minLength: { value: 30, message: 'Summary must be at least 30 characters.' }
                                        }}
                                        render={({field}) => {
                                            return <Textarea
                                                {...field}
                                                minRows={4}
                                                placeholder="Enter little about you..."
                                                error={Boolean(errors.summary)}
                                            />
                                        }}
                                    />
                                    <FormHelperText>{errors.summary?.message}</FormHelperText>
                                </FormControl>
                                
                                {/* <div className="group mt-5">
                                    <label htmlFor="summary" className="text-white block">About me</label>
                                    <textarea value={formData.summary} onChange={handleFormChange} name="summary" id="summary" className="text-sm mt-2 border border-gray-400 outline-none rounded w-full h-[200px] text-black p-2"></textarea>
                                    {errors.summary && <label style={errorLabelStyle}>{errors.summary}</label>}
                                </div> */}
                                <button className="!mt-5 w-fit bg-gradient-to-br from-blue-500 to-indigo-600 text-white !px-5 !py-2 rounded" type="submit">Save and continue</button>
                            </div>

                            </form>
                        </motion.section>
                
            </AnimatePresence>
        </div>
    )
}