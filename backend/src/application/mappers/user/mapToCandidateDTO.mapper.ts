import Candidate from '../../../domain/entities/user/candidate.entity';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';

export default function mapToCandidateDTO(candidate: Candidate): CandidateDTO {
  return {
    name: candidate.name,
    about: candidate.about,
    userId: candidate.userId,
    _id: candidate._id,
    createdAt: candidate.createdAt,
    currentSubscription: candidate.currentSubscription,
    dateOfBirth: candidate.dateOfBirth,
    location: candidate.location,
    socialLinks: candidate.socialLinks,
    updatedAt: candidate.updatedAt,
  };
}
