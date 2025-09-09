
import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import ApplicationsAggregatedDTO from "../../DTOs/recruiter/ApplicationAggDTO";
import mapToApplicationAggregatedDTOFromAggregated from "../../mappers/recruiter/mapToApplAggDTOFromApplAggregated";
import IGetJobApplicationsUseCase from "./interface/IGetJobApplicationsUseCase.ts";

export default class GetJobApplicationsUseCase implements IGetJobApplicationsUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo) {}

    async execute(jobId : string) : Promise<ApplicationsAggregatedDTO[] | null> {
        const result = await this._iJobApplicationRepo.getApplicationsByJobId(jobId)
        if(result){
            const dto : ApplicationsAggregatedDTO[] = []
            result.forEach((application) => {
                dto.push(mapToApplicationAggregatedDTOFromAggregated(application))
            })

            return dto
        }
        return null
    }
}