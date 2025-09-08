import Follow from "../entities/Follow";

export default interface IFollowRepo {
    follow(follow : Follow) : Promise<Follow | null>
    unfollow(follower : string, following : string) : Promise<void>
    getFollowers(userId : string) : Promise<Follow[] | null>
    getFollowing(userId : string) : Promise<Follow[] | null>
}