export default interface ISaveFavoriteJobUseCase {
    execute(candidateId : string, jobId : string) : Promise<string | null>
}