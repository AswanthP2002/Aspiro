import ChatDeleteForAll from '../../../DTOs/chat/deleteChatForAll.dto';

export default interface IDeleteChatUsecase {
  execute(dto: ChatDeleteForAll): Promise<void>;
}
