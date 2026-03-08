import { Role } from '../../../domain/entities/user/User.FIX';
import UserMetaDataDTO from './userMetaData.dto.FIX';

export interface UserLoginRequestDto {
  email: string;
  password: string;
}

export interface UserLoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserMetaDataDTO;
  role: string;
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
