export default interface IBlockJobUseCase {
    execute(id : string) : Promise<boolean>
}