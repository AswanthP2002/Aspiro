import JobApplication from "../../../../domain/entities/candidate/jobApplication";

export default interface ISaveJobApplicationUseCase {
    execute(jobApplication : JobApplication, jobId : string, candidateId : string) : Promise<string | null>
}