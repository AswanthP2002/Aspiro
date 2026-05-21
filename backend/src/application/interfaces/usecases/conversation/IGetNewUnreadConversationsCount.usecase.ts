export default interface IGetNewUnreadConversationsCount {
  execute(logedUserId: string): Promise<number | null>;
}
