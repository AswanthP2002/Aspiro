import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { bachelorsDegree, diploma, higherSecondaryEducation, mastersDegree } from "../../../assets/data/educationalStreamsData";
import Swal from "sweetalert2";
import { editCandidateEducation } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";

export default function EditEducationForm({selectedEducation, onEditEducation, editEducationModalOpen, closeEditEducationModal} : any) {
    
    type Inputs = {
        educationLevel : string
        stream : string
        institution : string
        startDate : string
        endDate : string
        location : string
    }

    const {reset, watch, formState:{errors}, handleSubmit, control} = useForm<Inputs>({
        defaultValues:{
            educationLevel:"",
            stream:"",
            institution:"",
            startDate:"",
            endDate:"",
            location:""
        }
    })

    const educationLevelOnWatch = watch('educationLevel')

    const [isPresent, setIspresent] = useState(false)
    
    useEffect(() => {
        console.log('Selected education', selectedEducation)
        
        setIspresent(selectedEducation.isPresent)
    
    }, [selectedEducation])

    useEffect(() => {
        console.log('This component is mounted ')
        reset({
            educationLevel:selectedEducation.level,
            stream:selectedEducation.stream,
            institution:selectedEducation.organization,
            startDate:selectedEducation.startYear,
            endDate:selectedEducation.endYear,
            location:selectedEducation.location
        })
        return () => console.log('Component unmounted')

    }, [])

    const toggleIsPresent = () => {
        setIspresent(prev => !prev)
    }


    async function editEducation() {
        const {educationLevel, stream, institution, location, startDate, endDate} = watch()
        closeEditEducationModal()

            const result = await editCandidateEducation(selectedEducation._id, educationLevel, stream, institution, isPresent, startDate, endDate, location)

            if(result?.success){
                Swal.fire({
                    icon:'success',
                    title:'Edited',
                    showCancelButton:false,
                    showConfirmButton:false,
                    timer:1500
                }).then(() => {
                    onEditEducation(selectedEducation._id, {
                        level:educationLevel,
                        stream:stream,
                        organization:institution,
                        isPresent:isPresent,
                        location:location,
                        startYear:startDate,
                        endYear:endDate
                    })
                })
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:result?.message
                })
            }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:'auto',
        minWidth:400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };
    return(
        <Modal open={editEducationModalOpen} onClose={closeEditEducationModal}>
        <Box sx={style}>
            <div className='w-full flex justify-end'>
                <button onClick={closeEditEducationModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>Add Education</Typography>
          <form onSubmit={handleSubmit(editEducation)}>
          <Box sx={{width:'100%'}}>
            <FormControl fullWidth error={Boolean(errors.educationLevel?.message)}>
                <InputLabel id="education-level-label">Education Level</InputLabel>
                <Controller 
                    name="educationLevel"
                    control={control}
                    render={({field}) => {
                        return <Select
                            {...field}
                            labelId="education-level-label"
                            label="Education Level"
                            
                        >
                            <MenuItem value="higherSecondary">Higher Secondary</MenuItem>
                            <MenuItem value="bachelors">Bachelors Degree</MenuItem>
                            <MenuItem value="masters">Masters Degree</MenuItem>
                            <MenuItem value="diploma">Diploma</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    }}
                    rules={{
                        required:{value:true, message:'Education level can not be empty'}
                    }}
                />
                <FormHelperText>{errors.educationLevel?.message}</FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth error={Boolean(errors.stream)}>
                <InputLabel id="education-stream-label">Education Stream</InputLabel>
            {
                educationLevelOnWatch === 'other'
                    ? <Controller
                        name="stream"
                        control={control}
                        render={({field}) => {
                            return <TextField error={Boolean(errors.stream)} {...field} label="Education Stream" variant="outlined" />
                        }}
                        rules={{
                            required:{value:true, message:'Education stream can not be empty'},
                            minLength:{value:3, message:'Minimum 3 charecters'},
                            maxLength:{value:50, message:'Maximum 50 charecters'},
                            pattern:{value:/^[a-zA-Z0-9\s-&()\/]+$/, message:'Please enter valid education'}
                        }}
                      />
                    : <>
                      <Controller 
                        name="stream"
                        control={control}
                        rules={{
                            required:{value:true, message:'Please select education stream'}
                        }}
                        render={({field}) => {
                            return <Select labelId="education-stream-label" label="Education Stream" {...field}>
                                {
                                    educationLevelOnWatch === 'higherSecondary' && (
                                        higherSecondaryEducation.map((edu : string, index : number) => {
                                            return <MenuItem key={index} value={edu}>{edu}</MenuItem>
                                        })
                                    )
                                }
                                {
                                    educationLevelOnWatch === 'bachelors' && (
                                        bachelorsDegree.map((deg : string, index : number) => {
                                            return <MenuItem key={index} value={deg}>{deg}</MenuItem>
                                        })
                                    )
                                }
                                {
                                    educationLevelOnWatch === 'masters' && (
                                        mastersDegree.map((deg : string, index : number) => {
                                            return <MenuItem key={index} value={deg}>{deg}</MenuItem>
                                        })
                                    )
                                }
                                {
                                    educationLevelOnWatch === 'diploma' && (
                                        diploma.map((dip : string, index : number) => {
                                            return <MenuItem key={index} value={dip}>{dip}</MenuItem>
                                        })
                                    )
                                }

                            </Select>
                        }}
                      />
                    </>
            }
            <FormHelperText>{errors.stream?.message}</FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth error={Boolean(errors.institution)}>
                <Controller
                    name="institution"
                    control={control}
                    rules={{
                        required:{value:true, message:'Institution name can not be empty'},
                        minLength:{value:3, message:'Minimum 3 charecters'},
                        maxLength:{value:50, message:'Maximum 50 charecters'},
                        pattern:{value:/^[a-zA-Z0-9\s.,'()&-]+$/, message:'Enter a valid institution name'}
                    }}
                    render={({field}) => {
                        return <TextField {...field} 
                            variant="outlined"
                            label="Institution"
                            error={Boolean(errors.institution)}
                            helperText={errors.institution?.message}
                        />
                    }}
                />
            </FormControl>
           
          </Box>
          <Box sx={{width:'100%', marginTop:'10pxf'}}>
            <FormControlLabel
                control={
                    <Checkbox onChange={toggleIsPresent}
                        defaultChecked={isPresent ? true : false}
                    />
                }
                label="I am currently studying here"
            >

            </FormControlLabel>
          </Box>
          <Box sx={{width:'100%', display:'flex', gap:'5px'}}>
            <FormControl>
                <Controller
                    name="startDate"
                    control={control}
                    rules={{
                        required:{value:true, message:'Please enter start year'}
                    }}
                    render={({field}) => {
                        return <TextField 
                        label="Start Year" 
                        variant="outlined" 
                        {...field}
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate?.message}
                        />
                    }}
                    
                />
            </FormControl>

            <FormControl>
                <Controller
                    name="endDate"
                    control={control}
                    rules={{
                        minLength:{value:4, message:'Minimum 4 charecters'},
                        maxLength:{value:4, message:'Maximum 4 charecters'}
                    }}
                    render={({field}) => {
                        return <TextField 
                        disabled={isPresent ? true : false} 
                        label="End Year" 
                        variant="outlined" 
                        {...field} 
                        error={Boolean(errors.endDate)}
                        helperText={errors.endDate?.message}
                        />
                    }}
                    
                />
            </FormControl>
          </Box>

          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth>
                <Controller
                    name="location"
                    control={control}
                    render={({field}) => {
                        return <TextField
                        {...field}
                        label="Location"
                        variant="outlined"
                        error={Boolean(errors.location)}
                        helperText={errors.location?.message}
                        />
                    }}
                    rules={{
                        required:{value:true, message:'Enter location'},
                        minLength:{value:3, message:'Minimum 3 charecters'},
                        maxLength:{value:50, message:'Maximum 50 charecters'}
                    }}
                />
            </FormControl>
            
          </Box>
          
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button type="submit" className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
          </Box>
          </form>
        </Box>
      </Modal>
    )
}