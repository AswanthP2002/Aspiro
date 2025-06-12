import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import mongoose from "mongoose";
import { SkillSchema } from "../../../presentation/controllers/dtos/candidate/skillsDTO";
import createSkillsFromSkillDTO from "../../../domain/mappers/candidate/skillMapper";

export default class AddSkill {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(candidateId : string, skill : Skills){
        const parsedSkill = SkillSchema.parse(skill)
        const skillModal = createSkillsFromSkillDTO(parsedSkill)
        skillModal.candidateID = new mongoose.Types.ObjectId(candidateId)
        const result = await this._skillRepo.saveSkill(skillModal)
        return result
    }
}