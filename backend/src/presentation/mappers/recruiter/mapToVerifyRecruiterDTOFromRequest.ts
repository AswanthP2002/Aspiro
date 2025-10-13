import VerifyRecruiterDTO from '../../../application/DTOs/recruiter/verifyRecruiter.dto';
import verifyRecruiterRequestDTO from '../../DTOs/recruiter/verifyRecruiterRequestDTO';

export default function mapToVerifyRecruiterDTOFromRequest(
  requestDto: verifyRecruiterRequestDTO
): VerifyRecruiterDTO {
  return {
    email: requestDto.email,
    opt: requestDto.otp,
  };
}
