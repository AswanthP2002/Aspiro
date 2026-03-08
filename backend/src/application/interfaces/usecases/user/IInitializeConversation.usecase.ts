import ConversationDTO from '../../../DTOs/user/conversation.dto';

export default interface IInitializeConversation {
  execute(senderId: string, recipientId: string): Promise<ConversationDTO | null>;
}
