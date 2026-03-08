import JobTypeDTO, { GetJobTypesDTO } from '../../../DTOs/admin/jobType.dto';

export default interface IAdminGetJobTypesUsecase {
  execute(dto: GetJobTypesDTO): Promise<{ jobTypes: JobTypeDTO[]; totalPages: number } | null>;
}
