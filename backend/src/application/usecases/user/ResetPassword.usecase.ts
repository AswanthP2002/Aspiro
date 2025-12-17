import { inject, injectable } from "tsyringe";
import IResetPasswordUsecase from "../../interfaces/usecases/user/IResetPassword.usecase";
import IUserRepository from "../../../domain/interfaces/IUserRepo";
import { ResetPasswordDTO } from "../../DTOs/user/resetPassword.dto.zod";
import UserDTO from "../../DTOs/user/user.dto";
import IDataHashService from "../../interfaces/services/IDataHashService";
import { InvalidUserError } from "../../../domain/errors/AppError";
import mapUserToUserDTO from "../../mappers/user/mapUserToUserDTO.mapper";
import { verifyToken } from "../../../services/jwt";

@injectable()
export default class ResetPasswordUsecase implements IResetPasswordUsecase {
    constructor(
        @inject('IUserRepository') private _userRepository: IUserRepository,
        @inject('IDataHashService') private _dataHashService: IDataHashService
    ) {}

    async execute(resetPasswordDto: ResetPasswordDTO): Promise<UserDTO | null> {
        const {token, password} = resetPasswordDto

        //decode token & find email
        const result = await verifyToken(token)
        const {email} = result as {email: string}
        //find user
        const user = await this._userRepository.findByEmail(email)
        if(!user){
            throw new InvalidUserError()
        }

        //hash password
        const hashed = await this._dataHashService.hashData(password, 10) //10 saltround for hashing

        //update user
        const updatedUser = await this._userRepository.update(user._id as string, {password:hashed})
        if(updatedUser){
            const userDto: UserDTO = mapUserToUserDTO(updatedUser)
            return userDto
        }
        return null



    }
}