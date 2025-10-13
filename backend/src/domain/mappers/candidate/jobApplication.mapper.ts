import { JobApplicationDTO } from '../../../presentation/controllers/dtos/candidate/jobApplicationDTO';
import JobApplication from '../../entities/candidate/jobApplication.entity';

export function createJobApplicationFromDTO(
  dto: JobApplicationDTO
): JobApplication {
  return {
    ...dto,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'Applied',
  };
}
