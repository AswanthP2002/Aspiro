export default interface IUnsaveJobUseCase {
    execute(id : string, jobId : string) : Promise<boolean>
}