import { AdminUserPasswordResetDTO } from '../../../DTOs/admin/adminUserPasswordRest.dto';
import { AdminUserDetailsDTO } from '../../../DTOs/user/userProfileAggregated.dto.FIX';

export default interface IAdminResetUserPasswordUsecase {
  execute(dto: AdminUserPasswordResetDTO): Promise<AdminUserDetailsDTO | null>;
}
