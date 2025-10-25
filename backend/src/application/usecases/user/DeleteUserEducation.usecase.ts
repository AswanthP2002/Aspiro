import { inject, injectable } from 'tsyringe';
import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import IDeleteUserEducationUsecase from '../../interfaces/usecases/user/IDeleteUserEducation.usecase';

@injectable()
export default class DeleteUserEducationUsecase implements IDeleteUserEducationUsecase {
  constructor(@inject('IEducationRepository') private _iEducationRepo: IEducationRepo) {}

  async execute(educationId: string): Promise<void> {
    await this._iEducationRepo.delete(educationId);
  }
}
