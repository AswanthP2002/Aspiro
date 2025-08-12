import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import IRejectCandidateUseCase from "./interface/IRejectCandidateUseCase";
import IRejectCandidate from "./interface/IRejectCandidateUseCase";

export default class RejectCandidateUseCase implements IRejectCandidateUseCase {
    constructor(private _jobApplicationRepo : IJobApplicationRepo){}

    async execute(applicationId: string, candidateId: string): Promise<boolean | null> {
        const rejectResult = await this._jobApplicationRepo.rejectJobApplication(applicationId)

        return rejectResult
    }
}