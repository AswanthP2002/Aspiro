import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';
import { UploadProfilePictureDTO } from '../../DTOs/candidate/uploadProfilePicture.dto';
import UserDTO from '../../DTOs/user/user.dto';
import mapToCandidate from '../../mappers/candidate/mapToCandidate.mapper';
import mapToCandidateDTO from '../../mappers/candidate/mapToCandidateDTO.mapper';
import mapUpdateCandidateDtoToEntity from '../../mappers/candidate/mapUpdateCandidateDtoToEntity.mapper';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import IUploadProfilePictureUseCase from './interface/IUploadProfilePicture.usecase';

export default class UploadProfilePictureUseCase implements IUploadProfilePictureUseCase {
  constructor(private _ICandidateRepo: ICandidateRepo, private _userRepo: IUserRepository) {}

  async execute(uploadProfilepictureDto: UploadProfilePictureDTO): Promise<UserDTO | null> {
    const { candidateId } = uploadProfilepictureDto;
    const cloudinaryResult: any = await imgUploadToCloudinary(
      uploadProfilepictureDto.imageFile,
      'candidate',
      uploadProfilepictureDto.publicId
    );
    const { secure_url, public_id } = cloudinaryResult;
    const updateData = mapUpdateUserDtoToUser({
      _id: candidateId.toString(),
      profilePicture: {
        cloudinarySecureUrl: secure_url,
        cloudinaryPublicId: public_id,
      },
    });
    const result = await this._userRepo.update(candidateId.toString(), updateData);

    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
    // const result = await this._ICandidateRepo.uploadProfilePhoto(
    //   uploadProfilepictureDto.candidateId,
    //   secure_url,
    //   public_id
    // );

    // if (result) {
    //   const dto = mapToCandidateDTO(result);
    //   return dto;
    // }
    // return null;
  }
}
