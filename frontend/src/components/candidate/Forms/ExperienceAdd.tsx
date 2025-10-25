import { Modal, Box, Typography, FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Checkbox, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import { addUserExperience } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Dayjs } from "dayjs";

export default function AddExperienceForm({experiencemodalopen, closeModal, onAddExperience} : any){
  
  type Inputs = {
    role:string
    jobType:string
    organization:string
    startDate:Dayjs
    endDate : any
    location:string
    workMode : string
    isPresent: boolean 
  }

  const {watch, reset, control, handleSubmit, formState:{errors}} = useForm<Inputs>({
    defaultValues:{
      role:'',
      jobType:'',
      organization:'',
      location:'',
      workMode:'',
      isPresent:false
    }
  })
      
        async function addExperience(data : Inputs){
          const {role, jobType, organization, startDate, endDate, location, workMode, isPresent } = data
          console.log(data)
          const formatedStartDate = startDate.format("YYYY-MM-DD")
          const formatedEndDate = endDate ? endDate.format("YYYY-MM-DD") : ""
                const result = await addUserExperience(role, jobType, location, workMode, organization, isPresent, formatedStartDate, formatedEndDate)
                closeModal()//closing form
                    Swal.fire({
                        icon:'success',
                        title:'Added',
                        text:result?.message,
                        showConfirmButton:false,
                        showCancelButton:false,
                        timer:3000
                    }).then(() => {
                      onAddExperience({role, jobType, location, workMode, organization, isPresent, startDate:formatedStartDate, endDate:formatedEndDate})
                      reset({
                        jobType:'',
                        role:'',
                        organization:'',
                        startDate:'',
                        endDate:'',
                        location:'',
                        workMode:'',
                        isPresent:false
                      })
                    })
        }

    const currentWorkingStatus = watch('isPresent')
    
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
        <Modal open={experiencemodalopen} onClose={closeModal}>
        <Box sx={style}>
            <div className='w-full flex justify-end'>
                <button onClick={closeModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>Add Experience</Typography>
          <form onSubmit={handleSubmit(addExperience)}>
          <Box sx={{width:'100%'}}>
            <FormControl fullWidth>
              <Controller 
                name="role"
                control={control}
                rules={{
                  required:{value:true, message:'Please enter job role'},
                  minLength:{value:3, message:'Minimum 3 charecters'},
                  maxLength:{value:50, message:'Maximum 50 charecters'},
                  pattern:{value:/^[a-zA-Z0-9\s.,&()/-]{2,100}$/, message:'Please enter a valid job role'}
                }}
                render={({field}) => {
                  return <TextField
                    {...field}
                    label="Job Role"
                    variant="outlined"
                    error={Boolean(errors.role)}
                    helperText={errors.role?.message}
                  />
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth error={Boolean(errors.jobType)}>
              <InputLabel id="employment-type-label">Employment Type</InputLabel>
              <Controller
                name="jobType"
                control={control}
                rules={{
                  required:{value:true, message:'Please select employment type'}
                }}
                render={({field}) => {
                  return <Select {...field} labelId="employment-type-label" label="Employment Type">
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                  </Select>
                }}
              />
              <FormHelperText>{errors.jobType?.message}</FormHelperText>
            </FormControl>
          
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth>
              <Controller
                name="organization"
                control={control}
                rules={{
                  required:{value:true, message:'Organization name can not be empty'},
                  minLength:{value:3, message:'Minimum 3 charecters'},
                  maxLength:{value:50, message:'Maximum 50 charecters'}
                }}
                render={({field}) => {
                  return <TextField variant="outlined" label="Organization" {...field}
                    error={Boolean(errors.organization)}
                    helperText={errors.organization?.message}
                  />
                }}
              />
            </FormControl>
            
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <Controller
              name="isPresent"
              control={control}
              render={({field}) => {
                return <FormControlLabel
                  control={
                    <Checkbox {...field} checked={field.value} />
                  }
                  label="I am currently working here"
                />
              }}
            />
            
          </Box>
          <Box sx={{width:'100%', display:'flex', gap:'20px'}}>
            <FormControl fullWidth error={Boolean(errors.startDate)}>
              <Controller
              name="startDate"
                control={control}
                rules={{
                  required:{value:true, message:'Dates can not be emtpy'}
                }}
                render={({field}) => {
                  return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                        <DateField error={Boolean(errors.startDate)} {...field} label="Start Date" />
                    </DemoContainer>
                  </LocalizationProvider>
                }}
              />
              <FormHelperText>{errors.startDate?.message as string}</FormHelperText>
            </FormControl>
            <FormControl fullWidth error={Boolean(errors.endDate)}>
              <Controller
              name="endDate"
                control={control}
                rules={{
                  required:{value:currentWorkingStatus ? false : true, message:'Dates can not be empty'}
                }}
                render={({field}) => {
                  return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                        <DateField disabled={currentWorkingStatus} error={Boolean(errors.endDate)} {...field} label="End Date" />
                    </DemoContainer>
                  </LocalizationProvider>
                }}
              />
              <FormHelperText>{errors.endDate?.message as string}</FormHelperText>
            </FormControl>
            
          </Box>

          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth>
              <Controller
                name="location"
                control={control}
                rules={{
                  required:{value:true, message:'Location name can not be empty'},
                  minLength:{value:3, message:'Minimum 3 charecters'},
                  maxLength:{value:50, message:'Maximum 50 charecters'},
                  pattern:{value:/^[\w\s-]+(?:,\s*[\w\s-]+){0,3}$/, message:'Please enter a valid location'}
                }}
                render={({field}) => {
                  return <TextField label="Location" variant="outlined"
                    {...field}
                    error={Boolean(errors.location)}
                    helperText={errors.location?.message}
                  />
                }}
              />
            </FormControl>
            
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControl fullWidth error={Boolean(errors.workMode)}>
              <InputLabel id="work-mode-label">Work Mode</InputLabel>
              <Controller
                name="workMode"
                control={control}
                rules={{
                  required:{value:true, message:'Please select work mode'}
                }}
                render={({field}) => {
                  return <Select {...field} label="Work Mode" labelId="work-mode-label">
                    <MenuItem value="In-office">In-office</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                  </Select>
                }}
              />
              <FormHelperText>{errors.workMode?.message as string}</FormHelperText>
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