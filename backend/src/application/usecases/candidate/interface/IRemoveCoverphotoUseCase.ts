export default interface IRemoveCoverphotoUseCase {
    execute(candidateId : string, cloudinaryPublicId : string) : Promise<boolean | null>
}