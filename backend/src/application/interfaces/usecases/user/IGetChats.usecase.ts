import ChatDTO from '../../../DTOs/user/chat.dto';

export default interface IGetchatsUsecase {
  execute(conversationId: string): Promise<ChatDTO[] | null>;
}
