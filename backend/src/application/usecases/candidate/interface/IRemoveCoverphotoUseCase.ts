export default interface IRemoveCoverphotoUseCase {
    execute(candidateId : string, cloudinaryPublicId : string) : Promise<void>
}