import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";

export default class DeleteSkillUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(skillId : string) : Promise<boolean> {
        const result = await this._skillRepo.deleteSkill(skillId)
        return result
    }
}