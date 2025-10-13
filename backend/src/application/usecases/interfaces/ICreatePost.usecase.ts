import CreatePostDTO, { CreatePostResDTO } from '../../DTOs/post.dto';

export default interface ICreatPost {
  execute(createPostDto: CreatePostDTO): Promise<CreatePostResDTO | null>;
}
