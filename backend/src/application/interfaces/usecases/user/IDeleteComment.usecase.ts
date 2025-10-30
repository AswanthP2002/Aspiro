export default interface IDeleteCommentUsecase {
    execute(commentId : string) : Promise<void>
}