import { inject, injectable } from 'tsyringe';
import IGetchatsUsecase from '../../interfaces/usecases/chat/IGetChats.usecase';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import ChatDTO from '../../DTOs/chat/chat.dto';

@injectable()
export default class GetChatsUsecase implements IGetchatsUsecase {
  constructor(@inject('IChatRepository') private _repo: IChatRepository) {}

  async execute(conversationId: string, logedUserId: string): Promise<ChatDTO[] | null> {
    const result = await this._repo.getChatsByConversationId(conversationId, logedUserId);

    if (result) {
      return result as ChatDTO[];
    }

    return null;
  }
}
