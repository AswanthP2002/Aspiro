import CreateUserDTO from '../../application/DTOs/shared/createUser.dto';
import CreateUserRequestDTO from '../DTOs/shared/CreateUserRequest.dto.refactored';

export default function mapCreateUserRequestToDTO(
  requestDto: CreateUserRequestDTO
): CreateUserDTO {
  return {
    ...requestDto,
  };
}
