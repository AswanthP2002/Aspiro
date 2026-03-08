import { inject, injectable } from 'tsyringe';
import IGetchatsUsecase from '../../interfaces/usecases/user/IGetChats.usecase';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import ChatDTO from '../../DTOs/user/chat.dto';

@injectable()
export default class GetChatsUsecase implements IGetchatsUsecase {
  constructor(@inject('IChatRepository') private _repo: IChatRepository) {}

  async execute(conversationId: string): Promise<ChatDTO[] | null> {
    const result = await this._repo.getChatsByConversationId(conversationId);

    if (result) {
      return result as ChatDTO[];
    }

    return null;
  }
}
