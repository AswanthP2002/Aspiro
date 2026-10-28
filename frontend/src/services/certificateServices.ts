import { CertificateEndpoints } from "../constants/endPoints/certificate.endpoint"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserCertificate = async (formData : FormData) => {
        const response = await axiosInstance.post(CertificateEndpoints.CERTIFICATES.ADD, formData,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const loadUserCertificates = async () => {
        const response = await axiosInstance.get(CertificateEndpoints.CERTIFICATES.LOAD, 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const deleteUserCertificate = async (certificateId: string, cloudinaryPublicId: string) => {
        const response = await axiosInstance.delete(CertificateEndpoints.CERTIFICATES.DELETE(certificateId), 
            {
                params:{cloudinaryPublicId},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}