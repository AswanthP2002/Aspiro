import CreatePostDTO, { PostDTO } from '../../../DTOs/post/post.dto';

export default interface ICreatePostUsecase {
  execute(createPostDto: CreatePostDTO): Promise<PostDTO | null>;
}
