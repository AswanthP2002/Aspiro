import Candidate from '../../domain/entities/user/candidates..GARBAGE';
import CandidateRepo from '../../domain/interfaces/user/ICandidateRepo.GARBAGE';

export default class GetAuthUserUseCase {
  constructor(private candidateRepo: CandidateRepo) {}

  async execute(id: string): Promise<Candidate | null> {
    const user = await this.candidateRepo.findById(id);
    return user;
  }
}
