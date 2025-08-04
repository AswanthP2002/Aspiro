import Experience from "../../../../domain/entities/candidate/experience";

export default interface ILoadExperiencesUseCase {
    execute(candidateId : string) : Promise<Experience[] | null>
}