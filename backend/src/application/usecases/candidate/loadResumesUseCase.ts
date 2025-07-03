import Resume from "../../../domain/entities/candidate/resume";
import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";

export default class LoadResumesUseCase {
    constructor(private _iResumeRepo : IResumeRepo){}

    async execute(candidateId : string) : Promise<Resume[] | null> {
        const result = await this._iResumeRepo.loadResumes(candidateId)
        return result
    }
}