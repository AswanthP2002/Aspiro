import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import Experience from "../../../domain/entities/candidate/experience";
import mongoose from "mongoose";
import { ExperienceSchema } from "../../../presentation/controllers/dtos/candidate/experienceDTO";
import createExperienceFromExperienceDTO from "../../../domain/mappers/candidate/experienceMapper";

export default class AddExperienceUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(experience : Experience, candidateId : mongoose.Types.ObjectId) : Promise<boolean> {
        experience.startdate = new Date(experience.startdate)
        experience.enddate = experience.enddate ? new Date(experience.enddate) : experience.enddate
        const parsedExperience = ExperienceSchema.parse(experience)
        const experienceModal = createExperienceFromExperienceDTO(parsedExperience)
        experienceModal.candidateId = new mongoose.Types.ObjectId(candidateId)
        const result = await this._experienceRepo.addExperience(experienceModal)
        return result.acknowledged
    }
}