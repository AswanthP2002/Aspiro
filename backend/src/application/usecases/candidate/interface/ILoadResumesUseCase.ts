import Resume from "../../../../domain/entities/candidate/resume";
import { ResumeDTO } from "../../../DTOs/candidate/resumeDTO";

export default interface ILoadResumeUseCase {
    execute(candidateId : string) : Promise<ResumeDTO[] | null>
}