import { RecruiterDTO } from "../../../DTOs/recruiter/recruiterDTO";
import VerifyRecruiterDTO from "../../../DTOs/recruiter/verifyRecruiterDTO";

export default interface IVerifyRecruiterUseCase {
    execute(verifyRecruiterDto : VerifyRecruiterDTO) : Promise<RecruiterDTO | null>
}