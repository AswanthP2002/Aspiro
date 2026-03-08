import ConversationDTO from '../../../DTOs/user/conversation.dto';

export default interface IGetConversationsUsecase {
  execute(logedUserId: string): Promise<ConversationDTO[] | null>;
}
