import { JobApplicationTrackingDTO } from '../../../DTOs/jobApplication/jobApplication.dto.FIX';

export interface ITrackMyJobApplicationDetailsUsecase {
  execute(applicationId: string): Promise<JobApplicationTrackingDTO | null>;
}
