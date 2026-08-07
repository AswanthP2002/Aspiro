import { AdminJobsListDTO, AdminLoadJobsDTO } from '../../../DTOs/job/loadJob.dto';

export default interface ILoadJobsUseCase {
  execute(dto: AdminLoadJobsDTO): Promise<{ jobs: AdminJobsListDTO[]; totalPages: number } | null>;
}
