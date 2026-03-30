import SavePostDTO from '../../../DTOs/post/savePost.dto';

export default interface IToggleSavePostUsecase {
  execute(userId: string, postId: string): Promise<SavePostDTO | null>;
}
