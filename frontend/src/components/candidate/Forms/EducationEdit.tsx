import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { bachelorsDegree, diploma, higherSecondaryEducation, mastersDegree } from "../../../assets/data/educationalStreamsData";
import Swal from "sweetalert2";
import { editUserEducation } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { Notify } from "notiflix";

export default function EditEducationForm({selectedEducation, onEditEducation, editEducationModalOpen, closeEditEducationModal} : any) {
    
    type Inputs = {
        educationLevel : string
        stream : string
        institution : string
        startDate : string
        endDate : string
        isPresent: boolean
        location : string
    }

    const {reset, watch, formState:{errors}, handleSubmit, control} = useForm<Inputs>({
        defaultValues:{
            educationLevel:"",
            stream:"",
            institution:"",
            startDate:"",
            endDate:"",
            location:"",
            isPresent:false
        }
    })

    const educationLevelOnWatch = watch('educationLevel')

    const [isPresent, setIspresent] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        console.log('Selected education', selectedEducation)
        
        setIspresent(selectedEducation.isPresent)
    
    }, [selectedEducation])

    useEffect(() => {
        console.log('This component is mounted ')
        reset({
            educationLevel:selectedEducation.educationLevel,
            stream:selectedEducation.educationStream,
            institution:selectedEducation.institution,
            startDate:selectedEducation.startYear,
            endDate:selectedEducation.endYear,
            location:selectedEducation.location,
            isPresent:selectedEducation.isPresent
        })
        return () => console.log('Component unmounted')

    }, [])

    const currentEducationStatus = watch("isPresent")

    const toggleIsPresent = () => {
        setIspresent(prev => !prev)
    }


    async function editEducation(data : Inputs) {
        setLoading(true)
        const {educationLevel, stream, institution, location, startDate, endDate} = data
        
        //closeEditEducationModal()

            try {
                const result = await editUserEducation(selectedEducation._id, educationLevel, stream, institution, isPresent, startDate, endDate, location)

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
                Notify.failure(result?.message, {timeout:2000})
            }
            } catch (error : unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
            } finally {
                closeEditEducationModal()
                setLoading(true)
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
            <Controller
                name="isPresent"
                control={control}
                render={({field}) => (
                    <FormControlLabel 
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Im currently studying here"
                    />
                )}
            />
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
                        required:{value:currentEducationStatus ? false : true, message:'Please enter end year'},
                        minLength:{value:4, message:'Minimum 4 charecters'},
                        maxLength:{value:4, message:'Maximum 4 charecters'}
                    }}
                    render={({field}) => {
                        return <TextField 
                        disabled={currentEducationStatus} 
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
            <Button fullWidth type="submit" color="info" variant="contained" loading={loading}>Save Changes</Button>
          </Box>
          </form>
        </Box>
      </Modal>
    )
}