export default interface ILoadJobDetailsCandidateSideUseCase {
    execute(jobId : string) : Promise<any>
}