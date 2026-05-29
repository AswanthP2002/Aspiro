export default interface IGetNewUnreadConversationsCount {
  execute(logedUserId: string): Promise<{ conversationIds: string[]; count: number } | null>;
}
