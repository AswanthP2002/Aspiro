import { inject, injectable } from 'tsyringe';
import IGetRecruiterApplicationsUsecase from '../../interfaces/usecases/recruiter/IGetRecruiterApplications.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import LoadRecruiterApplicationDTO from '../../DTOs/recruiter/loadRecruiterApplication.dto.FIX';
import { AdminRecruiterApplicationsDTO } from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';

@injectable()
export default class GetRecruiterApplicationsUsecase implements IGetRecruiterApplicationsUsecase {
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo,
    @inject('RecruiterMapper') private _mapper: RecruiterMapper
  ) {}

  async execute(
    loadRecruiterApplicationsDto: LoadRecruiterApplicationDTO
  ): Promise<{ applications: AdminRecruiterApplicationsDTO[]; totalPages: number } | null> {
    const { page, limit } = loadRecruiterApplicationsDto;

    const recruiterData = await this._recruiterRepo.getAppliedRecruitersData({ page, limit });
    console.log('-- recruiter data from the database ---', recruiterData);
    if (recruiterData) {
      const dto: AdminRecruiterApplicationsDTO[] = [];
      recruiterData.applications.forEach((recruiter: RecruiterProfileOverviewData) => {
        dto.push(this._mapper.recruiterProfileOverviewToAdminRecruiterApplicationsDTO(recruiter));
      });

      return { applications: dto, totalPages: recruiterData.totalPages };
    }

    return null;
  }
}
