import { inject, injectable } from 'tsyringe';
import IGetConversationsUsecase from '../../interfaces/usecases/user/IGetConversations.usecase';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import ConversationDTO from '../../DTOs/user/conversation.dto';

@injectable()
export default class GetconversationsUsecase implements IGetConversationsUsecase {
  constructor(@inject('IConversationRepository') private _repo: IConversationRepo) {}

  async execute(logedUserId: string): Promise<ConversationDTO[] | null> {
    const result = await this._repo.getConversations(logedUserId);

    if (result) {
      return result as ConversationDTO[];
    }

    return null;
  }
}
