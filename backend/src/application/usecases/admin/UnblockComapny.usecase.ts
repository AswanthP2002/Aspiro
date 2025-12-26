import { plainToInstance } from 'class-transformer';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import IUnblockCompanyUseCase from './interfaces/IUnblockCompany.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IUnblockRecruiterUsecase from './interfaces/IUnblockCompany.usecase.FIX';

@injectable()
export default class UnblockRecruiterUsecase implements IUnblockRecruiterUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(id: string): Promise<RecruiterDTO | null> {
    const result = await this._recruiterRepo.update(id, { isSuspended: false });
    if (result) {
      const dto = plainToInstance(RecruiterDTO, result);
      return dto;
    }
    return result;
  }
}
