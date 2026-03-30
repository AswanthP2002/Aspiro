import { SingleApplicationDetailsForRecruiterDTO } from '../../../DTOs/jobApplication/JobApplicationsListForRecruiter.dto';

export default interface IGetJobApplicationDetailsUseCase {
  execute(applicationId: string): Promise<SingleApplicationDetailsForRecruiterDTO | null>;
}
