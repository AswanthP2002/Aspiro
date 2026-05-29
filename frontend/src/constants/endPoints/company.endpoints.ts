export const CompanyEndpoinds = {
    FETCH_COMPANY_LIST: '/v1/companies/list',
    ADMIN_LOAD_COMPANIES_DATA: '/v1/admin/companies/data',
    ADMIN_EDIT_COMPANY: (companyId: string) => `/v1/admin/company/${companyId}`
}