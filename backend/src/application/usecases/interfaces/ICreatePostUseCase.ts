import CreatePostDTO, { CreatePostResDTO } from "../../DTOs/PostDTO";

export default interface ICreatPost {
    execute(createPostDto : CreatePostDTO) : Promise<CreatePostResDTO | null>
}