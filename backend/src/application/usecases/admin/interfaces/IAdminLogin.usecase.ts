/**
 * Refactored 6-10-25
 */

import AdminLoginResDTO, {
  AdminLoginDTO,
} from '../../../DTOs/admin/adminLoginRes.dto';

export default interface IAdminLoginUseCase {
  execute(adminLoginDto: AdminLoginDTO): Promise<AdminLoginResDTO>;
}
