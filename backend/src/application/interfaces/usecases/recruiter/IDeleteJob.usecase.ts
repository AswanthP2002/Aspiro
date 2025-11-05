export default interface IDeleteJobUsecase {
    execute(jobId: string) : Promise<void> 
}