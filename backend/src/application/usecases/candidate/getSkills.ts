import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";

export default class GetSkillsUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(candidateId : string) : Promise<Skills[]> {
        const result = await this._skillRepo.getSkills(candidateId)
        return result
    }
}