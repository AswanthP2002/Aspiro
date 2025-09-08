import Candidate from "../../../../domain/entities/candidate/candidates";
import CandidateDTO from "../../../DTOs/candidate/candidateDTO";

export default interface ILoadCandidatePersonalDataUseCase {
    execute(id : string) : Promise<CandidateDTO | null>
}