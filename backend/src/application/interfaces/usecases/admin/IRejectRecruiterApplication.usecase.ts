import RejectRecruiterApplicationDTO from "../../../DTOs/admin/rejectRecruiter.dto";
import { RecruiterDTO } from "../../../DTOs/recruiter/recruiter.dto";

export default interface IRejectRecruiterApplication {
    execute(rejectRecruiterApplicationDto: RejectRecruiterApplicationDTO): Promise<RecruiterDTO | null>
}