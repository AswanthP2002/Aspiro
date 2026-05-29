export const CompanyAPIRoutes = {
  COMPANY: {
    ADD: '/v1/company',
    LOAD: '/v1/companies',
    COMPANY_SUGGESTION_LIST: '/v1/companies/list',
    ADMIN_LOAD_COMPANIES_DATA: '/v1/admin/companies/data',
    ADMIN_EDIT_COMPANY: '/v1/admin/company/:id',
  },
} as const;
