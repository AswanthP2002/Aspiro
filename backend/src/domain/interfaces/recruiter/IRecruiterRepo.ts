import FindRecruitersDBQuery from '../../../application/queries/recruiter/recruiter.query';
import { AppliedRecruitersQuery } from '../../../application/queries/recruiter/recruiter.query';
import { NewRecruiter } from '../../entities/recruiter/recruiter.entity';
import RecruiterProfileOverviewData from '../../entities/recruiter/recruiterProfilveOverviewData';
import IBaseRepo from '../IBaseRepo';

export default interface IRecruiterRepo extends IBaseRepo<NewRecruiter> {
  findRecruitersPaginated(
    query: FindRecruitersDBQuery
  ): Promise<{ recruiters: RecruiterProfileOverviewData[]; totalPages: number } | null>;
  getRecruiterProfileOverview(recruiterId: string): Promise<RecruiterProfileOverviewData | null>;
  getAppliedRecruitersData(
    query: AppliedRecruitersQuery
  ): Promise<{ applications: RecruiterProfileOverviewData[]; totalPages: number } | null>;
  getRecruiterAggregatedDetailsById(id: string): Promise<RecruiterProfileOverviewData | null>;
  updateVerificationTimeLine(
    recruiterId: string,
    action: 'Verified' | 'Revoked'
  ): Promise<NewRecruiter | null>;
}
