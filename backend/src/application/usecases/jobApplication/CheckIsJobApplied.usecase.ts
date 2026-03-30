import { inject, injectable } from 'tsyringe';
import ICheckIsJobApplied from '../../interfaces/usecases/jobApplication/ICheckJobApplied.usecase';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import { JobApplicationDTO } from '../../DTOs/jobApplication/jobApplication.dto.FIX';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';

@injectable()
export default class CheckIsJobAppliedUsecase implements ICheckIsJobApplied {
  constructor(
    @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(jobId: string, candidateId: string): Promise<JobApplicationDTO | null> {
    const result = await this._repo.getJobApplicationWithJobIdCandidateId(jobId, candidateId);
    if (result) {
      return this._mapper.jobApplicationEntityToDTO(result);
    }

    return null;
  }
}
