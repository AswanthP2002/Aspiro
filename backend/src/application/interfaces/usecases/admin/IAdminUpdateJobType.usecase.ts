import JobTypeDTO, { UpdateJobTypeDTO } from '../../../DTOs/admin/jobType.dto';

export default interface IAdminUpdateJobTypeUse {
  execute(dto: UpdateJobTypeDTO): Promise<JobTypeDTO | null>;
}
