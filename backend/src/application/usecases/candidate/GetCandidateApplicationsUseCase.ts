import JobApplicationAggregated from "../../../domain/entities/candidate/jobApplicationAggregated";
import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import JobApplicationAggregatedDTO from "../../DTOs/candidate/jobApplicationAggregatedDTO";
import mapTojobApplicationAggregatedDTOFromAggregatedData from "../../mappers/candidate/mapToJobApplAggrDTOFromJobApplAggreData";
import IGetCandidateApplicationsUseCase from "./interface/IGetCandidateApplicationsUseCase";

export default class GetCandidateApplicationsUseCase implements IGetCandidateApplicationsUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo) {}

   async execute(candidateId: string): Promise<JobApplicationAggregatedDTO[] | null> {
        const result = await this._iJobApplicationRepo.getCandidateSpecificApplications(candidateId)
        if(result){
            const dto : JobApplicationAggregatedDTO[] = []
            result.forEach((application : JobApplicationAggregated) => {
                dto.push(mapTojobApplicationAggregatedDTOFromAggregatedData(application))
                console.log('dto before sending', dto)
                
            })
            return dto
        }
        return null
    }
}