import { IsDefined, IsEmail, IsString } from 'class-validator';

export class ResendOtpDto {
  @IsDefined({ message: 'Email can not be emtpy' })
  @IsEmail({}, { message: 'Must be a valid email' })
  email!: string;

  @IsDefined({ message: 'Id can not be empty' })
  @IsString({ message: 'Id must be a string' })
  id!: string;
}

//legacy
export default interface ResendOtpDTO {
  email: string;
  id: string;
}
