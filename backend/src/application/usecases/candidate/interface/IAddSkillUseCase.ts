import Skills from "../../../../domain/entities/candidate/skills";
import { CreateSkillDTO, SkillDTO } from "../../../DTOs/candidate/SkillDTO";

export default interface IAddSkillsUseCase {
    execute(createSkillDto : CreateSkillDTO) : Promise<SkillDTO | null>
}