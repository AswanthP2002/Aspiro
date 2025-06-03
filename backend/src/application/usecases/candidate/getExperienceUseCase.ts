import { ObjectId } from "mongoose";
import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import Experience from "../../../domain/entities/candidate/experience";

export default class GetExperienceUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(candidateId : string) : Promise<Experience[]> {
        const result = await this._experienceRepo.getExperiences(candidateId)
        return result
    }
}