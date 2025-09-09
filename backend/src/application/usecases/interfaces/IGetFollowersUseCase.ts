import Follow from "../../../domain/entities/Follow";

export default interface IGetFollowersUseCase {
    execute(userId : string) : Promise<Follow[] | null>
}