import ResumeDTO, { CreateResumeDTO } from "../../../DTOs/candidate/resume.dto";

export default interface IAddResumeUseCase {
    execute(addResumeDto : CreateResumeDTO) : Promise<ResumeDTO | null>
}