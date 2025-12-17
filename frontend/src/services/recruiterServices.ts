import { AxiosError, AxiosInterceptorManager } from "axios";
import axios from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import Swal from "sweetalert2";
import { Recruiter } from "../types/entityTypes";

//legacy
export const recruiterRegister = async (fullName : string, email : string, phone : string, password : string) => {
    try {
        const response = await axiosInstance.post('/recruiter/register',
            {fullName, email, phone, password},
            {
                headers:{'Content-Type' : 'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response?.status < 500) return err.response.data

        console.log('Error occured while recruiter registering', err)
    }
}

export const createRecruiterService = async (
    employerType: string, industry: string, organizationName: string, organizationType: string,
    teamStrength: string, summary: string, website: string, organizationContactNumber: string, 
    organizationEmail: string, focusingIndustries: any[], recruitingExperience: string, 
    linkedinUrl: string
) => {
    try {
        const response = await axiosInstance.post('/recruiter/create', {
            employerType, industry, organizationName,
            focusingIndustries, summary, recruitingExperience, linkedinUrl,
            organizationType, teamStrength, website, 
            organizationContactNumber, organizationEmail
        },
        {
            headers:{'Content-Type':'application/json'},
            sendAuthToken:true
        } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw error
        }
    }
}

export const recruiterLogin = async (email : string, password : string) => {
    try {
        const response = await axiosInstance.post('recruiter/login', 
            {email, password},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occured while recruiter login', err)
    }
}

export const saveIntroDetails = async (recruiterDetails : Recruiter) => {
    try {
        const response = await axiosInstance.post('/recruiter/intro/details',
            recruiterDetails,
            {
                headers:{'Content-Type' : 'application/json'},
                sendAuthToken:true
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

        console.log('Error occured while saving basic details', err)
    }
}

export const addLogoCloudinary = async (logoFormData : any) => {
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dfb0unqh6/image/upload', logoFormData)
        return response.data
    } catch (error : unknown) {
        if(error instanceof Error){
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error.message
            })
        }

        console.log('Error occured while saving logo into cloudinary', error)

    }
}

export const addCoverPhotoCloudinary = async (coverFormData : any) => {
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dfb0unqh6/image/upload', coverFormData)
        return response.data
    } catch (error : unknown) {
        if(error instanceof Error){
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error.message
            })
        }

        console.log('Error occured while saving coverphoto into cloudinary', error)
    }
}

export const logoutRecruiter = async () => {
    try {
        const response = await axiosInstance.post('/recruiter/logout', null, {
            sendAuthTokenRecruiter:true
        } as AxiosRequest)

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

        console.log('Error occured while recruiter logout', err)
    }
}

