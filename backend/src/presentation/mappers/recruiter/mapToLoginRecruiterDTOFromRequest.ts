import RecruiterLoginDTO from '../../../application/DTOs/recruiter/recruiterLogin.dto';
import LoginRecruiterRequestDTO from '../../DTOs/recruiter/loginRecruiterRequestDTO';

export default function mapToLoginRecruiterDTOFromRequest(
  requestDto: LoginRecruiterRequestDTO
): RecruiterLoginDTO {
  return {
    email: requestDto.email,
    password: requestDto.password,
  };
}
