import Skills from "../../../../domain/entities/candidate/skills";
import { SkillDTO } from "../../../DTOs/candidate/SkillDTO";

export default interface ILoadSkillsUseCase {
    execute(candidateId : string) : Promise<SkillDTO[] | null>
}