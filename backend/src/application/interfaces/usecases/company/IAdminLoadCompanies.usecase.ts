import AdminCompanyDataDTO from '../../../DTOs/company/adminCompanyData.dto';

export default interface IAdminLoadAllCompaniesDataUsecase {
  execute(
    page: number,
    limit: number
  ): Promise<{ companies: AdminCompanyDataDTO[]; totalPages: number } | null>;
}
