import { inject, injectable } from 'tsyringe';
import IDeleteChatUsecase from '../../interfaces/usecases/chat/IDeleteChat.usecase';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';

@injectable()
export default class DeletechatUsecase implements IDeleteChatUsecase {
  constructor(@inject('IChatRepository') private _repo: IChatRepository) {}

  async execute(chatId: string): Promise<void> {
    await this._repo.delete(chatId);
  }
}
