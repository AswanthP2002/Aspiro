import Recruiter from "../../../domain/entities/recruiter/recruiter";
import CreateRecruiterDTO from "../../DTOs/recruiter/recruiterDTO";

export default function mapToRecruiterFromCreateRecruiterDTO(createRecruiterDto : CreateRecruiterDTO) : Recruiter {
    return {
        username:createRecruiterDto.username,
        email:createRecruiterDto.email,
        password:createRecruiterDto.password
    }
}