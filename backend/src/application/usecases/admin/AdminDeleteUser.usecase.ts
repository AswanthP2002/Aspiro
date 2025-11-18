import { inject, injectable } from "tsyringe";
import IAdminDeleteUserUsecase from "../../interfaces/usecases/admin/IAdminDeleteUser.usecase";
import IUserRepository from "../../../domain/interfaces/IUserRepo";

@injectable()
export default class AdminDeleteUserUsecase implements IAdminDeleteUserUsecase {
    constructor(
        @inject('IUserRepository') private _userRepo: IUserRepository
    ){}

    async execute(userId: string): Promise<void> {
        await this._userRepo.delete(userId)
    }
}