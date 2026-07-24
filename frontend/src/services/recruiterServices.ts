import { AxiosError, HttpStatusCode} from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import { RecruiterEndPoints } from "../constants/endPoints/recruiter.endpoints";
import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints";
import { Dayjs } from "dayjs";


export const createRecruiterService = async (
   formData: FormData
) => {
    try {
        const response = await axiosInstance.post(RecruiterEndPoints.REGISTER_RECRUITER, formData,
            {
                sendAuthToken: true,
                headers: {}
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
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occured while recruiter login', err)
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
    }: {
        jobTitle: string,
        description: string,
        requirements: string,
        responsibilities: string,
        duration: string,
        jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary' | '',
        workMode: 'On-site' | 'Remote' | 'Hybrid' | '',
        location: string,
        minSalary: number | '',
        maxSalary: number | '',
        salaryCurrency: string,
        salaryPeriod: 'annually' | 'monthly' | 'weekly' | 'hourly' | '',
        vacancies: number | '',
        qualification: string,
        experienceInYears: number | '',
        jobLevel: 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Lead' | 'Manager' | '',
        requiredSkills: string[],
        optionalSkills: string[],
        expiresAt: Dayjs | Date | string | null;
    },
) => {
    try {
        const response = await axiosInstance.post(RecruiterEndPoints.POST_A_JOB, {
            jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location, minSalary, maxSalary, salaryCurrency,
            salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt
        },
        {   
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
    }: {
        _id: string,
        recruiterId: string,
        jobTitle: string,
        description: string,
        requirements: string, 
        responsibilities: string,
        duration: string, 
        jobType: string, 
        workMode: string,
        location: string, 
        minSalary: string | number,
        maxSalary: string | number,
        salaryCurrency: string,
        salaryPeriod: string,
        vacancies: string | number,
        qualification: string, 
        experienceInYears: number, 
        jobLevel: string,
        requiredSkills: string[],
        optionalSkills: string[],
        expiresAt: string | Date
    },
) => {
    try {
        const response = await axiosInstance.put(JobsEndpoints.RECRUITER.EDIT_JOB, 
            {
                _id, recruiterId, jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location,
                salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt,
                minSalary, maxSalary, salaryCurrency
            },
            {
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
        const response = await axiosInstance.get(JobsEndpoints.RECRUITER.GET_RECENT_JOBS,
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

export const rejectCandidateJobApplication = async (title : string, description : string, type : string, relatedId : string, applicationId : string, candidateId : string) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.REJECT_CANDIDATE_APPLICATION(applicationId),
            {title, description, type, candidateId, relatedId},
            {   
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
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.UPDATE_CANDIDATE_NOTE(applicationId), {
            notes
        },
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

export const addCompany = async (name: string, linkedin: string, website: string, industry: string, slogan: string, description: string, location: string) => {
    try {
        const response = await axiosInstance.post(RecruiterEndPoints.ADD_COMPANY, {
            name, linkedin, website,industry, slogan, description, location 
        },
        {
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

export const updateJobApplicationStatus = async (
    applicationId: string, status: string, candidateName: string, candidateEmail: string, jobTitle: string
) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.UPDATE_JOB_APPLICATION_STATUS(applicationId),
            {status, candidateName, candidateEmail, jobTitle},
            {
                sendAuthToken:true,
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
        const response = await axiosInstance.patch(RecruiterEndPoints.APPROVE_APPLICATION_BY_ID(recruiterId), {},
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
        const response = await axiosInstance.patch(RecruiterEndPoints.HANDLE_RECRUITER_VERIFICATION(recrutierId), {}, {
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
        const response = await axiosInstance.patch(RecruiterEndPoints.HANDLE_RECRUITER_PERMISSIONS(recrutierId), {}, {
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
        const response = await axiosInstance.patch(RecruiterEndPoints.CHANGE_STATUS_UNDER_REVIEW(applicationId), {},
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

export const verifyBeforePostingJob = async () => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.CHECK_VERIFICATION_STATUS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const verifyBeforeEditJob = async () => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.CHECK_EDIT_JOB_VERIFICATION_STATUS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const verifyBeforeManageApplications = async () => {
    try {
        const response = await axiosInstance.get(RecruiterEndPoints.CHECK_MANAGE_APPLICATIONS_VERIFICATIONS_STATUS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const manageRecruiterPermissions = async (
  recruiterId: string,
  isAllJobsHidden: boolean,
  allowPostJobs: boolean,
  allowEditJobs: boolean,
  allowDeletePosts: boolean,
  allowManageApplications: boolean,
  allowScheduleInterviews: boolean,
) => {
    try {
        const response = await axiosInstance.patch(RecruiterEndPoints.MANAGE_RECRUITER_PERMISSIONS(recruiterId),
        {isAllJobsHidden, allowPostJobs, allowEditJobs, allowDeletePosts, allowManageApplications, allowScheduleInterviews},
        {
            sendAuthToken: true,
        } as AxiosRequest
    )

    return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while managing recruiter permissions', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}