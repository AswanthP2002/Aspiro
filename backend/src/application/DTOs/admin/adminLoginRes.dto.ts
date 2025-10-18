import { Role } from '../user/user.dto';

export default interface AdminLoginResDTO {
  token: string;
  refreshToken: string;
  user: {
    id: any;
    email?: string;
  };
  role?: Role;
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}
