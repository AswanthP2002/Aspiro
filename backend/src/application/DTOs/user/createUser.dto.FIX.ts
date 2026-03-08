import { IsOptional, MinLength, MaxLength, IsEmail, IsDefined } from 'class-validator';

export type Role = 'candidate' | 'recruiter' | 'admin';

export default interface CreateUserDTO {
  name?: string;
  password?: string;
  role?: Role[];
  phone?: string;
  email?: string;
  googleId?: string;
  facebookId?: string;
  linkedinId?: string;
}

export class CreateUserDto {
  @IsDefined({ message: 'Name value can not be undefined' })
  @MinLength(3, { message: 'Minimum 3 charecters in the name' })
  public name!: string;

  @IsOptional()
  @MinLength(8, { message: 'Password length minimum 8' })
  @MaxLength(20, { message: 'Password length maximun 20' })
  public password!: string;

  @IsOptional()
  public role?: Role[];

  @IsDefined({ message: 'Email can not be undefined' })
  @IsEmail({}, { message: 'Must be a valid email' })
  email!: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  googleId?: string;

  @IsOptional()
  facebookId?: string;

  @IsOptional()
  linkedinId?: string;
}
