import { UpdateRecriterDTO } from '../../../application/DTOs/recruiter/recruiter.dto';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';

export default function mapUpdateRecruiterDTOToRecruiter(
  updateRecruiterDto: UpdateRecriterDTO
): Recruiter {
  return {
    name: updateRecruiterDto.name,
    _id: updateRecruiterDto._id,
    about: updateRecruiterDto.about,
    employerType: updateRecruiterDto.employerType,
    location: updateRecruiterDto.location,
    socialLinks: updateRecruiterDto.socialLinks,
  };
}
