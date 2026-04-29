import { AxiosError, HttpStatusCode } from "axios"
import { CompanyEndpoinds } from "../constants/endPoints/company.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const getCompaniesList = async (search: string) => {
    try {
        const response = await axiosInstance.get(CompanyEndpoinds.FETCH_COMPANY_LIST,
            {
                params:{search},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}