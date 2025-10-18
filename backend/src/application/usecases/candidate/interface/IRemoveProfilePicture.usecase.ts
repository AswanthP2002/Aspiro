import User from '../../../../domain/entities/shared/User';
import RemoveProfilePhotoDTO from '../../../DTOs/candidate/removeProfilePhoto.dto';

export default interface IRemoveProfilePictureUseCase {
  execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<User | null>;
}
