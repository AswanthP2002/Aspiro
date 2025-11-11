import { ResetPasswordDTO } from "../../DTOs/user/resetPassword.dto.zod";

export default function mapResetPasswordDtoMapper(dto: ResetPasswordDTO) : ResetPasswordDTO {
    return {
        ...dto
    }
}