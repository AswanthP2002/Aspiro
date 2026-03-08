import Company from '../entities/company.entity';
import IBaseRepo from './IBaseRepo';

export default interface ICompanyRepo extends IBaseRepo<Company> {
  findAll(filter?: { industry?: string; location?: string }): Promise<Company[] | null>;
  findCompaniesByName(name: string): Promise<Company[] | null>
}
