import Education from "../../../../domain/entities/candidate/educations";

export default interface IAddEducationUseCase {
    execute(education : Education, candidateId : string) : Promise<string | null>
}