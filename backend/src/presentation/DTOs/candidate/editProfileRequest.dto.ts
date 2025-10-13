import { StringMappingType } from "typescript"

export default interface EditProfileRequestDTO {
    id : string
    name : string
    role : string
    about : string
    city : string
    district : string
    state : string
    country : string
    pincode : string
}

// id:requestDto.id,
//         name:requestDto.name,
//         role:requestDto.role,
//         about:requestDto.about,
//         city:requestDto.city,
//         district:requestDto.district,
//         state:requestDto.state,
//         country:requestDto.country  