export default interface IDeleteSocialLinkUseCase {
    execute(candidateId : string, domain : string) : Promise<boolean | null>
}