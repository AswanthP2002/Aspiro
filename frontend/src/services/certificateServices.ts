import { AxiosError, HttpStatusCode } from "axios"
import { CertificateEndpoints } from "../constants/endPoints/certificate.endpoint"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserCertificate = async (formData : FormData) => {
    try {
        const response = await axiosInstance.post(CertificateEndpoints.CERTIFICATES.ADD, formData,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Error occured while adding certificate--', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }

    }
}

export const loadUserCertificates = async () => {
    try {
        const response = await axiosInstance.get(CertificateEndpoints.CERTIFICATES.LOAD, 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting candidate certificates', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const deleteUserCertificate = async (certificateId: string, cloudinaryPublicId: string) => {
    try {
        const response = await axiosInstance.delete(CertificateEndpoints.CERTIFICATES.DELETE(certificateId), 
            {
                params:{cloudinaryPublicId},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--Error occured while deleting certificate--', err )

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}