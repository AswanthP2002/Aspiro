import { AdminUserDetailsDTO } from '../../../DTOs/user/userProfileAggregated.dto';

export default interface IAdminLoadUserDetailsUsecase {
  execute(userId: string): Promise<AdminUserDetailsDTO | null>;
}
