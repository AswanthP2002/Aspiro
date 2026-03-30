import JobTypeDTO, { CreateJobTypeDTO } from '../../../DTOs/jobType.admin/jobType.dto';

export default interface IAdminAddJobTypeUsecase {
  execute(dto: CreateJobTypeDTO): Promise<JobTypeDTO | null>;
}
