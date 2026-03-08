import { inject, injectable } from 'tsyringe';
import IGetCompanyListUsecase from '../../interfaces/usecases/IGetCompanyList.usecase';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import CompanyDTO from '../../DTOs/recruiter/company.dto';

@injectable()
export default class GetCompanyListUsecase implements IGetCompanyListUsecase {
  constructor(@inject('ICompanyRepository') private _companyRepo: ICompanyRepo) {}

  async execute(filter?: { industry?: string; location?: string }): Promise<CompanyDTO[] | null> {
    const companies = await this._companyRepo.findAll(filter);

    if (!companies) return null;

    return companies.map((company) => ({
      _id: company._id!,
      name: company.name,
      website: company.website,
      linkedin: company.linkedin,
      description: company.description,
      industry: company.industry,
      location: company.location,
      logo: company.logo,
    }));
  }
}
