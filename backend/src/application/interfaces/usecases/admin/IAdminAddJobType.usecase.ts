import JobTypeDTO, { CreateJobTypeDTO } from '../../../DTOs/admin/jobType.dto';

export default interface IAdminAddJobTypeUsecase {
  execute(dto: CreateJobTypeDTO): Promise<JobTypeDTO | null>;
}
