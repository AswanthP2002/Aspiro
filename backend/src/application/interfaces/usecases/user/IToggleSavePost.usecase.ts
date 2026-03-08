import SavePostDTO from '../../../DTOs/user/savePost.dto';

export default interface IToggleSavePostUsecase {
  execute(userId: string, postId: string): Promise<SavePostDTO | null>;
}
