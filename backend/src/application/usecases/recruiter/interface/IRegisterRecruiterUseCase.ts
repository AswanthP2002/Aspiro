
import CreateRecruiterDTO, { RecruiterDTO } from "../../../DTOs/recruiter/recruiterDTO";

export default interface IRegisterRecruiterUseCase {
    execute(createRecruiterDto : CreateRecruiterDTO) : Promise<RecruiterDTO | null>
}