import { Autocomplete, Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { addUserSkill, getSkillsSuggesion } from "../../../services/userServices";
import { Notify } from "notiflix";
import { Skills } from "../../../types/entityTypes";

interface AddSkillResponsePayload {
    success: boolean
    message: string
    result: Skills
}

export default function AddSkillsForm({skillsModalOpen, closeSkillsModal, onAddSkill} : any){
    const [type, setskillType] = useState("")
    const [skillTypeError, setskilltyperror] = useState("")
    const [skill, setskill] = useState("")
    const [skillError, setskillerror] = useState("")
    const [level, setlevel] = useState("")
    const [levelError, setlevelerror] = useState("")
    const [skillsOptions, setSkillsOptions] = useState<string[]>([])
    const [skillOptionsLoading, setSkillOptionsLoading] = useState<boolean>(false)

    type Inputs = {
        skillType:string,
        skill:string,
        skillLevel:string
    }

    const {handleSubmit, reset, watch, formState:{errors}, control, register} = useForm<Inputs>({
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

            if(result?.success){
                const fetchedSkills = result?.result?.skills || [];
                // Map correctly based on API response structure (handling objects or strings)
                const mappedSkills = fetchedSkills.map((s: any) => {
                    return typeof s === 'string' ? s : (s?.skill || s?.skills || s?.name);
                }).filter((s: any) => s && typeof s === 'string');
                setSkillsOptions(mappedSkills);
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setSkillOptionsLoading(false)
        }
    }, [])

    const debounceFetchSkillsSuggestions = (fn: Function, delay: number) => {
        let timer: any
        return function(...args: any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }

    const debounce = useMemo(() => {
        return debounceFetchSkillsSuggestions(fetchSkillSuggestions, 400)
    }, [fetchSkillSuggestions])

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
    }


    async function addSkill(){
        setLoading(true)
        const {skill, skillLevel, skillType} = watch()
               
        try {
            const result: AddSkillResponsePayload = await addUserSkill(skillType, skill, skillLevel)
           // closeSkillsModal()
            if(result.success){
                console.log('--checking skill return --', result.result)
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowOutsideClick:false,
                    timer:2000,
                }).then(() => {
                    onAddSkill(result.result)
                    //onAddSkill(skill, type, level)
                })
            }else{
                Notify.failure('Something went wrong', {timeout: 2000})
            }
        } catch (error : unknown) {
            console.log(error)
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
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


    return(
        <>
            <Modal open={skillsModalOpen} onClose={closeSkillsModal}>
        <Box sx={style}>
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
            
          </Box>
    
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth error={Boolean(errors.skillLevel)}>
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

          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <Button type="submit" variant="contained" loading={loading} fullWidth>Add Skill</Button>
          </Box>
          </form>
        </Box>
      </Modal>
        </>
    )
}