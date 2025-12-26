import { IsDefined, IsString } from 'class-validator';
import { JobApplicationStatus } from '../../../domain/entities/user/jobApplication.entity';
import { Exclude, Expose } from 'class-transformer';

export default class CreateJobApplicationDTO {
  @IsDefined()
  @IsString()
  candidateId!: string;

  @IsDefined()
  @IsString()
  jobId!: string;

  @IsDefined()
  @IsString()
  resumeId!: string;

  @IsDefined()
  @IsString()
  coverLetterContent!: string;
}

@Exclude()
export class JobApplicationDTO {
  @Expose()
  _id?: string;

  @Expose()
  candidateId?: string;

  @Expose()
  jobId?: string;

  @Expose()
  resumeId?: string;

  @Expose()
  coverLetterContent?: string;

  @Expose()
  status?: JobApplicationStatus;

  @Expose()
  notes?: string;

  @Expose()
  createdAt?: string;

  updatedAt?: string;
}
