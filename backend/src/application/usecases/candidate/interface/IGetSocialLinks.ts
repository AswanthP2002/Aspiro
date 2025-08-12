import SocialLinks from "../../../../domain/entities/socialLinks";

export default interface IGetSocialLinksUseCase {
    execute(candidateId : string) : Promise<SocialLinks[] | null>
}