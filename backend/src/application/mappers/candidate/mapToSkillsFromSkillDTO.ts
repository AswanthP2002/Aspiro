import Skills from "../../../domain/entities/candidate/skills";
import { SkillDTO } from "../../DTOs/candidate/SkillDTO";

export default function mapToSkillDTOFromSkills(skill : Skills) : SkillDTO {
    return {
        _id:skill._id,
        skill:skill.skill,
        level:skill.level,
        type:skill.type,
        candidateId:skill.candidateId,
    }
}