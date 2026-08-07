import { MyProfileDTO } from '../../../DTOs/user/user.dto';

export default interface ILoadMyProfileUsecase {
  execute(id: string): Promise<MyProfileDTO | null>;
}
