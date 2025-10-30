import { inject, injectable } from "tsyringe";
import IDeleteCommentUsecase from "../../interfaces/usecases/user/IDeleteComment.usecase";
import ICommentRepository from "../../../domain/interfaces/IComment.repository";

@injectable()
export default class DeleteCommentUsecase implements IDeleteCommentUsecase {
    constructor(@inject('ICommentRepository') private _commentRepo: ICommentRepository) {}

    async execute(commentId: string): Promise<void> {
        await this._commentRepo.delete(commentId)
    }
}