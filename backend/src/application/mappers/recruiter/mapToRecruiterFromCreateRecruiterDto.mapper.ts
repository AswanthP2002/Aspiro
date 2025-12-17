import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import CreateRecruiterDTO from '../../DTOs/recruiter/recruiter.dto';

export default function mapToRecruiterFromCreateRecruiterDTO(
  createRecruiterDto: CreateRecruiterDTO
): Recruiter {
  return {
    ...createRecruiterDto
  };
}
