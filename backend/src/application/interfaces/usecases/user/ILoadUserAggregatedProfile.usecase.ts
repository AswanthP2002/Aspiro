import UserProfileAggregatedDTO from "../../../DTOs/userProfileAggregatedDTO";

export default interface ILoadUserAggregatedProfileUsecase {
    execute(userId: string): Promise<UserProfileAggregatedDTO | null>
}