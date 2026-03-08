import { MyProfileDTO } from '../../../DTOs/user/user.dto.FIX';

export default interface ILoadMyProfileUsecase {
  execute(id: string): Promise<MyProfileDTO | null>;
}
