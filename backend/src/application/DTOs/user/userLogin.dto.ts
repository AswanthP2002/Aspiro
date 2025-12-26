import { IsDefined, IsEmail, MinLength } from 'class-validator';
import { Role } from '../../../domain/entities/user/User.FIX';
import { Exclude, Expose } from 'class-transformer';

export class UserLoginRequestDto {
  @IsDefined({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Must  be a valid email' })
  email!: string;

  @IsDefined({ message: 'Password can not be empty' })
  @MinLength(8, { message: 'Password must have 8 length' })
  password!: string;
}

@Exclude()
export class UserLoginResponseDto {
  @Expose()
  token!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  user!: {
    id: string;
    email: string;
  };

  @Expose()
  role!: Role;
}

//legacy
export interface UserLoginInpDTO {
  email: string;
  password: string;
}

//legacy
export interface UserLoginOutpDTO {
  token: string;
  refreshToken: string;
  user: {
    id?: string;
    email?: string;
  };
  role?: Role;
}
