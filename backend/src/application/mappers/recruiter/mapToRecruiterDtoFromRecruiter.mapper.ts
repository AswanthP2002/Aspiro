import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto';

export default function mapToRecruiterDtoFromRecruiter(
  recruiter: Recruiter
): RecruiterDTO {
  return {
    ...recruiter,
  };
}
