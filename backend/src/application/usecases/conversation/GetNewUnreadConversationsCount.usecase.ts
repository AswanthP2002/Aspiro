import { injectable, inject } from 'tsyringe';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import IGetNewUnreadConversationsCount from '../../interfaces/usecases/conversation/IGetNewUnreadConversationsCount.usecase';

@injectable()
export default class GetNewUnreadConversationsCountUsecase implements IGetNewUnreadConversationsCount {
  constructor(@inject('IConversationRepository') private _repo: IConversationRepo) {}

  async execute(logedUserId: string): Promise<number | null> {
    const result = await this._repo.getUnreadConversationsCount(logedUserId);
    return result;
  }
}
