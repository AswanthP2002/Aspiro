import { RegisterCandidateDTO } from "../../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";

export default interface IRegisterCandidateUseCase {
    execute(candidateDto : RegisterCandidateDTO) : Promise<string>
}