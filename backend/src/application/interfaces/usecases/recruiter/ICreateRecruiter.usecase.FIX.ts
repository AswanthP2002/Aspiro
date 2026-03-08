import CreateRecruiterDTO, { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface ICreateRecruiterUsecase {
  execute(createRecruiterDto: CreateRecruiterDTO): Promise<RecruiterDTO | null>;
}
