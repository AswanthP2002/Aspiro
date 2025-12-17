import { Role } from "../../../domain/entities/user/User.FIX";

export interface UserLoginInpDTO {
  email: string;
  password: string;
}

export interface UserLoginOutpDTO {
  token: string;
  refreshToken: string;
  user: {
    id?: string;
    email?: string;
  };
  role?: Role;
}