export const getProfileOverview = async () => {
    try {
        const response = await axiosInstance.get('/recruiter/profile/overview', {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

       if(err.response && err.response.status < 500 && err.response.status !== 403){
        throw error
       }

        console.log('Error occured while geting the profile overview', err)
    }
}

export const scheduleInterview = async (
    candidateId: string, jobId: string,
    interviewType: string, interviewersName: string,
    interviewDate: string,
    interviewTime: string,
    gmeetUrl: string,
    note?: string
) => {
    try {
        const response = await axiosInstance.post(`/recruiter/schedule-interview/${candidateId}/job/${jobId}/`,
            {
                interviewType, interviewersName, interviewDate, interviewTime, gmeetUrl, note
            },
            {
                sendAuthToken:true,
                headers:{"Content-Type":'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        console.log('--- error occured while scheduling interview ---', err)

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

/**
 * _id?: string
    candidateId?: string
    jobId?: string
    interviewersName?: string
    interviewType?: 'Technical' | 'HR' | 'Mnaegirial' | 'General'
    interviewDate?: string | Date
    interviewTime?: string
    gmeetUrl?: string
    note?: string
    status?: "Scheduled" | "Completed" | "Cancelled"
    createdAt?: string | Date
    upddatedAt?: string | Date
 */

export const postJob = async (
    {
        jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location, minSalary, maxSalary, salaryCurrency, 
        salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt
    }: any,
) => {
    try {
        const response = await axiosInstance.post('/recruiter/job/create', {
            jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location, minSalary, maxSalary, salaryCurrency,
            salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt
        },
        {   headers:{"Content-Type":'application/json'},
            sendAuthToken:true
        } as AxiosRequest
    )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }

        console.log('Error occured while posting a job', err)
    }
}

export const editJob = async (
    {
        _id, recruiterId, jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location, minSalary, maxSalary, salaryCurrency, 
        salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt
    }: any,
) => {
    try {
        const response = await axiosInstance.put('/recruiter/job/edit', 
            {
                _id, recruiterId, jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location,
                salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt,
                minSalary, maxSalary, salaryCurrency
            },
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response?.status < 500 && err.response?.status !== 403){
            throw error
        }
    }
}

export const deleteJob = async (jobId: string) => {
    try {
        const response = await axiosInstance.delete(`/recruiter/job/delete/${jobId}`,
            {sendAuthToken:true} as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response?.status < 500 && err.response?.status !== 403){
            throw error
        }
    }
}

export const getJobs = async (search: string, page: number, limit: number = 3, sortOption: string, filterStatus: string, filterWorkMode: string) => {
    try {
        const response = await axiosInstance.get('/recruiter/jobs',
            {
                sendAuthToken:true,
                params:{
                    search, page, limit, sortOption, filter:JSON.stringify({status:filterStatus, workMode:filterWorkMode})
                }
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }

        
    }
}

export const getApplicationDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(`/recruiter/job/${jobId}/application/details`, {
            sendAuthToken:true
        } as AxiosRequest)
    
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('--error occured while geting job applications--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
} 

export const refreshRecruiterToken = async () => {
    try {
        const response = await axiosInstance.get('/recruiter/token/refresh')
        return response.data?.accessToken
    } catch (error : unknown) {
        console.log('Error occured while refreshig tokene', error)
    }
}

export const rejectJobApplication = async (candidateId : string, applicationId : string, rejectReason : string, message : string = "") => {
    try {
        const response = await axiosInstance.put(`/recruiter/reject/application/${applicationId}/${candidateId}`,
            {reason:rejectReason, message:message},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenRecruiter:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        console.log('Error occured while rejecting application', error instanceof Error ? error.message : null)
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while rejecting application', err)
    }
}

export const finalizeShortList = async (jobId : string, applications : any) => {
    try {
        const response = await axiosInstance.post(`/recruiter/applications/finalize/${jobId}`,
            {applications},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenRecruiter:true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
        
    }
}

export const getFinalizedShortlistData = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(`/recruiter/applications/finalize/${jobId}`,
            {
                sendAuthTokenRecruiter:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log(err)
    }
}

export const getJobApplicationDetails = async (applicationId : string) => {
    try {
        const response = await axiosInstance.get(`/recruiter/application/${applicationId}`, {
            sendAuthTokenRecruiter:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting spcific job application details', err)
        if(err.response && err.response.status < 500 && err.response?.status !== 403){
            return err.response.data
        }
    }
}
// //title:string
//     rejector:string
//     rejectee:string
//     message:string
//     relatedId:string
//     type:string

export const rejectCandidateJobApplication = async (title : string, description : string, type : string, relatedId : string, applicationId : string, candidateId : string) => {
    try {
        const response = await axiosInstance.patch(`/recruiter/reject/application/${applicationId}`,
            {title, description, type, candidateId, relatedId},
            {   
                headers:{'Content-Type':'application/json'},
                sendAuthTokenRecruiter:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        console.log('Error occured while rejecting candidate', error)
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
    }
}

export const updateCandidateNotes = async (applicationId: string, notes: string) => {
    try {
        const response = await axiosInstance.patch(`/recruiter/application/${applicationId}`, {
            notes
        },
        {
            sendAuthToken:true,
            headers:{"Content-Type":'application/json'}
        } as AxiosRequest
    )

    return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}


export const updateJobApplicationStatus = async (
    applicationId: string, status: string, candidateName: string, candidateEmail: string, jobTitle: string
) => {
    try {
        const response = await axiosInstance.patch(`/recruiter/application/${applicationId}/status`,
            {status},
            {
                sendAuthToken:true,
                headers:{"Content-Type":'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}
///// stopped here, need to connect this api with page