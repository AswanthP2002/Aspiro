import RecruiterLoginDTO from "../../../application/DTOs/recruiter/recruiterLoginDTO";
import LoginRecruiterRequestDTO from "../../DTOs/recruiter/loginRecruiterRequestDTO";

export default function mapToLoginRecruiterDTOFromRequest(requestDto : LoginRecruiterRequestDTO) : RecruiterLoginDTO {
    return {
        email:requestDto.email,
        password:requestDto.password
    }
}