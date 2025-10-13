export default interface ILoadJobDetailsCandidateSideUseCase {
    execute(jobId : string) : Promise<any>
}

//this one is going to replace by a new common file for candidate/admin/recruiter
//new file is commonly created at usecase folder