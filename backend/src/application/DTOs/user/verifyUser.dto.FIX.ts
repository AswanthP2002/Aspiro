import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyUserDto {
  @IsDefined({ message: 'Id can not be empty / undefined' })
  id!: string;

  @IsDefined({ message: 'OTP can not be empty / undefined' })
  @IsString({ message: 'OTP must be string' })
  @MinLength(6, { message: 'OTP must have 6 digit' })
  @MaxLength(6, { message: 'OTP must only have 6 digit' })
  otp!: string;
}

//LEGACY
export default interface VerifyUserDTO {
  id: string;
  otp: string;
}
