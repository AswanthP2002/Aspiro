import Candidate from '../../domain/entities/user/candidates.LEGACY';
import CandidateRepo from '../../domain/interfaces/candidate/ICandidateRepo';

export default class GetAuthUserUseCase {
  constructor(private candidateRepo: CandidateRepo) {}

  async execute(id: string): Promise<Candidate | null> {
    const user = await this.candidateRepo.findById(id);
    return user;
  }
}
