export default interface IAddSocialLinkUsecase {
    execute(candidateId : string, domain : string, url : string) : Promise<boolean | null>
}