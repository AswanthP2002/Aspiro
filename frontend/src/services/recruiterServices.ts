import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import { RecruiterEndPoints } from "../constants/endPoints/recruiter.endpoints";
import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints";
import { Dayjs } from "dayjs";


export const createRecruiterService = async (
   formData: FormData
) => {
        const response = await axiosInstance.post(RecruiterEndPoints.REGISTER_RECRUITER, formData,
            {
                sendAuthToken: true,
                headers: {}
            } as AxiosRequest
        )

        return response.data
}

export const recruiterLogin = async (email : string, password : string) => {
        const response = await axiosInstance.post('recruiter/login', 
            {email, password},
            {
            } as AxiosRequest
        )

        return response.data
} //Need Attention

export const getProfileOverview = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.RECRUITER_DASHBOARD, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
}

export const scheduleInterview = async (
    candidateId: string, jobId: string,
    interviewType: string, interviewersName: string,
    interviewDate: string,
    interviewTime: string,
    gmeetUrl: string,
    note?: string
) => {
        const response = await axiosInstance.post(RecruiterEndPoints.SCHEDULE_INTERVIEW(candidateId, jobId),
            {
                interviewType, interviewersName, interviewDate, interviewTime, gmeetUrl, note
            },
            {
                sendAuthToken:true,
            } as AxiosRequest
        )

        return response.data
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
        const response = await axiosInstance.post(RecruiterEndPoints.POST_A_JOB, {
            jobTitle, description, requirements, responsibilities, duration, jobType, workMode, location, minSalary, maxSalary, salaryCurrency,
            salaryPeriod, vacancies, qualification, experienceInYears, jobLevel, requiredSkills, optionalSkills, expiresAt
        },
        {   
            sendAuthToken:true
        } as AxiosRequest
    )

        return response.data
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
}

export const deleteJob = async (jobId: string) => {
        const response = await axiosInstance.delete(RecruiterEndPoints.DELETE_MY_JOB(jobId),
            {sendAuthToken:true} as AxiosRequest
        )

        return response.data
}

export const getJobs = async (search: string, page: number, limit: number = 3, sortOption: string, filterStatus: string, filterWorkMode: string) => {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_MY_JOBS,
            {
                sendAuthToken:true,
                params:{
                    search, page, limit, sortOption, filter:JSON.stringify({status:filterStatus, workMode:filterWorkMode})
                }
            } as AxiosRequest
        )

        return response.data
}

export const getPostedJobDetails = async (jobId: string) => {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_POSTED_JOB_DETAILS(jobId),
            {
                sendAuthToken:true,
            } as AxiosRequest
        )

        return response.data
}

export const getRecentJobs = async () => {
        const response = await axiosInstance.get(JobsEndpoints.RECRUITER.GET_RECENT_JOBS,
            {
                sendAuthToken:true,
            } as AxiosRequest
        )

        return response.data

}

export const getApplicationDetails = async (jobId : string, search: string, page: number, limit: number, status: string) => {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_JOB_APPLICATIONS_BY_ID(jobId), {
            params:{search, page, limit, status},
            sendAuthToken:true
        } as AxiosRequest)
    
        return response.data
}

