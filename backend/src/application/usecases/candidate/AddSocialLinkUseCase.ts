import SocialLinks from "../../../domain/entities/socialLinks";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IAddSocialLinkUsecase from "./interface/IAddSocialLinkUseCase";

export default class AddSocialLinkUseCase implements IAddSocialLinkUsecase {
    constructor(private _ICandidateRepo : ICandidateRepo) {}
    async execute(candidateId: string, domain: string, url: string): Promise<boolean | null> {
        const saveLink : SocialLinks = {
            domain:domain,
            url:url
        }

        const result = await this._ICandidateRepo.addSocialLink(candidateId, saveLink)
        return result
    }
}
