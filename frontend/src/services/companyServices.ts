import { CompanyEndpoinds } from "../constants/endPoints/company.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const getCompaniesList = async (search: string) => {
        const response = await axiosInstance.get(CompanyEndpoinds.FETCH_COMPANY_LIST,
            {
                params:{search},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminLoadCompaniesData = async (page: number) => {
        const response = await axiosInstance.get(CompanyEndpoinds.ADMIN_LOAD_COMPANIES_DATA,
            {
                sendAuthToken: true,
                params:{page}
            } as AxiosRequest
        )

        return response.data
}

export const adminEditCompany = async (companyId: string, name: string, slogan: string, description: string, website: string, industry: string, linkedin: string, location: string) => {
        const response = await axiosInstance.patch(CompanyEndpoinds.ADMIN_EDIT_COMPANY(companyId),
            {name, slogan, description, website, linkedin, industry, location},
            {
                sendAuthToken: true,
            } as AxiosRequest
        )

        return response.data
}