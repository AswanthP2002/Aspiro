export default interface IFinalizeShortlist {
    execute(jobId : string, recruiterId : string, applications : any) : Promise<string | null>
}