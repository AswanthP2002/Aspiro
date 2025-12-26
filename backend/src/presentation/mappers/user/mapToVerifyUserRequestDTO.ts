import VerifyUserDTO from '../../../application/DTOs/user/verifyUser.dto.FIX';
import VerifyUserRequestDTO from '../../DTOs/user/verifyUserRequestDTO';

export default function mapToVerifyUserDTO(dto: VerifyUserRequestDTO): VerifyUserDTO {
  return { ...dto };
}
