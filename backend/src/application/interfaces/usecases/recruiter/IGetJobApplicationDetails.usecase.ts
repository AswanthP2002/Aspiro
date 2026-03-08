import { SingleApplicationDetailsForRecruiterDTO } from '../../../DTOs/job/JobApplicationsListForRecruiter.dto';

export default interface IGetJobApplicationDetailsUseCase {
  execute(applicationId: string): Promise<SingleApplicationDetailsForRecruiterDTO | null>;
}
