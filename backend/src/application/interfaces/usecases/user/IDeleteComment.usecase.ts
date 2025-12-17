export default interface IDeleteCommentUsecase {
    execute(commentId : string, postId: string, userId: string) : Promise<void>
}