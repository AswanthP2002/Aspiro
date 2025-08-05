import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import IDeleteSkillsUseCase from "./interface/IDeleteSkillsUseCase";

export default class DeleteSkillUseCase implements IDeleteSkillsUseCase {
    constructor(private _skillRepo : ISkillRepo){}

    async execute(skillId : string) : Promise<boolean> {
        const result = await this._skillRepo.delete(skillId)
        return result
    }
}