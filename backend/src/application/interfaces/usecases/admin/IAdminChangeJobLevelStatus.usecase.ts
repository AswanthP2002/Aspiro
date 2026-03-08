import JobLevelDTO from '../../../DTOs/admin/jobLevel.dto';

export default interface IAdminChangeJobLevelStatusUsecase {
  execute(id: string, isActive: boolean): Promise<JobLevelDTO | null>;
}
