export default interface IDeleteConversationUsecase {
  execute(conversationId: string): Promise<void>;
}
