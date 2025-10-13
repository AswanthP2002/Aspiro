import { LoginCandidateInpDTO } from '../../../application/DTOs/candidate/candidateLogin.dto';
import LoginCandidateRequestDTO from '../../DTOs/candidate/loginCandidateRequestDTO';

export default function mapToLoginCandidateInpDTO(
  dto: LoginCandidateRequestDTO
): LoginCandidateInpDTO {
  return { ...dto };
}
