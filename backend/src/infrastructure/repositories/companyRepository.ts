import { injectable } from 'tsyringe';
import BaseRepository from './baseRepository';
import Company from '../../domain/entities/company/company.entity';
import ICompanyRepo from '../../domain/interfaces/ICompanyRepo';
import { CompanyDAO } from '../database/Schemas/recruiter/company.schema';

@injectable()
export default class CompanyRepository extends BaseRepository<Company> implements ICompanyRepo {
  constructor() {
    super(CompanyDAO);
  }

  async findAll(filter?: { industry?: string; location?: string }): Promise<Company[] | null> {
    // const query: any = {};
    // if (filter?.industry) {
    //   query.industry = { $regex: new RegExp(filter.industry, 'i') };
    // }
    // if (filter?.location) {
    //   query.location = { $regex: new RegExp(filter.location, 'i') };
    // }

    console.log(filter);
    const result = await CompanyDAO.find();
    return result;
  }

  async findCompaniesByName(name: string): Promise<Company[] | null> {
    const result = await CompanyDAO.find({
      name: { $regex: new RegExp(name, 'i') },
    })
      .limit(7)
      .lean();

    return result;
  }
}
