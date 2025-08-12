export default interface IGetFavoriteJobUseCase {
    execute(candidateId : string) : Promise<any[] | null>
}