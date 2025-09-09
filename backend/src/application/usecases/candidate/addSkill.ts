import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import mongoose from "mongoose";
import { SkillSchema } from "../../../presentation/controllers/dtos/candidate/skillsDTO";
import createSkillsFromSkillDTO from "../../../domain/mappers/candidate/skillMapper";
import IAddSkillsUseCase from "./interface/IAddSkillUseCase";
import { CreateSkillDTO, SkillDTO } from "../../DTOs/candidate/SkillDTO";
import mapToSkills from "../../mappers/candidate/mapToSkills";
import mapToSkillsFromSkillsDTO from "../../mappers/candidate/mapToSkillsFromSkillDTO";
import mapToSkillDTOFromSkills from "../../mappers/candidate/mapToSkillsFromSkillDTO";

export default class AddSkill implements IAddSkillsUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null> {
        const newSkill = mapToSkills(createSkillDto)
        const result = await this._skillRepo.create(newSkill)
        if(result){
            const dto = mapToSkillDTOFromSkills(result)
            return dto
        }

        return null
    }

    // async execute(candidateId : string, skill : Skills) : Promise<string | null>{
    //     const parsedSkill = SkillSchema.parse(skill)
    //     const skillModal = createSkillsFromSkillDTO(parsedSkill)
    //     skillModal.candidateId = new mongoose.Types.ObjectId(candidateId)
    //     const result = await this._skillRepo.create(skillModal)
    //     return result
    // }
}