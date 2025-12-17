import { ResetPasswordDTO } from "../../../DTOs/user/resetPassword.dto.zod";
import UserDTO from "../../../DTOs/user/user.dto";

export default interface IResetPasswordUsecase {
    execute(resetPasswordDto: ResetPasswordDTO): Promise<UserDTO | null>
}