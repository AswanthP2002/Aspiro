import RecruiterProfileAggregated from '../../../application/DTOs/recruiter/recruiterProfileAggregatedData.dto';
import FindCompaniesQuery, { AppliedRecruitersQuery } from '../../../application/queries/recruiter.query';
import Recruiter from '../../entities/recruiter/recruiter.entity';
import RecruiterProfileOverviewData from '../../entities/recruiter/recruiterProfilveOverviewData';
import IBaseRepo from '../IBaseRepo';
import { SaveRecruiter } from './createRecruiterRequest';

export default interface IRecruiterRepo extends IBaseRepo<Recruiter> {
  //create(recruiter : Recruiter) : Promise<SaveRecruiter>
  findByEmail(email: string): Promise<Recruiter | null>;
  findById(id: string): Promise<Recruiter | null>;
  findByUserName(username: string): Promise<Recruiter | null>;
  findRecruiters(query: FindCompaniesQuery): Promise<Recruiter[] | null>; //change for strict later
  verifyRecruiter(email: string): Promise<Recruiter | null>;
  updateIntroDetails(
    id: string,
    companyName: string,
    about: string,
    benefits: string,
    companyType: string,
    industryType: string,
    teamStrength: string,
    yearOfEstablishment: string,
    website: string,
    vision: string,
    country: string,
    state: string,
    city: string,
    mobile: string
  ): Promise<Recruiter | null>;
  blockRecruiter(id: string): Promise<boolean>;
  unblockRecruiter(id: string): Promise<boolean>;
  deleteRecruiter(id: string): Promise<boolean>;
  getRecruiterProfileOverview(recruiterId: string): Promise<RecruiterProfileOverviewData | null>
  getAppliedRecruitersData(query: AppliedRecruitersQuery): Promise<RecruiterProfileOverviewData[] | null>
}
