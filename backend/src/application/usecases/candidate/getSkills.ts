import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import { SkillDTO } from "../../DTOs/candidate/SkillDTO";
import mapToSkillDTOFromSkills from "../../mappers/candidate/mapToSkillsFromSkillDTO";
import ILoadSkillsUseCase from "./interface/ILoadSkillsUseCase";

export default class GetSkillsUseCase implements ILoadSkillsUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(candidateId : string) : Promise<SkillDTO[] | null> {
        const result = await this._skillRepo.findWithCandidateId(candidateId)
        if(result){
            const dto : SkillDTO[] = []
            result.forEach((skill : Skills) => {
                dto.push(mapToSkillDTOFromSkills(skill))
            })
            return dto
        }
        return null
    }
}