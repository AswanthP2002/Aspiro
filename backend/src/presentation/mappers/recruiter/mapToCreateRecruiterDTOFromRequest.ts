import CreateRecruiterDTO from "../../../application/DTOs/recruiter/recruiterDTO";
import RegisterRecruiterRequestDTO from "../../DTOs/recruiter/registerRecruiterRequestDTO";

export default function mapToCreateRecruiterDTOFromRequest(requestDto : RegisterRecruiterRequestDTO) : CreateRecruiterDTO {
    return {
        email:requestDto.email,
        password:requestDto.password,
        username:requestDto.username,
        phone:requestDto.phone
    }
}