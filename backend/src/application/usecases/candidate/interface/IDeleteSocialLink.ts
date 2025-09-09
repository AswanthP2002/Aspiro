import { RemoveSocialLinkDTO } from "../../../DTOs/candidate/socialLinkDTO";

export default interface IDeleteSocialLinkUseCase {
    execute(removeSocialLinkDto : RemoveSocialLinkDTO) : Promise<void>
}