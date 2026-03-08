import Candidate from '../../../domain/entities/user/candidate.entity.GARBAGE';
import UpdateCandidateDTO from '../../DTOs/candidate -LEGACY/updateCandidate.dto';

export default function mapUpdateCandidateDtoToEntity(
  updateDto: UpdateCandidateDTO
): Candidate {
  return {
    ...updateDto,
  };
}
