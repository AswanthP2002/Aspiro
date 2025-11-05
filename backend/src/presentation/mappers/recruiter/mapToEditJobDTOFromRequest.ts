import { EditJobDTO } from "../../../application/DTOs/recruiter/createJob.dto";
import EditJobRequestDTO from "../../DTOs/recruiter/editJobRequest.dto";

export default function mapToEditJobDTOFromRequest(requestDto: EditJobRequestDTO): EditJobDTO {
    return {
        ...requestDto
    }
}