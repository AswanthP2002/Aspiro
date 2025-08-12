import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IDeleteSocialLinkUseCase from "./interface/IDeleteSocialLink";

export default class DeleteSocialLinkUseCase implements IDeleteSocialLinkUseCase {
    constructor(private _ICandiateRepo : ICandidateRepo) {}

    async execute(candidateId: string, domain: string): Promise<boolean | null> {
        const result = await this._ICandiateRepo.deleteSocialLink(candidateId, domain)
        return result
    }
}