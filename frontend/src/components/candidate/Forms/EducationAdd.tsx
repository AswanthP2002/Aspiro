import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { higherSecondaryEducation, bachelorsDegree, mastersDegree, diploma } from "../../../assets/data/educationalStreamsData";
import Swal from "sweetalert2";
import { addCandidateEducation } from "../../../services/candidateServices";

export default function AddEducationForm({educationModalOpen, closeEducationModal} : any){

    const [educationLevel, setEducationLevel] = useState("")
    const [educationLevelError, setEducationLevelError] = useState("")
    const [educationStream, setEducationStream] = useState("")
    const [educationStreamError, setEducationStreamError] = useState("")
    const [educationInstitution, setEducationInstitution] = useState("")
    const [educationInstitutionError, setEducationInstituitonError] = useState("")
    const [isPresent, setIspresent] = useState(false)
    const [startYear, setStartDate] = useState("")
    const [startDateError, setStartDateError] = useState("")
    const [endYear, setEndDate] = useState("")
    const [endDateError, setEndDateError] = useState("")
    const [location, setLocation] = useState("")
    const [locationError, setLocationError] = useState("")

    const toggleIsPresent = () => {
        setIspresent(prev => !prev)
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

    function validateForm() : boolean{
        const educationlevelerror = !educationLevel || false
        const educationstreamerror = !educationStream || !/^[A-Za-z.&-]+(?: [A-Za-z.&-]+)*$/.test(educationStream) || false
        const educationinstitutionerror = !educationInstitution || !/^[A-Za-z0-9 .&'()-]{2,100}$/.test(educationInstitution) || false
        const startdateerror = !startYear || false
        let enddaterror = false
        if(endYear){
            enddaterror = !endYear || false
        }
        const locationerror = !location || !/^[A-Za-z .'-]{2,50}(, [A-Za-z .'-]{2,50})?$/.test(location) || false

        educationlevelerror ? setEducationLevelError('Please select education level') : setEducationLevelError('')
        educationstreamerror ? setEducationStreamError('Please provide education stream') : setEducationStreamError('')
        educationinstitutionerror ? setEducationInstituitonError('Enter a valid institution name') : setEducationInstituitonError('')
        startdateerror ? setStartDateError('Provide a valid date') : setStartDateError('')
        enddaterror ? setEndDateError('Provide a valid date') : setEndDateError('')
        locationerror ? setLocationError('Provide location') : setLocationError('')

        if(educationlevelerror || educationstreamerror || educationinstitutionerror || startdateerror || enddaterror || locationerror){
            return false
        }

        return true
    }

    async function addEducation(){
        const isValidated = validateForm()
        if(!isValidated) return
        closeEducationModal()

            await addCandidateEducation(educationLevel, educationStream, educationInstitution, isPresent, startYear, endYear, location)

                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1500
                }).then(() => window.location.reload())
    }

    return(
        <Modal open={educationModalOpen} onClose={closeEducationModal}>
        <Box sx={style}>
            <div className='w-full flex justify-end'>
                <button onClick={closeEducationModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>Add Education</Typography>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Education Level</label>
            <select name="educationlevel" id="" value={educationLevel} onChange={(event) => setEducationLevel(event.target.value)} className="outline-none border border-gray-400 p-2 w-full rounded">
                <option value="">--Select Education Level--</option>
                <option value="higherSecondary">Higher Secondary</option>
                <option value="bachelors">Bachelors Degree</option>
                <option value="masters">Masters Degree</option>
                <option value="diploma">Diploma</option>
                <option value="other">Other</option>
            </select>
            <label className='error-label'>{educationLevelError}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Stream</label>
            {
                educationLevel === 'other'
                    ? <input type="text" value={educationStream} onChange={(event) => setEducationStream(event.target.value)} className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    : <>
                        <select name="" id="" value={educationStream} onChange={(event) => setEducationStream(event?.target.value)} className="outline-none border border-gray-400 p-2 rounded w-full">
                            <option value="">--Select Education Stream--</option>
                            {
                                educationLevel === 'higherSecondary' && (
                                    higherSecondaryEducation.map((stream, index) => {
                                        return <option key={index} value={stream}>{stream}</option>
                                    })
                                )
                            }
                            {
                                educationLevel === 'bachelors' && (
                                    bachelorsDegree.map((stream, index) => {
                                        return <option key={index} value={stream}>{stream}</option>
                                    })
                                )
                            }
                            {
                                educationLevel === 'masters' && (
                                    mastersDegree.map((stream, index) => {
                                        return <option key={index} value={stream}>{stream}</option>
                                    })
                                )
                            }
                            {
                                educationLevel === 'diploma' && (
                                    diploma.map((stream, index) => {
                                        return <option value={stream} key={index}>{stream}</option>
                                    })
                                )
                            }


                        </select>
                    </>
            }
            <label htmlFor="" className="error-label">{educationStreamError}</label>
          </Box>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Institution</label>
            <input value={educationInstitution} onChange={(event) => setEducationInstitution(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{educationInstitutionError}</label>
          </Box>
          <Box sx={{width:'100%'}}>
            <div className="flex items-center mt-2">
                <input onChange={toggleIsPresent} checked={isPresent ? true : false} type="checkbox" name="name" id="name" className="outline-none border border-gray-400 me-2 rounded" />
                <label htmlFor="">I am currently studying here</label>
            
            </div>
            <label className='error-label'></label>
          </Box>
          <Box sx={{width:'100%', display:'flex', justifyContent:'between', gap:'100px'}}>
            <div className="w-full">
                <label htmlFor="">Start Date</label>
                <input value={startYear} onChange={(event) => setStartDate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label className='error-label'>{startDateError}</label>
            </div>

            <div className="w-full">
                <label htmlFor="">End Date</label>
                <input disabled={isPresent ? true : false} value={endYear} onChange={(event) => setEndDate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label className='error-label'>{endDateError}</label>
            </div>
          </Box>

          <Box sx={{width:'100%'}}>
            <label htmlFor="">Location</label>
            <input value={location} onChange={(event) => setLocation(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{locationError}</label>
          </Box>
          
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button onClick={addEducation} className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
          </Box>
        </Box>
      </Modal>
    )
}