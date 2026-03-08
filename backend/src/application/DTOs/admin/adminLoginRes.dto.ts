import { Role } from '../../../domain/entities/user/User.FIX';

export default interface AdminLoginResponseDTO {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
  role: Role;
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}
