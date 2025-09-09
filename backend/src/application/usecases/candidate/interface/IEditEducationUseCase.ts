
import { EducationDTO, UpdateEducationDTO } from "../../../DTOs/candidate/educationDTO";

export default interface IEditEducationUseCase {
    execute(updateEducationDto : UpdateEducationDTO) : Promise<EducationDTO | null>
}