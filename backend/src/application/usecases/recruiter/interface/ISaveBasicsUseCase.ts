import { RecruiterDTO } from "../../../DTOs/recruiter/recruiterDTO";
import SaveIntroDetailsDTO from "../../../DTOs/recruiter/saveIntroDetailsDTO";

export default interface ISaveBasicsUseCase {
    execute(saveIntroDetailsDto : SaveIntroDetailsDTO) : Promise<RecruiterDTO | null>
}