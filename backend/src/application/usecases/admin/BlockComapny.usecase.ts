import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import IBlockRecruiterUsecase from './interfaces/IBlockCompany.usecase.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class BlockRecruiterUsecase implements IBlockRecruiterUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(id: string): Promise<RecruiterDTO | null> {
    const result = await this._recruiterRepo.update(id, { isSuspended: true });
    if (result) {
      const dto = await plainToInstance(RecruiterDTO, result);
      return dto;
    }
    return result;
  }
}
