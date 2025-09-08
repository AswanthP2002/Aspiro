import { RecruiterProfileAggregatedDTO } from "../../../DTOs/recruiter/recruiterProfileAggregatedData";

export default interface ILoadRecruiterProfileUseCase {
    execute(id : string) : Promise<RecruiterProfileAggregatedDTO | null>
}