import JobLevelDTO from '../../../DTOs/job.level.admin/jobLevel.dto';

export default interface IGetJobLevelListsUsecase {
  execute(): Promise<JobLevelDTO[] | null>;
}
