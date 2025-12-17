export default interface IRealTimeEventEmitter {
    postLiked(postId: string, userId: string): void
    postUnliked(postId: string, userId: string): void
    addPostComment(postId: string, userId: string, commentId: string, text: string): void
    deletePostComment(postId: string, commentId: string, userId: string): void
}