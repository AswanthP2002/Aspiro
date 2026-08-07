import { ResetPasswordDTO } from '../../DTOs/user/resetPassword.dto';

export default function mapResetPasswordDtoMapper(dto: ResetPasswordDTO): ResetPasswordDTO {
  return {
    ...dto,
  };
}
