import Candidate from '../../../domain/entities/candidate/candidate.entity';
import CreateCandidateDTO from '../../DTOs/candidate/createCandidate.dto';

export default function mapToCandidate(
  createCandidateDto: CreateCandidateDTO
): Candidate {
  return {
    ...createCandidateDto,
  };
}

// export function mapToCandidateGoogleLogin()
