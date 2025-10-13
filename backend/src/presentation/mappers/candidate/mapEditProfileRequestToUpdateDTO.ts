import UpdateCandidateDTO from "../../../application/DTOs/candidate/updateCandidate.dto";
import EditProfileRequestDTO from "../../DTOs/candidate/editProfileRequest.dto";

export default function mapEditProfileRequestToUpdateDTO(requestDto : EditProfileRequestDTO) : UpdateCandidateDTO {
    return {
        _id:requestDto.id,
        name:requestDto.name,
        jobTitle:requestDto.role,
        about:requestDto.about,
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