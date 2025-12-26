import { Role } from '../../../domain/entities/user/User.FIX';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export default class AdminLoginResponseDTO {
  @Expose()
  token!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  user!: {
    id: any;
    email?: string;
  };

  @Expose()
  role!: Role;
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}
