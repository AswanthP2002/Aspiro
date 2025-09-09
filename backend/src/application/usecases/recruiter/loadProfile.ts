import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import { RecruiterProfileAggregatedDTO } from "../../DTOs/recruiter/recruiterProfileAggregatedData";
import mapToRecruiterAggregatedDTOFromAggregatedData from "../../mappers/recruiter/mapToRecruiterAggregatedDTOFromRecruiterAggregatedData";
import ILoadRecruiterProfileUseCase from "./interface/ILoadRecruiterProfileUseCase";

export class LoadRecruiterProfileDataUseCase implements ILoadRecruiterProfileUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(id : string) : Promise<RecruiterProfileAggregatedDTO | null> {
        const recruiterDetails = await this.recruiterRepo.aggregateRecruiterProfile(id)
        if(recruiterDetails){
            const dto = mapToRecruiterAggregatedDTOFromAggregatedData(recruiterDetails)
            return dto
        }
        return null
    }
}