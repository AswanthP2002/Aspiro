import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class ResendOtpDto {
  @IsDefined({ message: 'Email can not be emtpy' })
  @IsEmail({}, { message: 'Must be a valid email' })
  email!: string;

  @IsOptional()
  @IsString({ message: 'Id must be a string' })
  id!: string;
}

//legacy
export default interface ResendOtpDTO {
  email: string;
  id: string;
}
