import { Autocomplete, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addUserSkill } from "../../../services/skillService";
import { getSkillsSuggesion } from "../../../services/skillService";
// import { getSkillsSuggesion } from "../../../services/userServices";
import { Notify } from "notiflix";
import { Skills } from "../../../types/entityTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { FiX } from "react-icons/fi";

interface AddSkillResponsePayload {
    success: boolean
    message: string
    result: Skills
}

interface AddSkillFormProps {
    skillsModalOpen: boolean
    closeSkillsModal: () => void
    onAddSkill: (data: Skills) => void
}

export default function AddSkillsForm({skillsModalOpen, closeSkillsModal, onAddSkill} : AddSkillFormProps){
    const [skillsOptions, setSkillsOptions] = useState<string[]>([])
    const [skillOptionsLoading, setSkillOptionsLoading] = useState<boolean>(false)

    type Inputs = {
        skillType:string,
        skill:string,
        skillLevel:string
    }

    const {handleSubmit, reset, watch, formState:{errors}, control} = useForm<Inputs>({
        defaultValues: {
            skill: '',
            skillType: '',
            skillLevel: ''
        }
    })
    const [loading, setLoading] = useState<boolean>(false)

    const fetchSkillSuggestions = useCallback(async (query: string) => {
        if (!query) {
            setSkillsOptions([]);
            return;
        }
        setSkillOptionsLoading(true)
        try {
            const result = await getSkillsSuggesion(query)
            console.log('-- checking upcoming skills from the backend -- suggestion --', result)
            if(result?.success){
                const fetchedSkills = result?.result?.skills || [];
                // Map correctly based on API response structure (handling objects or strings)
                const mappedSkills = fetchedSkills.map((s: {skill: string}) => {
                    return typeof s === 'string' ? s : s.skill // (s?.skill || s?.skills || s?.name);
                }).filter((s: string) => s && typeof s === 'string');
                setSkillsOptions(mappedSkills);
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setSkillOptionsLoading(false)
        }
    }, [])

    const debounceFetchSkillsSuggestions = (fn: unknown, delay: number) => {
        let timer: NodeJS.Timeout
        return function(...args: unknown[]){
            clearTimeout(timer)
            timer = setTimeout(() => {
                if(fn instanceof Function){
                    fn(...args)
                }
            }, delay);
        }
    }

    const debounce = useMemo(() => {
        return debounceFetchSkillsSuggestions(fetchSkillSuggestions, 400)
    }, [fetchSkillSuggestions])

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width:'auto',
    //     minWidth:400,
    //     bgcolor: 'background.paper',
    //     borderRadius: 2,
    //     boxShadow: 24,
    //     p: 4,
    // }


    async function addSkill(){
        setLoading(true)
        const {skill, skillLevel, skillType} = watch()
               
        try {
            const result: AddSkillResponsePayload = await toast.promise(
                addUserSkill(skillType, skill, skillLevel),
                {
                    pending: 'Adding skill',
                    success: 'Skill Added successfully',
                    error:{
                        render(props){
                            const data = props.data as AxiosError<{message: string}>
                            return data.message
                        }
                    }
                }
            )
           // closeSkillsModal()
            if(result.success){
                // console.log('--checking skill return --', result.result)
                onAddSkill(result.result)
            }else{
                toast.error(result.message)
            }
        } catch (error : unknown) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            reset({
                skill:'',
                skillLevel:'',
                skillType:''
            })
            setLoading(false)
            closeSkillsModal()
        }
    }


    return (
      <>
        <Modal
          className="flex items-center justify-center"
          open={skillsModalOpen}
          onClose={closeSkillsModal}
        >
          <div className="bg-white w-sm md:w-md rounded-lg">
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-xl">Add Skill</p>
                </div>
                <div>
                  <button className="hover:bg-slate-200 p-2 rounded-md">
                    <FiX />
                  </button>
                </div>
              </div>
              <p className="font-medium text-slate-500 text-xs mt-2">
                Adding skills will help you to find right opportunities and peoples
              </p>
            </div>
            <div className="p-5">
                <form onSubmit={handleSubmit(addSkill)}>
              <FormControl fullWidth error={Boolean(errors.skillType)}>
                <InputLabel id="skill-type-label">Skill Type</InputLabel>
                <Controller
                  name="skillType"
                  control={control}
                  rules={{
                    required: { value: true, message: 'Please select skill type' },
                  }}
                  render={({ field }) => {
                    return (
                      <Select fullWidth {...field} labelId="skill-type-label" label="Skill Type">
                        <MenuItem value="Technical-Skill">Technical Skill</MenuItem>
                        <MenuItem value="Soft-Skill">Soft Skill</MenuItem>
                      </Select>
                    );
                  }}
                />
                <FormHelperText>{errors.skillType?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth className="!mt-5">
                <Controller 
                    control={control}
                    name="skill"
                    rules={{
                        required:{value: true, message: 'Skill name can not be empty'},
                        minLength:{value: 2, message: 'Minimum 2 charecters'},
                        maxLength:{value: 30, message: 'Maximum 30 charecters'}
                    }}
                    render={({field: {onChange, value}}) => (
                        <Autocomplete
                            freeSolo
                            options={skillsOptions}
                            filterOptions={(x) => x}
                            loading={skillOptionsLoading}
                            value={value}
                            onInputChange={(_, newInputValue, reason) => {
                                if (reason === 'input') debounce(newInputValue);
                            }}
                            onChange={(_, newValue) => onChange(newValue)}
                            renderInput={(params) => (
                                <TextField 
                                    {...params}
                                    fullWidth
                                    label="Skill"
                                    variant="outlined"
                                    error={Boolean(errors.skill)}
                                    helperText={errors.skill?.message}
                        
                                />
                            )}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth className="!mt-5" error={Boolean(errors.skillLevel)}>
                <InputLabel id="skill-level-id">Skill Level</InputLabel>
                <Controller
                    name="skillLevel"
                    control={control}
                    rules={{
                        required:{value:true, message:'Please select skill proviciency'},
                    }}
                    render={({field}) => {
                        return <Select {...field}
                            labelId="skill-level-id"
                            label="Skill Level"
                            error={Boolean(errors.skillLevel)}
                        >
                            <MenuItem value="beginner">Beginner</MenuItem>
                            <MenuItem value="intermediate">Intermediate</MenuItem>
                            <MenuItem value="professional">Professional</MenuItem>
                            <MenuItem value="advanced">Advanced</MenuItem>
                        </Select>
                    }}
                />
                <FormHelperText>{errors.skillLevel?.message}</FormHelperText>
            </FormControl>
            <Box sx={{width:'100%', marginTop:'10px'}}>
                <Button type="submit" variant="contained" loading={loading} fullWidth>Add Skill</Button>
            </Box>
            </form>
            </div>
            
          </div>
        </Modal>
      </>
    );
}


{/* <Box sx={style}>
            <div className='w-full flex justify-end'>
                <button onClick={closeSkillsModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>Add Skill</Typography>
          <form onSubmit={handleSubmit(addSkill)}>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth error={Boolean(errors.skillType)}>
                <InputLabel id="skill-type-label">Skill Type</InputLabel>    
                <Controller 
                    name="skillType"
                    control={control}
                    rules={{
                        required:{value:true, message:'Please select skill type'}
                    }}
                    render={({field}) => {
                        
                        return <Select fullWidth {...field}
                            labelId="skill-type-label"
                            label="Skill Type"
                        >
                            <MenuItem value="Technical-Skill">Technical Skill</MenuItem>
                            <MenuItem value="Soft-Skill">Soft Skill</MenuItem>
                        </Select>
                    }}
                />
                <FormHelperText>{errors.skillType?.message}</FormHelperText>
            </FormControl>            

          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth>
                <Controller 
                    control={control}
                    name="skill"
                    rules={{
                        required:{value: true, message: 'Skill name can not be empty'},
                        minLength:{value: 2, message: 'Minimum 2 charecters'},
                        maxLength:{value: 30, message: 'Maximum 30 charecters'}
                    }}
                    render={({field: {onChange, value}}) => (
                        <Autocomplete
                            freeSolo
                            options={skillsOptions}
                            filterOptions={(x) => x}
                            loading={skillOptionsLoading}
                            value={value}
                            onInputChange={(_, newInputValue, reason) => {
                                if (reason === 'input') debounce(newInputValue);
                            }}
                            onChange={(_, newValue) => onChange(newValue)}
                            renderInput={(params) => (
                                <TextField 
                                    {...params}
                                    fullWidth
                                    label="Skill"
                                    variant="outlined"
                                    error={Boolean(errors.skill)}
                                    helperText={errors.skill?.message}
                        
                                />
                            )}
                        />
                    )}
                />
            </FormControl>
            {/* <TextField fullWidth {...register('skill', {
                required:{value:true, message:'Please enter skill'},
                minLength:{value:2, message:'Minimum 2 charecters'},
                maxLength:{value:30, message:'Maximum 30 charecters'}
            })}
            variant="outlined"
            label="Skill"
            error={Boolean(errors.skill)}
            helperText={errors.skill?.message}
            /> */}
            
        //   </Box>
    
        //   <Box sx={{width:'100%', marginTop:'10px'}}>
            // <FormControl fullWidth error={Boolean(errors.skillLevel)}>
            //     <InputLabel id="skill-level-id">Skill Level</InputLabel>
            //     <Controller
            //         name="skillLevel"
            //         control={control}
            //         rules={{
            //             required:{value:true, message:'Please select skill proviciency'},
            //         }}
            //         render={({field}) => {
            //             return <Select {...field}
            //                 labelId="skill-level-id"
            //                 label="Skill Level"
            //                 error={Boolean(errors.skillLevel)}
            //             >
            //                 <MenuItem value="beginner">Beginner</MenuItem>
            //                 <MenuItem value="intermediate">Intermediate</MenuItem>
            //                 <MenuItem value="professional">Professional</MenuItem>
            //                 <MenuItem value="advanced">Advanced</MenuItem>
            //             </Select>
            //         }}
            //     />
            //     <FormHelperText>{errors.skillLevel?.message}</FormHelperText>
            // </FormControl>

        //   </Box>
        //   <Box sx={{width:'100%', marginTop:'10px'}}>
        //     <Button type="submit" variant="contained" loading={loading} fullWidth>Add Skill</Button>
        //   </Box>
        //   </form>
        // </Box> */}
