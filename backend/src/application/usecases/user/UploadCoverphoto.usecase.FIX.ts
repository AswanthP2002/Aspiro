import IUserRepository from '../../../domain/interfaces/IUserRepo';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import { UploadCoverPhotoDTO } from '../../DTOs/user/uploadCoverPhoto.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IUploadUserCoverPhotoUsecase from '../../interfaces/usecases/user/IUploadUserCoverPhoto.usecase.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';
import UploadCoverPhotoResponseDTO from '../../DTOs/user/uploadCoverPhotoResponse.dto';

type CloudinaryUploadResultType = {
  secure_url: string;
  public_id: string;
};

@injectable()
export default class UploadUserCoverPhotoUsecase implements IUploadUserCoverPhotoUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(
    uploadCoverPhotoDto: UploadCoverPhotoDTO
  ): Promise<UploadCoverPhotoResponseDTO | null> {
    const { userId } = uploadCoverPhotoDto;
    const cloudinaryResult = (await imgUploadToCloudinary(
      uploadCoverPhotoDto.imageFile,
      'user',
      uploadCoverPhotoDto.publicId
    )) as CloudinaryUploadResultType;
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
      const dto = this._mapper.userToCoverPhotoUploadResponseDTO(result);
      return dto;
    }
    return null;
  }
}
