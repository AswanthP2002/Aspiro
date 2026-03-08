export default interface IDeletePostUsecase {
  execute(postId: string): Promise<void>;
}
