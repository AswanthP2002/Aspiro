import { ResetPasswordDTO } from "../../DTOs/user/resetPassword.dto.FIX";

export default function mapResetPasswordDtoMapper(dto: ResetPasswordDTO) : ResetPasswordDTO {
    return {
        ...dto
    }
}