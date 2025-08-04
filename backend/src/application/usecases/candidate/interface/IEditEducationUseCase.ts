import Education from "../../../../domain/entities/candidate/educations";

export default interface IEditEducationUseCase {
    execute(educationId : string, education : Education) : Promise<boolean>
}