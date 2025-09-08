import Skills from "../../../domain/entities/candidate/skills";
import { CreateSkillDTO } from "../../DTOs/candidate/SkillDTO";

export default function mapToSkills(createSkillDto : CreateSkillDTO) : Skills {
    return {
        level:createSkillDto.level,
        type:createSkillDto.type,
        skill:createSkillDto.skill,
        candidateId:createSkillDto.candidateId
    }
}