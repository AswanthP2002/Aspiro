import { Role } from "../../../domain/entities/user/User.FIX";

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
