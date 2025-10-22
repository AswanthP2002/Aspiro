import { inject, injectable } from 'tsyringe';
import IBlockCandidateUseCase from './interfaces/IBlockCandidate.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export class BlockCandidateUseCase implements IBlockCandidateUseCase {
  constructor(@inject("IUserRepository") private _userRepoistory : IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    const result = await this._userRepoistory.blockUser(id)
    return result;
  }
}
