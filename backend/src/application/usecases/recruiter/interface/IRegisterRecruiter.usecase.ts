import CreateRecruiterDTO, {
  RecruiterDTO,
} from '../../../DTOs/recruiter/recruiter.dto';

export default interface IRegisterRecruiterUseCase {
  execute(createRecruiterDto: CreateRecruiterDTO): Promise<RecruiterDTO | null>;
}
