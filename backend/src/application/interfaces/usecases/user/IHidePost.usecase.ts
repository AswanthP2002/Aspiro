import UserDTO from '../../../DTOs/user/user.dto';

export interface IHidePostUsecase {
  execute(userId: string, postId: string): Promise<UserDTO | null>;
}
