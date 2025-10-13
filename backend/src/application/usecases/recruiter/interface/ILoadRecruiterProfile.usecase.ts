import { RecruiterProfileAggregatedDTO } from '../../../DTOs/recruiter/recruiterProfileAggregatedData.dto';

export default interface ILoadRecruiterProfileUseCase {
  execute(id: string): Promise<RecruiterProfileAggregatedDTO | null>;
}
