import { IsDefined, IsString } from 'class-validator';

export default class RemoveProfilePhotoDTO {
  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  @IsString()
  cloudinaryPublicId!: string;
}

export class RemoveCoverPhotoDTO {
  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  @IsString()
  cloudinaryPublicId!: string;
}
