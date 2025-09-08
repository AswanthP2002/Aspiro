import CandidateDTO from "../../../DTOs/candidate/candidateDTO";
import { SaveIntroDetailsInpDTO } from "../../../DTOs/candidate/saveIntroDetailsDTO";

export default interface ISaveIntroDetailsUseCase {
    execute(saveIntroDetailsInpDto : SaveIntroDetailsInpDTO) : Promise<CandidateDTO | null>
}