import { AxiosError, AxiosInterceptorManager } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import Swal from "sweetalert2"
import { Notify } from "notiflix"
import { logout } from "../redux-toolkit/userAuthSlice"


export const adminLogin = async (email : string, password : string) => {
    try {
        const result = await axiosInstance.post('/admin/login', 
            {email, password},
            { 
                headers:{'Content-Type':'application/json'}
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

export const logoutAdmin = async (dispatch: Function, navigate: Function) => {
    try {
        const result = await axiosInstance.post('/admin/logout', null, {
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

export const getJobs = async (search: string, page: number, sort : string, filter : any) => {
    try {
        const response = await axiosInstance.get('/admin/jobs/data', {
            params:{search, page, sort, filter:JSON.stringify(filter)},
            sendAuthTokenAdmin:true
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

        console.log('Error occured while geting the jobs', err)
    }
}

export const getJobDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(`/admin/job/details/${jobId}`, {
            sendAuthTokenAdmin:true
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

        console.log('Error occured while geting job details', err)
    }
}

export const blockJobUnblockJob = async (jobId : string, operation : string) => {
    let url: string = ''
        url = operation === 'Block'
            ? `/admin/job/block/${jobId}`
            : `/admin/job/unblock/${jobId}`
        
        try {
            const response = await axiosInstance.put(url, null, {
                sendAuthTokenAdmin:true
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

            console.log('Error occured while blocking / unblocking job', err)

        }
}

export const rejectJobUnrejectJob = async (jobId : string, operation : string) => {
    let url: string = ''
        url = operation === 'Reject'
            ? `/admin/job/reject/${jobId}`
            : `/admin/job/unreject/${jobId}`

    try {
        const response = await axiosInstance.put(url, null, {
            sendAuthTokenAdmin:true
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
    }
}

export const getCompanies = async (search: string, page: number, sort : string, employerTypeFilter: string, employerStatusFilter: string) => {
    try {
        const response = await axiosInstance.get('/admin/recruiters/data', {
            params:{search, page, sort, employerTypeFilter, employerStatusFilter},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting company details', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const getCompanyDetails = async (companyId : string) => {
    try {
        const response = await axiosInstance.get(`/admin/company/details/${companyId}`, {
            sendAuthTokenAdmin:true
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

        console.log('Error occured while geting company details')
    }
}

export const blockCompanyUnblockCompany = async (companyId : string, operation : string) => {
    let url: string = ''
    url = operation === 'Block'
        ? `/admin/recruiter/block/${companyId}`
        : `/admin/recruiter/unblock/${companyId}`

    try {
        const response = await axiosInstance.patch(url, null, {
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
        const response = await axiosInstance.delete(`/admin/recruiter/close/${companyId}`, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

         console.log('Error occured while closing the company data', err)
         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const getUsers = async (search: string, page: number, sort : string, filter : any) => {
    try {
        const response = await axiosInstance.get('/admin/users', {
            params:{search, page, sort, filter:JSON.stringify(filter)},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        // Log the error for debugging purposes
        console.log('Error occurred while getting user list', error);
        // Re-throw the error to be handled by the calling function's catch block
        // or the global Axios error interceptor.
        throw error;
    }
}

export const getUserDetails = async (userId : any) => {
    try {
        const response = await axiosInstance.get(`/admin/users/details/${userId}`, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
       const err = error as AxiosError

       if(err.response && err.response.status < 500 && err.response.status !== 403){
        throw error
       }
    }
}

export const userBlock = async (userId : string) => {
    try {
        const response = await axiosInstance.patch(`/admin/user/block/${userId}`, null, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500  && err.response.status !== 403) throw error

        console.log('Error occured while blocking the candidate', err)
    }
}

export const userUnblock = async (userId : string) => {
    try {
        const response = await axiosInstance.patch(`/admin/user/unblock/${userId}`, null, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }

        console.log('Error occured while unblocking the candidate', err)
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await axiosInstance.delete(`/admin/user/${userId}`, 
            {
                sendAuthToken:true
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

export const refreshAdminToken = async () => {
    try {
        const response = await axiosInstance.get('/admin/token/refresh')
        return response.data?.accessToken
    } catch (error : unknown) {
        console.log('Error occured while refreshing admin access token', error)
    }
}

export const loadRecruiterApplications = async (search: string, profileStatus: string) => {
    try {
        const response = await axiosInstance.get('/admin/recruiter/applications', {
            params:{search, profileStatus},
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

export const rejectRecruiterApplication = async (recruiterId: string, reason: string) => {
    try {
        const response = await axiosInstance.patch(`/admin/recruiter/application/${recruiterId}`, 
            {reason},
            {
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

export const approveRecruiterApplication = async (recruiterId: string) => {
    try {
        const response = await axiosInstance.patch(`/admin/recruiter/application/approve/${recruiterId}`, {},
            {
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

export const adminAddSkill = async (skills: string) => {
    try {
        const response = await axiosInstance.post('/admin/skills',
            {skills},
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminUpdateSkill = async (skillId: string, skills: string, isVerified: boolean) => {
    try {
        const response = await axiosInstance.patch(`/admin/skills/${skillId}`,
            {skills, isVerified},
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminGetSkills = async (search: string, limit: number, page: number) => {
    try {
        const response = await axiosInstance.get('/admin/skills',
            {
                params:{search, limit, page},
                headers:{"Content-Type":'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminDeleteSkills = async (skillId: string) => {
    try {
        const response = await axiosInstance.delete(`/admin/skills/${skillId}`,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}