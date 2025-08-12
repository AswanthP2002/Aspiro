import SocialLinks from "../../../domain/entities/socialLinks";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IGetSocialLinksUseCase from "./interface/IGetSocialLinks";

export default class GetSocialLinksUseCase implements IGetSocialLinksUseCase {
    constructor(private _ICandidateRepo : ICandidateRepo) {}

    async execute(candidateId: string): Promise<SocialLinks[] | null> {
        const result = await this._ICandidateRepo.getSocialLinks(candidateId)
        return result
    }
}