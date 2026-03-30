export default interface IDeleteChatUsecase {
  execute(chatId: string): Promise<void>;
}
