import JobApplication from "../../../../domain/entities/candidate/jobApplication";

export default interface ISaveJobApplicationUseCase {
    execute(jobApplication : JobApplication, jobId : string, candidateId : string, resumeId : string) : Promise<string | null>
}