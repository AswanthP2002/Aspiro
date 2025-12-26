import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export default class AdminLoginRequestDTO {
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsDefined()
  @IsString()
  password!: string;
}
