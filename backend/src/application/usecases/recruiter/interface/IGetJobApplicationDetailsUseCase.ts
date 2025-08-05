import JobApplication from "../../../../domain/entities/candidate/jobApplication";

export default interface IGetJobApplicationDetailsUseCase {
    execute(jobId : string) : Promise<JobApplication[] | any>
}