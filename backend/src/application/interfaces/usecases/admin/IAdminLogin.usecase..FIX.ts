import AdminLoginRequestDTO from '../../../DTOs/admin/adminLoginReq.dto.FIX';
import AdminLoginResponseDTO from '../../../DTOs/admin/adminLoginRes.dto';

export default interface IAdminLoginUseCase {
  execute(adminLoginDto: AdminLoginRequestDTO): Promise<AdminLoginResponseDTO>;
}
