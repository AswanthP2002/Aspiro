import IUserRepository from '../../../domain/interfaces/IUserRepo';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import { UploadProfilePictureDTO } from '../../DTOs/candidate -LEGACY/uploadProfilePicture.dto';
import UserDTO from '../../DTOs/user/user.dto';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import IUploadUserProfilePictureUsecase from '../../interfaces/usecases/user/IUploadUserProfilePicture.usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UploadUserProfilePictureUsecase implements IUploadUserProfilePictureUsecase {
  constructor(@inject('IUserRepository') private _userRepository : IUserRepository) {}

  async execute(uploadProfilepictureDto: UploadProfilePictureDTO): Promise<UserDTO | null> {
    const { userId } = uploadProfilepictureDto;
    const cloudinaryResult: any = await imgUploadToCloudinary(
      uploadProfilepictureDto.imageFile,
      'user',
      uploadProfilepictureDto.publicId
    );
    const { secure_url, public_id } = cloudinaryResult;
    const updatedata = mapUpdateUserDtoToUser({
      _id: userId as string,
      profilePicture: {
        cloudinaryPublicId: public_id,
        cloudinarySecureUrl: secure_url,
      },
    
    })
    const result = await this._userRepository.update(userId, updatedata)

    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
