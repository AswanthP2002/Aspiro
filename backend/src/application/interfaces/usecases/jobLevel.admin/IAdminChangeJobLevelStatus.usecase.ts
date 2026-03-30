import JobLevelDTO from '../../../DTOs/job.level.admin/jobLevel.dto';

export default interface IAdminChangeJobLevelStatusUsecase {
  execute(id: string, isActive: boolean): Promise<JobLevelDTO | null>;
}
