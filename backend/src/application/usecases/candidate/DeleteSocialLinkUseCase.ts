import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import { RemoveSocialLinkDTO } from "../../DTOs/candidate/socialLinkDTO";
import IDeleteSocialLinkUseCase from "./interface/IDeleteSocialLink";

export default class DeleteSocialLinkUseCase implements IDeleteSocialLinkUseCase {
    constructor(private _ICandiateRepo : ICandidateRepo) {}

    async execute(removeSocialLinkDto : RemoveSocialLinkDTO): Promise<void> {
        const {candidateId, domain} = removeSocialLinkDto
        const result = await this._ICandiateRepo.deleteSocialLink(candidateId, domain)
    }
}