import Education from "../../../../domain/entities/candidate/educations";
import { CreateEducationDTO, EducationDTO } from "../../../DTOs/candidate/educationDTO";

export default interface IAddEducationUseCase {
    execute(createEducationDto : CreateEducationDTO) : Promise<EducationDTO | null>
}