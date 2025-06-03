import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";

export default class DeleteExperienceUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(experienceId : string) : Promise<boolean> {
        const result = await this._experienceRepo.deleteExperience(experienceId)
        return result
    }
}