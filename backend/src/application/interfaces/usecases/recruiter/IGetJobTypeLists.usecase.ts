import JobTypeDTO from '../../../DTOs/admin/jobType.dto';

export default interface IGetJobTypeListUsecase {
  execute(): Promise<JobTypeDTO[] | null>;
}
