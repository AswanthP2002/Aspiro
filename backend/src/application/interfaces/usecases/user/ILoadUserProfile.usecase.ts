import UserDTO from '../../../DTOs/user/user.dto';

export default interface ILoadUserProfileUsecase {
  execute(id: string): Promise<UserDTO | null>;
}
