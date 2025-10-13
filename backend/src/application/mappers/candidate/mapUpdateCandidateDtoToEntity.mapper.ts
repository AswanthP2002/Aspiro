import Candidate from '../../../domain/entities/candidate/candidate.entity';
import UpdateCandidateDTO from '../../DTOs/candidate/updateCandidate.dto';

export default function mapUpdateCandidateDtoToEntity(
  updateDto: UpdateCandidateDTO
): Candidate {
  return {
    ...updateDto,
  };
}
