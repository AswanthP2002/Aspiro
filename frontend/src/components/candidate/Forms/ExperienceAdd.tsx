import { Modal, Box, Typography, FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { addCandidateExperience } from "../../../services/candidateServices";
import { Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function AddExperienceForm({experiencemodalopen, closeModal, onAddExperience} : any){
  
  type Inputs = {
    role:string
    jobType:string
    organization:string
    startDate:any
    endDate : any
    location:string
    workMode : string
  }

  const {watch, reset, control, handleSubmit, formState:{errors}} = useForm<Inputs>({

  })
  
  const [role, setrole] = useState("")
    // const [jobtype, setjobtype] = useState("")
    // const [organization, setorganization] = useState("")
    const [ispresent, setispresent] = useState(false)
    // const [startdate, setstartdate] = useState("")
    // const [enddate, setendate] = useState("")
    // const [location, setlocation] = useState("")
    // const [locationtype, setlocationtype] = useState("")
    const [roleError, setrolerror] = useState("")
    const [jobeTypeError, setjobtypeerror] = useState("")
    const [startdateError, setstartdateerror] = useState("")
    const [endDateError, setenddateerror] = useState("")
    const [organizationError, setorganizationerror] = useState("")
    const [locationError, setlocationerror] = useState("")
    const [locationTypeError, setlocationtyperror] = useState("")

    // async function validateExperienceAddingForm(){
    //         const roleerror = !role || !/^[a-zA-Z\s]{2,50}$/.test(role) || false
    //         const organizationerror = !organization || !/^[a-zA-Z0-9\s\.,&-]{2,100}$/.test(organization) || false
    //         const jobtypeerror = !jobtype || false
    //         const startdateerror = !startdate || false
    //         let enddateerror = false
    //         const locationerror = !location || !/^[a-zA-Z\s,]{2,100}$/.test(location) || false
    //         const locationtypeerror = !locationtype
    
    //         if(!ispresent){
    //             enddateerror = !enddate || false
    //         }
    
    //         roleerror ? setrolerror('Please enter a valid job role') : setrolerror("")
    //         jobtypeerror ? setjobtypeerror('Please select job type') : setjobtypeerror("")
    //         organizationerror ? setorganizationerror('Please enter a valid organization name') : setorganizationerror("")
    //         startdateerror ? setstartdateerror('Please provide a starting date') : setstartdateerror("")
    //         enddateerror ? setenddateerror('Please provide a ending date') : setenddateerror("")
    //         locationerror ? setlocationerror('Please provide company location') : setlocationerror("")
    //         locationtypeerror ? setlocationtyperror('Please select location type') : setlocationtyperror("")

    //         if(roleerror || jobtypeerror || organizationerror || startdateerror || enddateerror || locationerror || locationTypeError){
    //             closeModal() //close form before sweet alert
    //             Swal.fire({
    //                 icon:'error',
    //                 title:'Test',
    //                 text:'Validation fails'
    //             }).then(() => window.location.reload())


    //             return
    //         }

    //         await addExperience()
    // }
    
        async function addExperience(){
          alert('validation success')
          console.log(watch())
          const {role, jobType, organization, startDate, endDate, location, workMode, } = watch()
    
                const result = await addCandidateExperience(role, jobType, location, workMode, organization, ispresent, startDate.format("YYYY-MM-DD"), endDate ? endDate.format("YYYY-MM-DD") : "")
                closeModal()//closing form
                // reset({
                //   role:"",
                //   jobType:"",
                //   organization:"",
                //   startDate:"",
                //   endDate:"",
                //   location:"",
                //   workMode:""
                // })
                    Swal.fire({
                        icon:'success',
                        title:'Added',
                        text:result?.message,
                        showConfirmButton:false,
                        showCancelButton:false,
                        timer:3000
                    }).then(() => {
                      onAddExperience({role, jobType, location, workMode, organization, ispresent, startDate, endDate})
                    })
        }

    function toggleIsPresent(){
        setispresent(prevState => !prevState)
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
            {/* <label htmlFor="">Organization</label>
            <input value={organization} onChange={(event) => setorganization(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{organizationError}</label> */}
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <FormControlLabel
              control={<Checkbox
                  defaultChecked={ispresent ? true : false}
                  onChange={toggleIsPresent}
                />}
              label="Im currently working here"
            />
            {/* <div className="flex items-center mt-2">
                <input onChange={toggleIsPresent} checked={ispresent ? true : false} type="checkbox" name="name" id="name" className="outline-none border border-gray-400 me-2 rounded" />
                <label htmlFor="">I am currently working in this role</label>
            
            </div>
            <label className='error-label'></label> */}
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
                  required:{value:ispresent ? false : true, message:'Dates can not be empty'}
                }}
                render={({field}) => {
                  return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                        <DateField error={Boolean(errors.endDate)} {...field} label="End Date" />
                    </DemoContainer>
                  </LocalizationProvider>
                }}
              />
              <FormHelperText>{errors.endDate?.message as string}</FormHelperText>
            </FormControl>
            {/* <div className="w-full">
                <label htmlFor="">Start Date</label>
                <input value={startdate} onChange={(event) => setstartdate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label className='error-label'>{startdateError}</label>
            </div>

            <div className="w-full">
                <label htmlFor="">End Date</label>
                <input disabled={ispresent ? true : false} value={enddate} onChange={(event) => setendate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label className='error-label'>{endDateError}</label>
            </div> */}
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
            {/* <label htmlFor="">Location</label>
            <input value={location} onChange={(event) => setlocation(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{locationError}</label> */}
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
            {/* <label htmlFor="">Location Type</label>
            <select value={locationtype} onChange={(event) => setlocationtype(event.target.value)} name="" id="" className="border border-gray-400 outline-none text-sm text-gray-500 w-full rounded p-2">
                <option value="">--Select Type--</option>
                <option value="In-office">In-office</option>
                <option value="Remote">Remote</option>
            </select>
            <label htmlFor="" className="error-label">{locationTypeError}</label> */}
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button type="submit" className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
          </Box>
          </form>
        </Box>
      </Modal>
    )
}