import IJobApplicationRepo from '../../domain/interfaces/IJobApplicationRepo';
import ISaveJobApplicationUseCase from './candidate/interface/IApplyJob.usecase';
import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../DTOs/candidate/jobApplication.dto';
import mapToJobApplicationFromCreateJobDTO from '../mappers/candidate/mapToJobFromCreateJobDTO.mapper';
import mapToJobApplicationDTOFromJobApplication from '../mappers/candidate/mapToJobApplicationDTOFromJobApplication.mapper';

export default class SaveJobApplicationUseCase
  implements ISaveJobApplicationUseCase
{
  constructor(private _iJobApplicationRepo: IJobApplicationRepo) {}

  async execute(
    createJobApplicationDto: CreateJobApplicationDTO
  ): Promise<JobApplicationDTO | null> {
    const newJobApplication = mapToJobApplicationFromCreateJobDTO(
      createJobApplicationDto
    );

    const result = await this._iJobApplicationRepo.create(newJobApplication);
    if (result) {
      const dto = mapToJobApplicationDTOFromJobApplication(result);
      return dto;
    }
    return null;
  }
}
