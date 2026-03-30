import { inject, injectable } from 'tsyringe';
import IUpdateCandidateNotes from '../../interfaces/usecases/jobApplication/IUpdateCandidateNotes.usecase';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import { JobApplicationDTO } from '../../DTOs/jobApplication/jobApplication.dto.FIX';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';

@injectable()
export default class UpdateCandidateNotesUsecase implements IUpdateCandidateNotes {
  constructor(
    @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(dto: JobApplicationDTO): Promise<JobApplicationDTO | null> {
    const { notes, _id } = dto;
    console.log('chekcing updatable id,,,,,,', _id);
    const updatedApplication = await this._repo.update(_id as string, { notes }); //changed update argument partial in the repo
    if (updatedApplication) {
      const dto = this._mapper.jobApplicationEntityToDTO(updatedApplication);
      return dto;
    }

    return null;
  }
}
