import ApplicationDetailsAggregatedDTO from "../../../DTOs/recruiter/ApplicationDetailsAggDTO";

export default interface IGetJobApplicationDetailsUseCase {
    execute(applicationId : string) : Promise<ApplicationDetailsAggregatedDTO | null>
}