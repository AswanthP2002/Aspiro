import {
  LoginCandidateInpDTO,
  LoginCandidateOutDTO,
} from '../../../DTOs/candidate/candidateLogin.dto';

export default interface ILoginCandidateUseCase {
  execute(
    logincandidateinpDto: LoginCandidateInpDTO
  ): Promise<LoginCandidateOutDTO>;
}
