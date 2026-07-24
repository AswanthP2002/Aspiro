import { AxiosError } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { Notify } from "notiflix"
import { logout } from "../redux/userAuthSlice"
import { AdminEndPoints } from "../constants/endPoints/admin.endpoints"
import { Dispatch } from "redux"


export const adminLogin = async (email : string, password : string) => {
    try {
        const result = await axiosInstance.post(AdminEndPoints.ADMIN_LOGIN, 
            {email, password},
            { 
                // headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )
        return result.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500){
            return err.response.data
        }

        console.log(error)
    }
}

export const logoutAdmin = async (dispatch: Dispatch, navigate: (path: string) => void) => {
    try {
        const result = await axiosInstance.post(AdminEndPoints.ADMIN_LOGOUT, {}, {
            sendCookie:true,
            sendAuthToken:true
        } as AxiosRequest)

        Notify.info(result?.data?.message, {timeout:1500})

        setTimeout(() => {
            dispatch(logout())
            navigate('/admin/login')
        }, 1500);
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw err
        }
    }
}

export const getJobs = async (search: string, page: number, limit: number, statusFilter: string, jobTypeFilter: string, reportsCount: number) => {
    try {
        const response = await axiosInstance.get(AdminEndPoints.ADMIN_JOBS_LOAD_ALL_JOBS, {
            params: {search, page, limit, statusFilter, jobTypeFilter, reportsCount},
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const getJobDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(AdminEndPoints.ADMIN_JOB_DETAILS_BY_ID(jobId), {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err

        console.log('Error occured while geting job details', err)
    }
}

export const blockCompanyUnblockCompany = async (companyId : string, operation : string) => {
    let url: string = ''
    url = operation === 'Block'
        ? `/admin/recruiter/block/${companyId}`
        : `/admin/recruiter/unblock/${companyId}`

    try {
        const response = await axiosInstance.patch(url, {}, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while blocking / unblocking the company', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const deleteCompany = async (companyId : string) => { //delete / close company should also delete company jobs
    try {
        const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_COMPANY(companyId), {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

         console.log('Error occured while closing the company data', err)
         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const deleteRecruiterData = async (recruiterId: string) => {
    try {
        const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_RECRUITER(recruiterId),
        {sendAuthToken: true} as AxiosRequest
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const requestReset = async (email: string) => {
    try {
        const response = await axiosInstance.post(AdminEndPoints.REQUEST_PASSWORD_RESET, 
            {email},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while ereseting user password', err)

        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const resetUserPassword = async (code: string, token: string, userId: string, userEmail: string) => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.RESET_USER_PASSWORD, 
            {code,token, userId, userEmail},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while ereseting user password', err)

        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const loadRecruiterAppicationDetails = async (applicationId: string) => {
    try {
        const response = await axiosInstance.get(AdminEndPoints.LOAD_RECRUITER_APPLICATION_DETAILS(applicationId), {
            sendAuthToken:true
        } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const adminDeleteJob = async (id: string) => {
    try {
        const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_JOB_BY_ID(id),
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminBlockJob = async (id: string) => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.ADMIN_BLOCK_JOB(id), {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminUnblockJob = async (id: string) => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.ADMIN_UNBLOCK_JOB(id), {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}


export const adminToggleFlagJob = async (id: string, action: 'flag' | 'un-flag') => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.ADMIN_FLAG_JOB(id),
            {action},
            {   
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}


