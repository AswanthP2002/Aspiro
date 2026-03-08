import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';

export default function mapToRecruiterDtoFromRecruiter(
  recruiter: Recruiter
): RecruiterDTO {
  return{
    ...recruiter
  }
}
