import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import mongoose from "mongoose";
import { SkillSchema } from "../../../presentation/controllers/dtos/candidate/skillsDTO";
import createSkillsFromSkillDTO from "../../../domain/mappers/candidate/skillMapper";
import IAddSkillsUseCase from "./interface/IAddSkillUseCase";

export default class AddSkill implements IAddSkillsUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(candidateId : string, skill : Skills) : Promise<string | null>{
        const parsedSkill = SkillSchema.parse(skill)
        const skillModal = createSkillsFromSkillDTO(parsedSkill)
        skillModal.candidateID = new mongoose.Types.ObjectId(candidateId)
        const result = await this._skillRepo.create(skillModal)
        return result
    }
}