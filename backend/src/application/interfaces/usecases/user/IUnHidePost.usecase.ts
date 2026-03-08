import UserDTO from '../../../DTOs/user/user.dto.FIX';

export interface IUnHidePostUsecase {
  execute(userId: string, postId: string): Promise<UserDTO | null>;
}
