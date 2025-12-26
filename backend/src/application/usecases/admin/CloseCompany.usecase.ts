import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import IDeleteRecruiterUsecase from './interfaces/ICloseCompany.usecase';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class DeleteRecruiterUsecaase implements IDeleteRecruiterUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(id: string): Promise<RecruiterDTO | null> {
    const deleteResult = await this._recruiterRepo.update(id, { isDeleted: true });
    if (deleteResult) {
      return plainToInstance(RecruiterDTO, deleteResult);
    }
    return deleteResult;
  }
}
