import JobTypeDTO, { UpdateJobTypeDTO } from '../../../DTOs/jobType.admin/jobType.dto';

export default interface IAdminUpdateJobTypeUse {
  execute(dto: UpdateJobTypeDTO): Promise<JobTypeDTO | null>;
}
