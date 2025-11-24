import { inject, injectable } from "tsyringe";
import IDeleteCommentUsecase from "../../interfaces/usecases/user/IDeleteComment.usecase";
import ICommentRepository from "../../../domain/interfaces/IComment.repository";
import IRealTimeEventEmitter from "../../interfaces/services/IRealTimeEventEmitter";

@injectable()
export default class DeleteCommentUsecase implements IDeleteCommentUsecase {
    constructor(
        @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
        @inject('ICommentRepository') private _commentRepo: ICommentRepository
    ) {}

    async execute(commentId: string, postId: string, userId: string): Promise<void> {
        await this._commentRepo.delete(commentId)
        this._realTimeEventEmitter.deletePostComment(postId, commentId, userId)
    }
}