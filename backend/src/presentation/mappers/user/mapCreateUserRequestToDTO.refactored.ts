import CreateUserDTO from '../../../application/DTOs/user/createUser.dto';
import CreateUserRequestDTO from '../../DTOs/user/CreateUserRequest.dto.refactored';

export default function mapRequestToCreateUserDTO(requestDto: CreateUserRequestDTO): CreateUserDTO {
  return {
    name: requestDto.name,
    password: requestDto.password,
    email: requestDto.email,
    phone: requestDto.phone,
  };
}
