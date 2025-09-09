import mongoose from "mongoose";
import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import { createEducationFromDTO } from "../../../domain/mappers/candidate/educationMapper";
import { EducationSchema } from "../../../presentation/controllers/dtos/candidate/educationDTO";
import IAddEducationUseCase from "./interface/IAddEducationUseCase";
import { CreateEducationDTO, EducationDTO } from "../../DTOs/candidate/educationDTO";
import mapToEducationFromCreateEducationDTO from "../../mappers/candidate/mapToEducationFromCreateEducation";
import mapToEducationDTOFromEducation from "../../mappers/candidate/mapToEducationDTOFromEducation";

export default class AddEducationUseCase implements IAddEducationUseCase {
    constructor(private _iEducationRepo : IEducationRepo){}

    async execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null> {
        const newEducation = mapToEducationFromCreateEducationDTO(createEducationDto)
        const result = await this._iEducationRepo.create(newEducation)
        if(result){
            const dto = mapToEducationDTOFromEducation(result)
            return dto
        }

        return null
    }
}