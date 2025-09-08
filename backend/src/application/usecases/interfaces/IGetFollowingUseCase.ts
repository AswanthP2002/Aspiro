import Follow from "../../../domain/entities/Follow";

export default interface IGetFollowingUseCase {
    execute(userId : string) : Promise<Follow[] | null>
}