import Resume from "../../../domain/entities/candidate/resume";
import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import { ResumeDTO } from "../../DTOs/candidate/resumeDTO";
import mapToResumeDTOFromResume from "../../mappers/candidate/mapToResumeDTOFromResume";
import ILoadResumeUseCase from "./interface/ILoadResumesUseCase";

export default class LoadResumesUseCase implements ILoadResumeUseCase {
    constructor(private _iResumeRepo : IResumeRepo){}

    async execute(candidateId : string) : Promise<ResumeDTO[] | null> {
        const result = await this._iResumeRepo.findWithCandidateId(candidateId)
        if(result){
            const dto : ResumeDTO[] = []
            result.forEach((resume : Resume) => {
                dto.push(mapToResumeDTOFromResume(resume))
            })

            return dto
        }
        return null
    }
}