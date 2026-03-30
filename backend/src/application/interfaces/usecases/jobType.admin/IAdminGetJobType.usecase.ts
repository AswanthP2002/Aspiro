import JobTypeDTO, { GetJobTypesDTO } from '../../../DTOs/jobType.admin/jobType.dto';

export default interface IAdminGetJobTypesUsecase {
  execute(dto: GetJobTypesDTO): Promise<{ jobTypes: JobTypeDTO[]; totalPages: number } | null>;
}
