import { inject, injectable } from "tsyringe";
import ILoadUserAggregatedProfileUsecase from "../../interfaces/usecases/user/ILoadUserAggregatedProfile.usecase";
import IUserRepository from "../../../domain/interfaces/IUserRepo";
import UserProfileAggregatedDTO from "../../DTOs/userProfileAggregatedDTO";
import mapToUserProfileAggregatedDTO from "../../mappers/admin/mapToUserProfileAggregatedAdminDTO";
import Follow from "../../../domain/entities/follow.entity";

@injectable()
export default class LoadUserAggregatedProfileUsecase implements ILoadUserAggregatedProfileUsecase {
    constructor(
        @inject('IUserRepository') private _userRepo: IUserRepository
    ) {}

    async execute(userId: string): Promise<UserProfileAggregatedDTO | null> {
        const userProfileDetails = await this._userRepo.getUserAggregatedProfile(userId)

        if(userProfileDetails){
            const dto = mapToUserProfileAggregatedDTO(userProfileDetails)

            //format followers (instead of follow object, make them as string of object id array)
            const followers: any[] = []
            dto.followers.forEach((follower: Follow) => {
                followers.push(follower.follower)
            })

            dto.followers = followers
            return dto
        }

        return null
    }
}