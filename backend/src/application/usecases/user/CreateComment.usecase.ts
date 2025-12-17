import { inject, injectable } from "tsyringe";
import ICreateCommentUsecase from "../../interfaces/usecases/user/ICreateComment.usecase";
import ICommentRepository from "../../../domain/interfaces/IComment.repository";
import CommentsDTO, { CreateCommentDto } from "../../DTOs/comments.dto";
import mapCreateCommentDtoToComment from "../../mappers/user/mapCreateCommentDtoToComment.mapper";
import mapCommentToCommentDTO from "../../mappers/user/mapCommentToCommentDTO.mapper";
import IRealTimeEventEmitter from "../../interfaces/services/IRealTimeEventEmitter";

@injectable()
export default class CreateCommentUsecase implements ICreateCommentUsecase {
    constructor(
        @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
        @inject('ICommentRepository') private _commentRepo: ICommentRepository
    ) {}

    async execute(createCommentDto: CreateCommentDto): Promise<CommentsDTO | null> {
       // console.log('comment data before mapping', createCommentDto)
        const newComment = mapCreateCommentDtoToComment(createCommentDto)
      //  console.log('comment data before saving in the database', newComment)
        const result = await this._commentRepo.create(newComment)

        if(result){
            const commentDto = mapCommentToCommentDTO(result)
            this._realTimeEventEmitter.addPostComment(
                commentDto.postId as string, 
                commentDto.userId as string,
                commentDto._id as string,
                commentDto.text
            )
            return commentDto
        }

        return result
    }
}