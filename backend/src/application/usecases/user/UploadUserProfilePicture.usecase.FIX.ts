import IUserRepository from '../../../domain/interfaces/IUserRepo';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import { UploadProfilePictureDTO } from '../../DTOs/user/uploadProfilePicture.dto.FIX';
import IUploadUserProfilePictureUsecase from '../../interfaces/usecases/user/IUploadUserProfilePicture.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import UserMapper from '../../mappers/user/User.mapperClass';
import ProfilePictureUPloadResponseDTO from '../../DTOs/user/profileUploadResponse.dto';

type UploadResponseType = {
  secure_url: string;
  public_id: string;
};

@injectable()
export default class UploadUserProfilePictureUsecase implements IUploadUserProfilePictureUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(
    uploadProfilepictureDto: UploadProfilePictureDTO
  ): Promise<ProfilePictureUPloadResponseDTO | null> {
    const { userId } = uploadProfilepictureDto;
    const cloudinaryResult = (await imgUploadToCloudinary(
      uploadProfilepictureDto.imageFile,
      'user',
      uploadProfilepictureDto.publicId
    )) as UploadResponseType;

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
      const dto = this._mapper.userToProfilePictureUploadResponseDTO(result);
      return dto;
    }

    return null;
  }
}
