import JobTypeDTO from '../../../DTOs/jobType.admin/jobType.dto';

export default interface IGetJobTypeListUsecase {
  execute(): Promise<JobTypeDTO[] | null>;
}
