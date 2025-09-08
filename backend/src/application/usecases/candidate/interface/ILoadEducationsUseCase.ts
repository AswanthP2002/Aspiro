import Education from "../../../../domain/entities/candidate/educations";
import { EducationDTO } from "../../../DTOs/candidate/educationDTO";

export default interface ILoadEducationsUseCase {
    execute(candidateId : string) : Promise<EducationDTO[] | null>
}