export const getSingleApplicationDetails = async (applicationId: string) => {
        const response = await axiosInstance.get(RecruiterEndPoints.GET_JOB_APPLICATION_DETAILS_BY_APPLICATION_ID(applicationId), 
        {
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data

}

export const rejectCandidateJobApplication = async (title : string, description : string, type : string, relatedId : string, applicationId : string, candidateId : string) => {
        const response = await axiosInstance.patch(RecruiterEndPoints.REJECT_CANDIDATE_APPLICATION(applicationId),
            {title, description, type, candidateId, relatedId},
            {   
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const updateCandidateNotes = async (applicationId: string, notes: string) => {
        const response = await axiosInstance.patch(RecruiterEndPoints.UPDATE_CANDIDATE_NOTE(applicationId), {
            notes
        },
        {
            sendAuthToken:true,
        } as AxiosRequest
    )

    return response.data

}

export const addCompany = async (name: string, linkedin: string, website: string, industry: string, slogan: string, description: string, location: string) => {
        const response = await axiosInstance.post(RecruiterEndPoints.ADD_COMPANY, {
            name, linkedin, website,industry, slogan, description, location 
        },
        {
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data
}

export const updateJobApplicationStatus = async (
    applicationId: string, status: string, candidateName: string, candidateEmail: string, jobTitle: string
) => {
        const response = await axiosInstance.patch(RecruiterEndPoints.UPDATE_JOB_APPLICATION_STATUS(applicationId),
            {status, candidateName, candidateEmail, jobTitle},
            {
                sendAuthToken:true,
            } as AxiosRequest
        )

        return response.data
}

export const recruiterFetchJobLevelLists = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_JOBLEVEL_LIST,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const recruiterFetchJobTypeLists = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_JOBTYPE_LIST,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const recruiterFetchWorkModeLists = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.FETCH_WORKMODE_LIST,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const loadRecruiterApplications = async (page: number, limit: number) => {
        const response = await axiosInstance.get(RecruiterEndPoints.LOAD_ALL_RECRUITER_APPLICATIONS, {
            params:{page, limit},
            sendAuthToken:true
        } as AxiosRequest

        )

        return response.data
}

export const rejectRecruiterApplication = async (recruiterId: string, reason: string, feedback? : string) => {
        const response = await axiosInstance.patch(RecruiterEndPoints.REJECT_RECRUITER_APPLICATION(recruiterId), 
            {reason, feedback},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const approveRecruiterApplication = async (recruiterId: string) => {
        const response = await axiosInstance.patch(RecruiterEndPoints.APPROVE_APPLICATION_BY_ID(recruiterId), {},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}


export const getRecruiters = async (search: string, page: number, sort : string, recruiterType: string, recruiterStatus: string) => {
        const response = await axiosInstance.get(RecruiterEndPoints.LOAD_ALL_RECRUITERS, {
            params:{search, page, sort, recruiterType, recruiterStatus},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
}

export const getRecruiterDetails = async (recruiterId: string) => {
        const response = await axiosInstance.get(RecruiterEndPoints.LOAD_RECRUITER_DETAILS_BY_ID(recruiterId), {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
}

export const handleRecruiterVerification = async (recrutierId: string, action: "Verified" | "Revoked") => {
        const response = await axiosInstance.patch(RecruiterEndPoints.HANDLE_RECRUITER_VERIFICATION(recrutierId), {}, {
            params:{action},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
}

export const handleRecruiterPermissions = async (recrutierId: string, action: "Revoke" | "Un-Revoke") => {
        const response = await axiosInstance.patch(RecruiterEndPoints.HANDLE_RECRUITER_PERMISSIONS(recrutierId), {}, {
            params:{action},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
}

export const changeStatusToUnderReview = async (applicationId: string) => {
        const response = await axiosInstance.patch(RecruiterEndPoints.CHANGE_STATUS_UNDER_REVIEW(applicationId), {},
        {
            sendAuthToken: true
        } as AxiosRequest
    )
    return response.data
}

export const verifyBeforePostingJob = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.CHECK_VERIFICATION_STATUS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const verifyBeforeEditJob = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.CHECK_EDIT_JOB_VERIFICATION_STATUS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const verifyBeforeManageApplications = async () => {
        const response = await axiosInstance.get(RecruiterEndPoints.CHECK_MANAGE_APPLICATIONS_VERIFICATIONS_STATUS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
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
        const response = await axiosInstance.patch(RecruiterEndPoints.MANAGE_RECRUITER_PERMISSIONS(recruiterId),
        {isAllJobsHidden, allowPostJobs, allowEditJobs, allowDeletePosts, allowManageApplications, allowScheduleInterviews},
        {
            sendAuthToken: true,
        } as AxiosRequest
    )

    return response.data
}