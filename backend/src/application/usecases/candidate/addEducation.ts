import mongoose from "mongoose";
import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import { createEducationFromDTO } from "../../../domain/mappers/candidate/educationMapper";
import { EducationSchema } from "../../../presentation/controllers/dtos/candidate/educationDTO";
import IAddEducationUseCase from "./interface/IAddEducationUseCase";

export default class AddEducationUseCase implements IAddEducationUseCase {
    constructor(private _iEducationRepo : IEducationRepo){}

    async execute(education : Education, candidateId : string) : Promise<string | null> {
        const parsedEducation = EducationSchema.parse(education)
        const educationModal = createEducationFromDTO(parsedEducation)
        educationModal.candidateId = new mongoose.Types.ObjectId(candidateId)
        const saveEducation = await this._iEducationRepo.create(educationModal)
        return saveEducation
    }
}