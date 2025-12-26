import { IsDefined, IsString } from 'class-validator';

export class UploadProfilePictureDTO {
  @IsDefined()
  @IsString()
  publicId!: string;

  @IsDefined()
  imageFile!: any;

  @IsDefined()
  @IsString()
  userId!: string;
}
