import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import IDeleteExperienceUseCase from "./interface/IDeleteExperienceUseCase";

export default class DeleteExperienceUseCase implements IDeleteExperienceUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(experienceId : string) : Promise<boolean> {
        const result = await this._experienceRepo.delete(experienceId)
        return result
    }
}