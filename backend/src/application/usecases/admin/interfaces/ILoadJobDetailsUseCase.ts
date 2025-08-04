export default interface ILoadJobDetailsUseCase {
    execute(id : string) : Promise<any[]>
}