import { inject, injectable } from 'tsyringe';
import IUserLoadHomePageDatasUsecase from '../../interfaces/usecases/user/IUserLoadHomePageData';
import HomePageDataDTO from '../../DTOs/user/homePageData.dto';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';

@injectable()
export default class UserLoadHomePageDataUsecase implements IUserLoadHomePageDatasUsecase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('ICompanyRepository') private _companyRepo: ICompanyRepo,
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo
  ) {}
  async execute(): Promise<HomePageDataDTO | null> {
    const activeJobsCount = await this._jobRepo.getActiveJobsCount();
    const activeUsersCount = await this._userRepo.getActiveUsersCount();
    const companyCount = await this._companyRepo.getActiveCompanyCount();
    const recruiterCount = await this._recruiterRepo.getRecruiterCount();
    const jobsByCategoryAndVacancies = await this._jobRepo.getJobsByTitleAndOpenings();

    return {
      overview: {
        jobs: activeJobsCount?.count ?? 0,
        companies: companyCount?.count ?? 0,
        recruiters: recruiterCount?.count ?? 0,
        users: activeUsersCount?.count ?? 0,
      },
      jobVacancies: jobsByCategoryAndVacancies ?? [],
    };
  }
}
