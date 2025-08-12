export default interface IRemoveProfilePictureUseCase {
    execute(candidateId : string, cloudinaryPublicId : string) : Promise<boolean | null>
}