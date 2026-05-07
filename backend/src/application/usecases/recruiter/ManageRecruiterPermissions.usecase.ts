import { injectable, inject } from 'tsyringe';
import IManageRecruiterPermissionsUsecase from '../../interfaces/usecases/recruiter/IManageRecruiterPermissions.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import ManageRecruiterPermssionsDTO from '../../DTOs/recruiter/manageRecruiterPermissions.dto';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import IJobRepo from '../../../domain/interfaces/IJobRepo';

@injectable()
export default class ManageRecruiterPermissionsUsecase implements IManageRecruiterPermissionsUsecase {
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo,
    @inject('IJobRepository') private _jobRepository: IJobRepo
  ) {}

  async execute(dto: ManageRecruiterPermssionsDTO): Promise<RecruiterDTO | null> {
    const {
      recruiterId,
      isAllJobsHidden,
      allowPostJobs,
      allowEditJobs,
      allowDeletePosts,
      allowManageApplications,
      allowScheduleInterviews,
    } = dto;

    const result = await this._recruiterRepo.update(recruiterId as string, {
      isAllJobsHidden,
      allowPostJobs,
      allowEditJobs,
      allowDeletePosts,
      allowManageApplications,
      allowScheduleInterviews,
    });

    const recruiterUserDetails = await this._recruiterRepo.findById(recruiterId);

    if (isAllJobsHidden && recruiterUserDetails) {
      this._jobRepository.hideJobsByRecruiterUserId(recruiterUserDetails.userId as string);
    } else if (!isAllJobsHidden && recruiterUserDetails) {
      this._jobRepository.unHideJobsByRecruiterUserId(recruiterUserDetails.userId as string);
    }

    return result ? (result as RecruiterDTO) : null;
  }
}
