import UpdateUserDTO from "../../../application/DTOs/user/updateUser.dto.FIX";
import SaveUsersBasicsRequestDto from "../../DTOs/user/saveUsersBasicsRequest.dto";

export default function mapToUpdateUserDTO(requestDto : SaveUsersBasicsRequestDto) : UpdateUserDTO {
    return {
        _id:requestDto.id,
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