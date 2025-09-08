import { LoginCandidateInpDTO, LoginCandidateOutDTO } from "../../../DTOs/candidate/candidateLoginDTO";

export default interface ILoginCandidateUseCase {
    execute(logincandidateinpDto : LoginCandidateInpDTO) : Promise<LoginCandidateOutDTO>
}