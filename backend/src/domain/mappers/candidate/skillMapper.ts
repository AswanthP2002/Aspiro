import { SkillDTO } from "../../../presentation/controllers/dtos/candidate/skillsDTO";
import Skills from "../../entities/candidate/skills";


export default function createSkillsFromSkillDTO(dt0 : SkillDTO) : Skills{
    return {
        ...dt0
    }
}