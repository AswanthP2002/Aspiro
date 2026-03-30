import RecruiterJobDetailsDTO from '../../../../domain/entities/job/recruiterJobDetails.dto';

export default interface ILoadRecruiterJobDetailsUsecase {
  execute(jobId: string): Promise<RecruiterJobDetailsDTO | null>;
}
