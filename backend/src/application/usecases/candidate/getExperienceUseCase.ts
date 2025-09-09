import { ObjectId } from "mongoose";
import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import Experience from "../../../domain/entities/candidate/experience";
import ILoadExperiencesUseCase from "./interface/ILoadExperiencesUseCase";
import { ExperienceDTO } from "../../../presentation/controllers/dtos/candidate/experienceDTO";
import mapToExperienceDTO from "../../mappers/candidate/mapToExperienceDTO";

export default class GetExperienceUseCase implements ILoadExperiencesUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(candidateId : string) : Promise<ExperienceDTO[] | null> {
        const result = await this._experienceRepo.findWithCandidateId(candidateId)
        if(result){
            const dto : ExperienceDTO[] = []
            result.forEach((exp : Experience) => {
                dto.push(mapToExperienceDTO(exp))
            })
            return dto
        }
        return null
    }
}