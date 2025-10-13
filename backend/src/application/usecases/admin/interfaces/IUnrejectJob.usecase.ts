export default interface IUnrejectJobUseCase {
    execute(id : string) : Promise<boolean>
}