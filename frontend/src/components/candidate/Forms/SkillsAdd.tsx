import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { candidateService } from "../../../services/commonServices";
import { Controller, useForm } from "react-hook-form";
import { addCandidateSkill } from "../../../services/candidateServices";

export default function AddSkillsForm({token, skillsModalOpen, closeSkillsModal, onAddSkill, onRemoveSkill} : any){
    const [type, setskillType] = useState("")
    const [skillTypeError, setskilltyperror] = useState("")
    const [skill, setskill] = useState("")
    const [skillError, setskillerror] = useState("")
    const [level, setlevel] = useState("")
    const [levelError, setlevelerror] = useState("")

    type Inputs = {
        skillType:string,
        skill:string,
        skillLevel:string
    }

    const {handleSubmit, watch, formState:{errors}, control, register} = useForm<Inputs>()

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

    function validateAddSkill(){
        const skilltyperror = !type || false
        const skillerror = !skill || !/^[A-Za-z][A-Za-z\s\-_]{1,49}$/.test(skill) || false
        const levelerror = !level || false

        skilltyperror ? setskilltyperror('Select Skill type') : setskilltyperror("")
        skillerror ? setskillerror('Enter a valid skill') : setskillerror('')
        levelerror ? setlevelerror('Select skill level') : setlevelerror('')

        if(skilltyperror || skillerror || levelerror){
            return
        }

        addSkill()
    }


    async function addSkill(){
        console.log(watch())
        const {skill, skillLevel, skillType} = watch()
               
        try {
            const result = await addCandidateSkill(skillType, skill, skillLevel)
            closeSkillsModal()
            if(result.success){
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowOutsideClick:false,
                    timer:2000,
                }).then(() => {
                    onAddSkill(skill, type, level)
                    closeSkillsModal()
                })
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:result?.message
                })
            }
        } catch (error : unknown) {
            console.log(error)
            if(error instanceof Error){
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    //text:error?.message
                })
            }
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

            {/* <label htmlFor="" className="block">Skill Type</label>
            <select value={type} onChange={(event) => setskillType(event.target.value)} name="" id="" className="border border-gray-400 w-full rounded p-2 text-sm text-gray-500 outline-none">
                <option value="">--Select Type--</option>
                <option value="Technical-Skill">Technical Skill</option>
                <option value="Soft-Skill">Soft Skill</option>
            </select>
            <label htmlFor="" className="error-label">{skillTypeError}</label> */}
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <TextField fullWidth {...register('skill', {
                required:{value:true, message:'Please enter skill'},
                minLength:{value:2, message:'Minimum 2 charecters'},
                maxLength:{value:30, message:'Maximum 30 charecters'}
            })}
            variant="outlined"
            label="Skill"
            error={Boolean(errors.skill)}
            helperText={errors.skill?.message}
            />
            {/* <label htmlFor="" className="block">Skill</label>
            <input value={skill} onChange={(event) => setskill(event.target.value)} type="text" name="name" id="name" className="outline-none border !border-gray-400 outline-none w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{skillError}</label> */}
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

            {/* <label htmlFor="" className="block">Location Type</label>
            <select value={level} onChange={(event) => setlevel(event.target.value)} name="" id="" className="border border-gray-400 outline-none text-sm text-gray-500 w-full rounded p-2">
                <option value="">--Select Level--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="professional">Professional</option>
                <option value="advanced">Advanced</option>
            </select>
            <label htmlFor="" className="error-label">{levelError}</label> */}
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button type="submit" className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
          </Box>
          </form>
        </Box>
      </Modal>
        </>
    )
}