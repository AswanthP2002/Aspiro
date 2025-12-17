import { RecruiterDTO } from "../../../DTOs/recruiter/recruiter.dto";

export default interface IApproveRecruiterApplicationUsecase {
    execute(id: string): Promise<RecruiterDTO | null>
}