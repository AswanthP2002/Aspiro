import Candidate from "../../../../domain/entities/candidate/candidates";
import CandidateDTO, { EditCandidateDTO } from "../../../DTOs/candidate/candidateDTO";

export default interface IEditProfileUseCase {
    execute(editCandidateDto : EditCandidateDTO) : Promise<CandidateDTO | null>
}