import User from '../../../../domain/entities/shared/User.entitty';
import { RemoveCoverPhotoDTO } from '../../../DTOs/candidate/removeProfilePhoto.dto';

export default interface IRemoveCoverphotoUseCase {
  execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<User | null>;
}
