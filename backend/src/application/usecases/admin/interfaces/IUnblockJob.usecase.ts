export default interface IUnblockJobUseCase {
    execute(id : string) : Promise<boolean>
}