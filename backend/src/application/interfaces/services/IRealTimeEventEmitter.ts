export default interface IRealTimeEventEmitter {
    postLiked(postId: string, userId: string): void
    postUnliked(postId: string, userId: string): void
    deletePostComment(postId: string, commentId: string): void
}