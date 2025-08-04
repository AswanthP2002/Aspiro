import Skills from "../../../../domain/entities/candidate/skills";

export default interface IAddSkillsUseCase {
    execute(candidateId : string, skill : Skills) : Promise<string | null>
}