import { AdminUserDetailsDTO } from '../../../DTOs/user/userProfileAggregated.dto.FIX';

export default interface IAdminLoadUserDetailsUsecase {
  execute(userId: string): Promise<AdminUserDetailsDTO | null>;
}
