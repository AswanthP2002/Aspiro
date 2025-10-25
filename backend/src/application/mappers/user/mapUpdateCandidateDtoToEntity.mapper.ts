import Candidate from '../../../domain/entities/user/candidate.entity';
import UpdateCandidateDTO from '../../DTOs/candidate/updateCandidate.dto';

export default function mapUpdateCandidateDtoToEntity(
  updateDto: UpdateCandidateDTO
): Candidate {
  return {
    ...updateDto,
  };
}
