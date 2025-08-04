import { AxiosError } from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import Swal from "sweetalert2";
import { logout } from "../redux-toolkit/candidateAuthSlice";

//const customeCandidateLogout = useCandidateLogout()

export const registerCandiate = async (name: string, email: string, phone: string, username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/register',
            {name, email, phone, username, password},
            {
                headers:{'Content-Type' : 'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occure')
    }
}

export const verify = async (email : any, otp : string) => {
    try {
        const response = await axiosInstance.post('/verify',
            {email, otp},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occured while verifying candidate', err)
    }
}

export const candidateLogin = async (email : string, password : string) => {
    try {
        const response = await axiosInstance.post('/login', 
            {email, password},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )
    
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occured while candidate login', err)
    }
}

export const candidateLogout = async (dispatch : Function, navigate : Function) => {
    try {
        const response = await axiosInstance.post('/candidate/logout', null,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        Swal.fire({
            icon:'info',
            title:'Logout Successfull',
            showConfirmButton:false,
            showCancelButton:false,
            allowOutsideClick:false,
            timer:3000
        }).then(() => { //calling to clear candidate from redux candidateAuthSlice then navigate to login
            dispatch(logout()) 
            navigate('/login')
        })

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.data){
            const {message} : any = err.response.data
            Swal.fire({
                icon:'error',
                title:'Error',
                text:message
            })
        }
    }
}

export const saveBasicDetails = async (jobRole: string, city: string, district: string, state: string, country: string, pincode: string, summary: string) => {
    try {
        const response = await axiosInstance.post('candidate/personal/details/save',
            {jobRole, city, district, state, country, pincode, summary},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data

    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.data){
            const {message} : any = err.response.data

            Swal.fire({
                icon:'error',
                title:'Error',
                text:message
            })
        }
        console.log('Error occured while saving basic details', )
    }
}

export const getCandidateProfileData = async () => {
    try {
        const response = await axiosInstance.get('candidate/profile/personal/datas',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            return err.response.data
        }

        console.log('Error occured while geting candidate profile data', err)
    }
}

export const editCandidateProfile = async (name: string, role: string, city: string, district: string, state: string, country: string, about: string) => {
    try {
        const response = await axiosInstance.patch('/candidate/profile',
            {name, role, city, district, state, country, about},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
        
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while editing candidate data', err)
    }
}

export const getCandidateExperience = async () => {
    try {
        const response = await axiosInstance.get('/candidate/experience',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate experiences', err)
    }
}

export const getCandidateSkills = async () => {
    try {
        const response = await axiosInstance.get('/candidate/skills',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate skills', err)
    }
}

export const getCandidateEducation = async () => {
    try {
        const response = await axiosInstance.get('/candidate/education',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate education', err)
    }
}

export const addCandidateExperience = async (role: string, jobtype: string, location: string, locationtype: string, organization: string, ispresent: boolean, startdate: string, enddate: string) => {
    try {
        const response = await axiosInstance.post('/candidate/experience/add',
            {role, jobtype, location, locationtype, organization, ispresent, startdate, enddate},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while adding candidat experience', err)
    }
}

export const editCandidateExperience = async (experienceId: string, editableRole: string, editableJobType: string, editableOrganization: string, editableIsPresent: boolean, editableStartDate: string, editableEndDate: string, editableLocation: string, editableLocationType: string) => {
    try {
        const response = await axiosInstance.put(`/candidate/experience/edit/${experienceId}`,
            {editableRole, editableJobType, editableOrganization, editableIsPresent, editableStartDate, editableEndDate, editableLocation, editableLocationType},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate experience', err)
    }
}

export const deleteCandidateExperience = async (expId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/experience/${expId}`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting experience', err)
    }
}

export const deleteCandidateSkills = async (skillId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/skills/${skillId}`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        console.log('Error occured while deleting skills', err)
    }
}

export const addCandidateEducation = async (level : string, stream : string, organization : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.post('/candidate/education/add',
            {level, stream, organization, isPresent, startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while adding candidate education', err)
    }
}

export const editCandidateEducation = async (educationId : string, level : string, stream : string, organization : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.put(`/candidate/education/${educationId}`,
            {level, stream, organization, isPresent, startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate education', err)
    }
}

export const deleteCandidateEducation = async (educationId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/education/${educationId}`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting education data', err)
    }
}

export const addCandidateResume = async (formData : any) => {
    try {
        const response = await axiosInstance.post('/candidate/resume/upload',formData,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while adding resume', err)
    }
}

export const loadCandidateResumes = async () => {
    try {
        const response = await axiosInstance.get('/candidate/resumes',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while loading candidate resumes', err)
    }
}

export const deleteCandidateResume = async (resumeId : string, cloudinaryPublicId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/resume/${resumeId}`,
            {
                params:{cloudinaryPublicId},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting resume', err)
    }
}

export const addCandidateCertificates = async (formData : any) => {
    try {
        const response = await axiosInstance.post('/candidate/certificate', formData,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while adding candidate certificates', err)
    }
}

export const loadCandidateCertificates = async () => {
    try {
        const response = await axiosInstance.get('/candidate/certificate', 
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate certificates', err)
    }
}

export const refreshCandidateToken = async () => {
    try {
        const response = await axiosInstance.get('/candidate/token/refresh')
        return response.data?.accessToken
    } catch (error : unknown) {
        console.log('Error occured while refreshing the token', error)
    }
}

export const candidateApplyJob = async (jobId : string, formData : any) => {
    try {
        const response = await axiosInstance.post(`/candidate/job/${jobId}/apply`, formData, 
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
        
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while applying for job', err)
    }
}