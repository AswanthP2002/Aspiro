import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import CreateRecruiterDTO from '../../DTOs/recruiter/recruiter.dto.FIX';

export default class RecruiterMapper {
  public createRecruiterDtoToRecruiter(dto: CreateRecruiterDTO): Recruiter {
    return {
      ...dto,
    };
  }
}
