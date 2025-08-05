import Resume from "../../../domain/entities/candidate/resume";
import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import ILoadResumeUseCase from "./interface/ILoadResumesUseCase";

export default class LoadResumesUseCase implements ILoadResumeUseCase {
    constructor(private _iResumeRepo : IResumeRepo){}

    async execute(candidateId : string) : Promise<Resume[] | null> {
        const result = await this._iResumeRepo.findAll(candidateId)
        return result
    }
}