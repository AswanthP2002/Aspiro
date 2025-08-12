import { AxiosError } from "axios";
import axios from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import Swal from "sweetalert2";

export const recruiterRegister = async (email : string, username : string, password : string) => {
    try {
        const response = await axiosInstance.post('/recruiter/register',
            {email, username, password},
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

export const saveIntroDetails = async (details: any, logourl: string, coverphotourl: string) => {
    try {
        const response = await axiosInstance.post('/recruiter/intro/details',
            {details, logourl, coverphotourl},
            {
                headers:{'Content-Type' : 'application/json'},
                sendAuthTokenRecruiter:true
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

        console.log('Error occured while geting the profile overview', err)
    }
}

export const postJob = async (jobDetails : any) => {
    try {
        const response = await axiosInstance.post('/recruiter/job/create', jobDetails, {
            headers:{'Content-Type' : 'application/json'},
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

        console.log('Error occured while posting a job', err)
    }
}

export const getApplicationDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(`/recruiter/job/${jobId}/application/details`, {
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

        console.log('Error occured while geting application details', err)
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
