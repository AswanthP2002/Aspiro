import { JobApplicationTrackingDTO } from '../../../DTOs/jobApplication/jobApplication.dto';

export interface ITrackMyJobApplicationDetailsUsecase {
  execute(applicationId: string): Promise<JobApplicationTrackingDTO | null>;
}
