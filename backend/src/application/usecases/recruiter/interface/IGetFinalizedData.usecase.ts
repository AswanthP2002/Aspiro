export default interface IGetFinalizedShortlistData {
    execute(jobId : string) : Promise<any[]>
}