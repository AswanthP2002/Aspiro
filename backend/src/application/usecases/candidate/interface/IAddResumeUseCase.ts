import Resume from "../../../../domain/entities/candidate/resume";
import CreateResumeDTO, { ResumeDTO } from "../../../DTOs/candidate/resumeDTO";

export default interface IAddResumeUseCase {
    execute(addResumeDTO : CreateResumeDTO) : Promise<ResumeDTO | null>
}