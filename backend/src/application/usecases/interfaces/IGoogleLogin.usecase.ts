import { LoginCandidateOutDTO } from '../../DTOs/candidate/candidateLogin.dto';

export default interface IGoogleLoginUseCase {
  execute(googleToken: string): Promise<LoginCandidateOutDTO | null>;
}
