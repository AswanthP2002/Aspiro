import {
  RecruiterDTO,
  UpdateRecriterDTO,
} from '../../../DTOs/recruiter/recruiter.dto';

export default interface ISaveBasicsUseCase {
  execute(updateRecruiterDto: UpdateRecriterDTO): Promise<RecruiterDTO | null>;
}
