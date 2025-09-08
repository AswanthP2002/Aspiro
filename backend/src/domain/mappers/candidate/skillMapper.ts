import { SkillDTO } from "../../../presentation/controllers/dtos/candidate/skillsDTO";
import Skills from "../../entities/candidate/skills";


export default function createSkillsFromSkillDTO(dto : SkillDTO) : Skills{
    return {
        ...dto
    }
}