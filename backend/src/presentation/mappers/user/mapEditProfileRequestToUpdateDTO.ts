import UpdateUserDTO from "../../../application/DTOs/user/updateUser.dto";
import EditProfileRequestDTO from "../../DTOs/candidate/editProfileRequest.dto";

export default function mapEditProfileRequestToUpdateDTO(requestDto : EditProfileRequestDTO) : UpdateUserDTO {
    return {
        _id:requestDto.userId,
        name:requestDto.name,
        headline:requestDto.headline,
        summary:requestDto.summary,
        location:{
            city:requestDto.city,
            district:requestDto.district,
            state:requestDto.state,
            country:requestDto.country,
            pincode:requestDto.pincode
        }
    }
}

// id:requestDto.id,
//         name:requestDto.name,
//         role:requestDto.role,
//         about:requestDto.about,
//         city:requestDto.city,
//         district:requestDto.district,
//         state:requestDto.state,
//         country:requestDto.country  