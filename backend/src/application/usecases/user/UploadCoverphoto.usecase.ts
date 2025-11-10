import IUserRepository from '../../../domain/interfaces/IUserRepo';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import { UploadCoverPhotoDTO } from '../../DTOs/candidate -LEGACY/uploadCoverPhoto.dto';
import UserDTO from '../../DTOs/user/user.dto';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IUploadUserCoverPhotoUsecase from '../../interfaces/usecases/user/IUploadUserCoverPhoto.usecase';

@injectable()
export default class UploadUserCoverPhotoUsecase implements IUploadUserCoverPhotoUsecase {
  constructor(@inject('IUserRepository') private _userRepo : IUserRepository) {}

  async execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UserDTO | null> {
    const { userId } = uploadCoverPhotoDto;
    const cloudinaryResult: any = await imgUploadToCloudinary(
      uploadCoverPhotoDto.imageFile,
      'user',
      uploadCoverPhotoDto.publicId
    );
    const { secure_url, public_id } = cloudinaryResult;
    const updateData = mapUpdateUserDtoToUser({
      _id: userId as string,
      coverPhoto: {
        cloudinarySecureUrl: secure_url,
        cloudinaryPublicId: public_id,
      },
    });

    const result = await this._userRepo.update(userId, updateData);

    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }
    return null;
  }
}
