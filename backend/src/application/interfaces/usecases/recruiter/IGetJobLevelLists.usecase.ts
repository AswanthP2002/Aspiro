import JobLevelDTO from '../../../DTOs/admin/jobLevel.dto';

export default interface IGetJobLevelListsUsecase {
  execute(): Promise<JobLevelDTO[] | null>;
}
