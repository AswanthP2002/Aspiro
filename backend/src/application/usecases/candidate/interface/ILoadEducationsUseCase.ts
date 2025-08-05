import Education from "../../../../domain/entities/candidate/educations";

export default interface ILoadEducationsUseCase {
    execute(candidateId : string) : Promise<Education[] | null>
}