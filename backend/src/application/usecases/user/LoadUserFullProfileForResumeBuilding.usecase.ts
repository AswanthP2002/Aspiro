import { inject, injectable } from 'tsyringe';
import ILoadUserDetailsForResumeBuildingUsecase from '../../interfaces/usecases/user/ILoadUserDetailsForResumeBuidling.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserFullProfileDataDTO from '../../DTOs/user/user.fullProfileData.dto';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class LoadUserFullProfileForResumeBuidlingUsecase implements ILoadUserDetailsForResumeBuildingUsecase {
  constructor(
    @inject('IUserRepository') private _repo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(userId: string): Promise<UserFullProfileDataDTO | null> {
    const result = await this._repo.getUserFullProfileDataAggregated(userId);
    if (result) {
      return this._mapper.userFullProfileEntityToDTO(result);
    }
    return null;
  }
}
