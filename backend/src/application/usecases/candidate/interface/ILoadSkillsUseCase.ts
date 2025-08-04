import Skills from "../../../../domain/entities/candidate/skills";

export default interface ILoadSkillsUseCase {
    execute(candidateId : string) : Promise<Skills[] | null>
}