import { Role } from '../../../application/DTOs/shared/createUser.dto';

export default interface CreateUserRequestDTO {
  role: Role;
  password: string;
  email: string;
  phone?: string;
}
