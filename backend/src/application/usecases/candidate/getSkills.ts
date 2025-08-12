import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import ILoadSkillsUseCase from "./interface/ILoadSkillsUseCase";

export default class GetSkillsUseCase implements ILoadSkillsUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(candidateId : string) : Promise<Skills[] | null> {
        const result = await this._skillRepo.findWithCandidateId(candidateId)
        return result
    }
}