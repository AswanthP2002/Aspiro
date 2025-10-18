import { Role } from '../user/user.dto';

export interface LoginCandidateInpDTO {
  email: string;
  password: string;
}

export interface LoginCandidateOutDTO {
  token: string;
  refreshToken: string;
  user: {
    id?: string;
    email?: string;
  };
  role?: Role;
}
