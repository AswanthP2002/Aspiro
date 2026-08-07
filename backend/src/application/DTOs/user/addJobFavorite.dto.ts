import { IsDefined, IsString } from 'class-validator';

export default class AddJobFavoriteDTO {
  @IsDefined()
  @IsString()
  candidateId!: string;

  @IsDefined()
  @IsString()
  jobId!: string;
}
