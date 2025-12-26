import IUserRepository from '../../../domain/interfaces/IUserRepo';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import { UploadProfilePictureDTO } from '../../DTOs/user/uploadProfilePicture.dto.FIX';
import UserDTO, { UserDto } from '../../DTOs/user/user.dto.FIX';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import IUploadUserProfilePictureUsecase from '../../interfaces/usecases/user/IUploadUserProfilePicture.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import UserMapper from '../../mappers/user/User.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class UploadUserProfilePictureUsecase implements IUploadUserProfilePictureUsecase {
  private _mapper: UserMapper;
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {
    this._mapper = new UserMapper();
  }

  async execute(uploadProfilepictureDto: UploadProfilePictureDTO): Promise<UserDto | null> {
    const { userId } = uploadProfilepictureDto;
    const cloudinaryResult: any = await imgUploadToCloudinary(
      uploadProfilepictureDto.imageFile,
      'user',
      uploadProfilepictureDto.publicId
    );
    const { secure_url, public_id } = cloudinaryResult;
    const updatedata = this._mapper.updateDtoToUser({
      _id: userId as string,
      profilePicture: {
        cloudinaryPublicId: public_id,
        cloudinarySecureUrl: secure_url,
      },
    });
    const result = await this._userRepository.update(userId, updatedata);

    if (result) {
      const dto = plainToInstance(UserDto, result)
      return dto;
    }

    return null;
  }
}
