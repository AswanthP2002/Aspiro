import Resume from "../../../../domain/entities/candidate/resume";

export default interface ILoadResumeUseCase {
    execute(candidateId : string) : Promise<Resume[] | null>
}