import CreateCandidateDTO from '../../../application/DTOs/candidate/createCandidate.dto';
import CreateCandidateRequestDTO from '../../DTOs/candidate/createCandidateRequestDTO';

export default function mapToCreateCandidateDTO(
  requestDto: CreateCandidateRequestDTO
): CreateCandidateDTO {
  return {
    name: requestDto.name,
    email: requestDto.email,
    phone: requestDto.phone,
    password: requestDto.password,
    userId: requestDto.userId,
  };
}
