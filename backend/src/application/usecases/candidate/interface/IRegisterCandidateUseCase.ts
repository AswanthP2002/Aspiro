import { RegisterCandidateDTO } from "../../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";
import CandidateDTO from "../../../DTOs/candidate/candidateDTO";
import CreateCandidateDTO from "../../../DTOs/candidate/createCandidateDTO";

export default interface IRegisterCandidateUseCase {
    execute(createCandidateDto : CreateCandidateDTO) : Promise<CandidateDTO | null>
}