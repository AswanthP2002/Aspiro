import { injectable, inject } from 'tsyringe';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import IGetNewUnreadConversationsCount from '../../interfaces/usecases/conversation/IGetNewUnreadConversationsCount.usecase';

@injectable()
export default class GetNewUnreadConversationsCountUsecase implements IGetNewUnreadConversationsCount {
  constructor(@inject('IConversationRepository') private _repo: IConversationRepo) {}

  async execute(logedUserId: string): Promise<{ conversationIds: string[]; count: number } | null> {
    const result = await this._repo.getUnreadConversationsCount(logedUserId);
    if (result) {
      const conversationIds: string[] = [];
      result.forEach((data) => {
        conversationIds.push(data._id as string);
      });

      return { conversationIds, count: conversationIds.length };
    }
    return result;
  }
}
