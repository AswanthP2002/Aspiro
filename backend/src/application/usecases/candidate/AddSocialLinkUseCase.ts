import SocialLinks from "../../../domain/entities/socialLinks";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import AddSocialLinkDTO from "../../DTOs/candidate/socialLinkDTO";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";
import IAddSocialLinkUsecase from "./interface/IAddSocialLinkUseCase";

export default class AddSocialLinkUseCase implements IAddSocialLinkUsecase {
    constructor(private _ICandidateRepo : ICandidateRepo) {}
    async execute(addSocialLinkDto : AddSocialLinkDTO): Promise<CandidateDTO | null> {
        const saveLink : SocialLinks = {
            domain:addSocialLinkDto.domain,
            url:addSocialLinkDto.url
        }

        const result = await this._ICandidateRepo.addSocialLink(addSocialLinkDto.candidateId, saveLink)

        if(result){
            const dto = mapToCandidateDTO(result)
            return result
        }
        return result
    }
}
