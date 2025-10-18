import User from '../../../domain/entities/shared/User';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import { RemoveCoverPhotoDTO } from '../../DTOs/candidate/removeProfilePhoto.dto';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import IRemoveCoverphotoUseCase from './interface/IRemoveCoverphoto.usecase';

export default class RemoveCoverphotoUseCase implements IRemoveCoverphotoUseCase {
  constructor(private _iCandidateRepo: ICandidateRepo, private _userRepo: IUserRepository) {}

  async execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<User | null> {
    const { candidateId, cloudinaryPublicId } = removeCoverphotoDto;
    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update db
    const result = await this._userRepo.update(candidateId.toString(), {
      coverPhoto: { cloudinarySecureUrl: '', cloudinaryPublicId: '' },
    });
    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
