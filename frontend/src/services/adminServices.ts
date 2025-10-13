import { AxiosError } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import Swal from "sweetalert2"


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

export const logoutAdmin = async () => {
    try {
        const result = await axiosInstance.post('/admin/logout', null, {
            sendCookie:true,
            sendAuthToken:true
        } as AxiosRequest)

        return result.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500) return err.response.data
        console.log(error)
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

export const getCompanies = async (search: string, page: number, sort : string) => {
    try {
        const response = await axiosInstance.get('/admin/companies/data', {
            params:{search, page, sort},
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

        console.log('Error occured while geting company details', err)
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
        ? `/admin/company/block/${companyId}`
        : `/admin/company/unblock/${companyId}`

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

        console.log('Error occured while blocking / unblocking the company', err)
    }
}

export const deleteCompany = async (companyId : string) => { //delete / close company should also delete company jobs
    try {
        const response = await axiosInstance.delete(`/admin/company/close/${companyId}`, {
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

        console.log('Error occured while closing the company data', err)
    }
}

export const getCandidates = async (search: string, page: number, sort : string, filter : any) => {
    try {
        const response = await axiosInstance.get('/admin/candidates/data', {
            params:{search, page, sort, filter:JSON.stringify(filter)},
            sendAuthToken:true
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

        console.log('Error occured while geting candidate list', err)
    }
}

export const getCandidateDetails = async (candidateId : any) => {
    try {
        const response = await axiosInstance.get('/admin/candidate/details', {
            params:{candidateId},
            sendAuthToken:true
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

        console.log('Error occured while geting candidate details', err)
    }
}

export const candidateBlock = async (candidateId : string) => {
    try {
        const response = await axiosInstance.patch(`/admin/candidate/block/${candidateId}`, null, {
            sendAuthToken:true
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

        console.log('Error occured while blocking the candidate', err)
    }
}

export const candidateUnblock = async (candidateId : string) => {
    try {
        const response = await axiosInstance.patch(`/admin/candidate/unblock/${candidateId}`, null, {
            sendAuthToken:true
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

        console.log('Error occured while unblocking the candidate', err)
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