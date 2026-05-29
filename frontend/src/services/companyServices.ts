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

export const adminLoadCompaniesData = async (page: number) => {
    try {
        const response = await axiosInstance.get(CompanyEndpoinds.ADMIN_LOAD_COMPANIES_DATA,
            {
                sendAuthToken: true,
                params:{page}
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const adminEditCompany = async (companyId: string, name: string, slogan: string, description: string, website: string, industry: string, linkedin: string, location: string) => {
    try {
        const response = await axiosInstance.patch(CompanyEndpoinds.ADMIN_EDIT_COMPANY(companyId),
            {name, slogan, description, website, linkedin, industry, location},
            {
                headers:{
                    "Content-Type": 'application/json'
                },
                sendAuthToken: true,
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}