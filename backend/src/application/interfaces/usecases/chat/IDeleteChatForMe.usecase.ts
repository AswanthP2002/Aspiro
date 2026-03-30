import ChatDTO from '../../../DTOs/chat/chat.dto';

export default interface IDeleteChatForMeUsecase {
  execute(chatId: string, logedUserId: string): Promise<ChatDTO | null>;
}
