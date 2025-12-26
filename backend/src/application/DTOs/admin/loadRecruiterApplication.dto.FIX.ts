import { IsDefined, IsString } from 'class-validator';

export default class LoadRecruiterApplicationDTO {
  @IsDefined()
  @IsString()
  search!: string;

  @IsDefined()
  @IsString()
  profileStatus!: string;
}
