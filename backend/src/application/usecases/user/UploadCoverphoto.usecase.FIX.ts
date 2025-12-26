import IUserRepository from '../../../domain/interfaces/IUserRepo';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import { UploadCoverPhotoDTO } from '../../DTOs/candidate -LEGACY/uploadCoverPhoto.dto.FIX';
import UserDTO, { UserDto } from '../../DTOs/user/user.dto.FIX';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IUploadUserCoverPhotoUsecase from '../../interfaces/usecases/user/IUploadUserCoverPhoto.usecase.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class UploadUserCoverPhotoUsecase implements IUploadUserCoverPhotoUsecase {
  private _mapper: UserMapper;
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {
    this._mapper = new UserMapper();
  }

  async execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UserDto | null> {
    const { userId } = uploadCoverPhotoDto;
    const cloudinaryResult: any = await imgUploadToCloudinary(
      uploadCoverPhotoDto.imageFile,
      'user',
      uploadCoverPhotoDto.publicId
    );
    const { secure_url, public_id } = cloudinaryResult;
    const updateData = this._mapper.updateDtoToUser({
      _id: userId as string,
      coverPhoto: {
        cloudinarySecureUrl: secure_url,
        cloudinaryPublicId: public_id,
      },
    });

    const result = await this._userRepo.update(userId, updateData);

    if (result) {
      const dto = plainToInstance(UserDto, result);
      return dto;
    }
    return null;
  }
}
