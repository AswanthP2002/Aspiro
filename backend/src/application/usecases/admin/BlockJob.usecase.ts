import IJobRepo from '../../../domain/interfaces/IJobRepo';
import IBlockJobUseCase from './interfaces/IBlockJob.usecase';

export class BlockJobUseCase implements IBlockJobUseCase {
  constructor(private _jobRepo: IJobRepo) {}

  async execute(id: string): Promise<boolean> {
    const result = await this._jobRepo.blockJob(id);
    return result;
  }
}
