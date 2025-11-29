import User from "../../../domain/entities/user/User";
import UserMetaData from "../../DTOs/user/userMetaData.dto";

export default function mapToUserMetaData(user: User): UserMetaData {
    return {
        _id:user._id,
        name:user.name,
        headline:user.headline,
        profilePicture:user.profilePicture
    }
}