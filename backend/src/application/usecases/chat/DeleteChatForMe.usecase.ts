import { inject, injectable } from 'tsyringe';
import IDeleteChatForMeUsecase from '../../interfaces/usecases/chat/IDeleteChatForMe.usecase';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import ChatDTO from '../../DTOs/chat/chat.dto';

@injectable()
export default class DeleteChatForMeUsecase implements IDeleteChatForMeUsecase {
  constructor(@inject('IChatRepository') private _repo: IChatRepository) {}

  async execute(chatId: string, logedUserId: string): Promise<ChatDTO | null> {
    const result = await this._repo.updateChatDeletedFor(chatId, logedUserId);
    return result ? (result as ChatDTO) : null;
  }
}
