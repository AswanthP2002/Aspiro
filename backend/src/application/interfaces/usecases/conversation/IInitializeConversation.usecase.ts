import ConversationDTO from '../../../DTOs/conversation/conversation.dto';

export default interface IInitializeConversation {
  execute(senderId: string, recipientId: string): Promise<ConversationDTO | null>;
}
