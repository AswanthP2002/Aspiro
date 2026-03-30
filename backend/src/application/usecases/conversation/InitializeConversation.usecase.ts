import { inject, injectable } from 'tsyringe';
import IInitializeConversation from '../../interfaces/usecases/conversation/IInitializeConversation.usecase';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import ConversationDTO from '../../DTOs/conversation/conversation.dto';

@injectable()
export default class InitializeConversationUsecase implements IInitializeConversation {
  constructor(@inject('IConversationRepository') private _repo: IConversationRepo) {}

  async execute(senderId: string, recipientId: string): Promise<ConversationDTO | null> {
    const conversation = await this._repo.initializeConversation(senderId, recipientId);

    if (conversation) {
      return conversation as ConversationDTO;
    }

    return null;
  }
}
