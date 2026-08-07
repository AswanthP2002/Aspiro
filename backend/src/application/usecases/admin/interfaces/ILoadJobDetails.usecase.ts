import { AdminJobDetailsDTO } from '../../../DTOs/job/jobDetails.dto';

export default interface IAdminLoadJobDetailsUseCase {
  execute(id: string): Promise<AdminJobDetailsDTO | null>;
}
