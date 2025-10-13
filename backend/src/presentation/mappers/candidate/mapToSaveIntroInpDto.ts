import { SaveIntroDetailsInpDTO } from "../../../application/DTOs/candidate/saveIntroDetails.dto";
import { SaveIntroDetailsRequestDTO } from "../../DTOs/candidate/saveIntroDetailsRequestDTO";

export default function mapToSaveIntroInpDTO(id : string, requestDto : SaveIntroDetailsRequestDTO) : SaveIntroDetailsInpDTO {
    return{
        id:id,
        city:requestDto.city,
        district:requestDto.district,
        state:requestDto.state,
        country:requestDto.country,
        role:requestDto.role,
        pincode:requestDto.pincode,
        summary:requestDto.summary
    }
}