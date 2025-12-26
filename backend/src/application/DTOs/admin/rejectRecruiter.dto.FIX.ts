import { IsDefined, IsString } from 'class-validator';

export default class RejectRecruiterApplicationDTO {
  @IsDefined()
  @IsString()
  id!: string;

  @IsDefined()
  @IsString()
  reason!: string;
}
