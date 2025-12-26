import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export default class ResumeDTO {
  @Expose()
  _id!: string;

  @Expose()
  candidateId!: string;

  @Expose()
  resumeFileName?: string;

  @Expose()
  resumeUrlCoudinary!: string;

  @Expose()
  resumePublicIdCloudinary!: string;

  @Expose()
  createdAt?: Date;
}

export class CreateResumeDTO {
  @IsDefined()
  @IsString()
  candidateId!: string;

  @IsDefined()
  file!: any; //need to change file type later : NEED_FIX

  @IsDefined()
  @IsString()
  path!: string;
}

export class DeleteResumeDTO {
  @IsDefined()
  @IsString()
  resumeId!: string;

  @IsDefined()
  @IsDefined()
  cloudinaryPublicId!: string;
}
