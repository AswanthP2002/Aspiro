import { inject, injectable } from "tsyringe";
import ILoadUserMetaDataUsecase from "../../interfaces/usecases/user/ILoadUserMetaData.usecase";
import IUserRepository from "../../../domain/interfaces/IUserRepo";
import UserMetaData from "../../DTOs/user/userMetaData.dto";
import mapToUserMetaData from "../../mappers/user/mapToUserMetaData.mapper";

@injectable()
export default class LoadUserMetaData implements ILoadUserMetaDataUsecase {
    constructor(
        @inject('IUserRepository') private _userRepo: IUserRepository
    ) {}

    async execute(userId: string): Promise<UserMetaData | null> {
        const user = await this._userRepo.findById(userId)

        if(user){
            const metaDataDto = mapToUserMetaData(user)
            return metaDataDto
        }

        return null

    }
}