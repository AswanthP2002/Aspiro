import ChatDTO from '../../../DTOs/chat/chat.dto';

export default interface IGetchatsUsecase {
  execute(conversationId: string, logedUserId: string): Promise<ChatDTO[] | null>;
}
