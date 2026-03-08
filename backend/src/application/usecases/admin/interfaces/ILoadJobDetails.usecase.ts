import { AdminJobDetailsDTO } from '../../../DTOs/job/jobDetails.dto.FIX';

export default interface IAdminLoadJobDetailsUseCase {
  execute(id: string): Promise<AdminJobDetailsDTO | null>;
}
