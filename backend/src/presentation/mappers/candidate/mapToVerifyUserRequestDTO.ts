import VerifyUserDTO from '../../../application/DTOs/candidate/verifyCandidate.dto';
import VerifyUserRequestDTO from '../../DTOs/candidate/verifyUserRequestDTO';

export default function mapToVerifyUserDTO(
  dto: VerifyUserRequestDTO
): VerifyUserDTO {
  return { ...dto };
}
