import { AxiosError, HttpStatusCode} from "axios";
import axios from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import Swal from "sweetalert2";
import { Recruiter } from "../types/entityTypes";
import { RecruiterEndPoints } from "../constants/endPoints/recruiter.endpoints";
import { toast } from "react-toastify";

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
   formData: FormData
) => {
    try {
        const response = await axiosInstance.post(RecruiterEndPoints.REGISTER_RECRUITER, formData,
            {
                sendAuthToken: true
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
        const response = await axiosInstance.get(RecruiterEndPoints.RECRUITER_DASHBOARD, {
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
        const response = await axiosInstance.post(RecruiterEndPoints.SCHEDULE_INTERVIEW(candidateId, jobId),
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

export const postJob = async (
    {
        jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location, minSalary, maxSalary, salaryCurrency, 
        salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt
    }: any,
) => {
    try {
        const response = await axiosInstance.post(RecruiterEndPoints.POST_A_JOB, {
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
        const response = await axiosInstance.delete(RecruiterEndPoints.DELETE_MY_JOB(jobId),
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
        const response = await axiosInstance.get(RecruiterEndPoints.GET_MY_JOBS,
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

export const getPostedJobDetails = async (jobId: string) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_POSTED_JOB_DETAILS(jobId),
            {
                sendAuthToken:true,
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

export const getRecentJobs = async () => {
    try {
        const response = await axiosInstance.get('/recruiter/recent/jobs',
            {
                sendAuthToken:true,
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

export const getApplicationDetails = async (jobId : string, search: string, page: number, limit: number, status: string) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_JOB_APPLICATIONS_BY_ID(jobId), {
            params:{search, page, limit, status},
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

export const getSingleApplicationDetails = async (applicationId: string) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_JOB_APPLICATION_DETAILS_BY_APPLICATION_ID(applicationId), 
        {
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
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
                sendAuthToken:true
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
    // toast.info(`inside the service application id ${applicationId}`)
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.UPDATE_CANDIDATE_NOTE(applicationId), {
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

export const addCompany = async (name: string, linkedin: string, website: string, industry: string, slogan: string, description: string, location: string) => {
    try {
        const response = await axiosInstance.post(RecruiterEndPoints.ADD_COMPANY, {
            name, linkedin, website,industry, slogan, description, location 
        },
        {
            headers: {'Content-Type': 'application/json'},
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const getCompaniesList = async (search: string) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_COMPANY_LIST,
            {
                params:{search},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}


export const updateJobApplicationStatus = async (
    applicationId: string, status: string, candidateName: string, candidateEmail: string, jobTitle: string
) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.UPDATE_JOB_APPLICATION_STATUS(applicationId),
            {status, candidateName, candidateEmail, jobTitle},
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

export const recruiterFetchJobLevelLists = async () => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_JOBLEVEL_LIST,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('--Error occured--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const recruiterFetchJobTypeLists = async () => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_JOBTYPE_LIST,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('--Error occured--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const recruiterFetchWorkModeLists = async () => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_WORKMODE_LIST,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('--Error occured--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const loadRecruiterApplications = async (page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.LOAD_ALL_RECRUITER_APPLICATIONS, {
            params:{page, limit},
            sendAuthToken:true
        } as AxiosRequest

        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const rejectRecruiterApplication = async (recruiterId: string, reason: string, feedback? : string) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.REJECT_RECRUITER_APPLICATION(recruiterId), 
            {reason, feedback},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const approveRecruiterApplication = async (recruiterId: string) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.REJECT_RECRUITER_APPLICATION(recruiterId), {},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}


export const getRecruiters = async (search: string, page: number, sort : string, recruiterType: string, recruiterStatus: string) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.LOAD_ALL_RECRUITERS, {
            params:{search, page, sort, recruiterType, recruiterStatus},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting company details', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const getRecruiterDetails = async (recruiterId: string) => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.LOAD_RECRUITER_DETAILS_BY_ID(recruiterId), {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting company details', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const handleRecruiterVerification = async (recrutierId: string, action: "Verified" | "Revoked") => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.HANDLE_RECRUITER_VERIFICATION(recrutierId), null, {
            params:{action},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while blocking the candidate', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError  && err.response.status !== HttpStatusCode.Forbidden) throw error

        
    }
}

export const handleRecruiterPermissions = async (recrutierId: string, action: "Revoke" | "Un-Revoke") => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.HANDLE_RECRUITER_PERMISSIONS(recrutierId), null, {
            params:{action},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while blocking the candidate', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError  && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const changeStatusToUnderReview = async (applicationId: string) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.CHANGE_STATUS_UNDER_REVIEW(applicationId), null,
        {
            sendAuthToken: true
        } as AxiosRequest
    )
    return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('--Error occured--', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}