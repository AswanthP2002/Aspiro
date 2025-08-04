import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import Experience from "../../../domain/entities/candidate/experience";
import mongoose from "mongoose";
import { ExperienceSchema } from "../../../presentation/controllers/dtos/candidate/experienceDTO";
import createExperienceFromExperienceDTO from "../../../domain/mappers/candidate/experienceMapper";
import IAddExperience from "./interface/IAddExperienceUseCase";

export default class AddExperienceUseCase implements IAddExperience{
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(experience : Experience, candidateId : string) : Promise<string | null> {
        experience.startdate = new Date(experience.startdate)
        experience.enddate = experience.enddate ? new Date(experience.enddate) : experience.enddate
        const parsedExperience = ExperienceSchema.parse(experience)
        const experienceModal = createExperienceFromExperienceDTO(parsedExperience)
        experienceModal.candidateId = new mongoose.Types.ObjectId(candidateId)
        const result = await this._experienceRepo.create(experienceModal)
        return result
    }
}