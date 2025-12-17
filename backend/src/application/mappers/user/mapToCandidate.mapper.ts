import Candidate from '../../../domain/entities/user/candidate.entity';
import CreateCandidateDTO from '../../DTOs/candidate -LEGACY/createCandidate.dto';

export default function mapToCandidate(
  createCandidateDto: CreateCandidateDTO
): Candidate {
  return {
    ...createCandidateDto,
  };
}

// export function mapToCandidateGoogleLogin()
