import { inject, injectable } from 'tsyringe';
import IUpdateJobApplicationStatusUsecase from '../../interfaces/usecases/jobApplication/IUpdateJobApplicationStatus.usecase';
import { JobApplicationDTO } from '../../DTOs/jobApplication/jobApplication.dto.FIX';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import IEmailService from '../../interfaces/services/IEmailService';
import generatedAutomatedEmailContent from '../../Services/automatedEmail.templates';
import UpdateJobApplicationStatusDTO from '../../DTOs/jobApplication/UpdateJobApplicationStatus.dto';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';

@injectable()
export default class UpdateJobApplicationStatusUsecase implements IUpdateJobApplicationStatusUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
    @inject('IEmailService') private _emailService: IEmailService,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}
  async execute(
    updateJobApplicationDto: UpdateJobApplicationStatusDTO
  ): Promise<JobApplicationDTO | null> {
    const { _id, status, candidateEmail, candidateName, jobTitle } = updateJobApplicationDto;

    const updatedJobApplication = await this._repo.update(_id as string, { status: status });

    if (updatedJobApplication) {
      //send status updated email
      const { subject, body } = generatedAutomatedEmailContent(jobTitle, candidateName, status);
      await this._emailService.sendEmail(candidateEmail, subject, body);
      const dto = this._mapper.jobApplicationEntityToDTO(updatedJobApplication);
      return dto;
    }
    return null;
  }
}
