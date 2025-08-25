import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { candidateService } from "../../../services/commonServices";

export default function AddSkillsForm({token, skillsModalOpen, closeSkillsModal} : any){
    const [type, setskillType] = useState("")
    const [skillTypeError, setskilltyperror] = useState("")
    const [skill, setskill] = useState("")
    const [skillError, setskillerror] = useState("")
    const [level, setlevel] = useState("")
    const [levelError, setlevelerror] = useState("")

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
        
        try {
            let response = await candidateService.addSkill(token, type, skill, level)

            if(response.status === 401){
                const newAccessToken = await candidateService.refreshToken()
                response = await candidateService.addSkill(newAccessToken, type, skill, level)
            }
            
            const result = await response.json()
            closeSkillsModal()
            if(result.success){
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowOutsideClick:false,
                    timer:2000,
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
                    text:error?.message
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
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Skill Type</label>
            <select value={type} onChange={(event) => setskillType(event.target.value)} name="" id="" className="border border-gray-400 w-full rounded p-2">
                <option value="">--Select Type--</option>
                <option value="Technical-Skill">Technical Skill</option>
                <option value="Soft-Skill">Soft Skill</option>
            </select>
            <label htmlFor="" className="error-label">{skillTypeError}</label>
          </Box>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Skill</label>
            <input value={skill} onChange={(event) => setskill(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{skillError}</label>
          </Box>
    
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Location Type</label>
            <select value={level} onChange={(event) => setlevel(event.target.value)} name="" id="" className="border border-gray-400 w-full rounded p-2">
                <option value="">--Select Level--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="professional">Professional</option>
                <option value="advanced">Advanced</option>
            </select>
            <label htmlFor="" className="error-label">{levelError}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button onClick={validateAddSkill} className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
          </Box>
        </Box>
      </Modal>
        </>
    )
}