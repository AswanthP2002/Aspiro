import { inject, injectable } from 'tsyringe';
import IDeleteChatUsecase from '../../interfaces/usecases/chat/IDeleteChat.usecase';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';
import ChatDeleteForAll from '../../DTOs/chat/deleteChatForAll.dto';

@injectable()
export default class DeletechatUsecase implements IDeleteChatUsecase {
  constructor(
    @inject('IChatRepository') private _repo: IChatRepository,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter
  ) {}

  async execute(dto: ChatDeleteForAll): Promise<void> {
    const { chatId, conversationId, chattingPersonId } = dto;
    await this._repo.delete(chatId);
    console.log('Gooing to emit -- chat delete for all event --');
    this._realTimeEventEmitter.deleteChatForAll(chattingPersonId, chatId, conversationId);
  }
}
