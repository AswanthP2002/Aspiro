import { ObjectId } from "mongoose";
import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import Experience from "../../../domain/entities/candidate/experience";
import ILoadExperiencesUseCase from "./interface/ILoadExperiencesUseCase";

export default class GetExperienceUseCase implements ILoadExperiencesUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(candidateId : string) : Promise<Experience[] | null> {
        const result = await this._experienceRepo.findAll(candidateId)
        return result
    }
}