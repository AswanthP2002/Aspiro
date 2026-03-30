import JobTypeDTO, { ChangeJobTypeStatusDTO } from '../../../DTOs/jobType.admin/jobType.dto';

export default interface IAdminChangeJobTypeStatusUsecase {
  execute(dto: ChangeJobTypeStatusDTO): Promise<JobTypeDTO | null>;
}
