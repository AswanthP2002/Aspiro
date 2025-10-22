import { inject, injectable } from 'tsyringe';
import IUnblockCandidateUseCase from './interfaces/IUnblockCandidate.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export class UnblockCandidateUseCase implements IUnblockCandidateUseCase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<boolean> {
    const result = await this._userRepository.unblockUser(userId);
    return result;
  }
}
