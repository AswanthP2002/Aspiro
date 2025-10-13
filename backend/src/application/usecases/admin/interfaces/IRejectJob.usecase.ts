export default interface IRejectJobUseCase {
    execute(id : string) : Promise<boolean>
}