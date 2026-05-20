import { inject, injectable } from 'tsyringe';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import IDeleteConversationUsecase from '../../interfaces/usecases/conversation/IDeleteConversation.usecase';

@injectable()
export default class DeleteConversationUsecase implements IDeleteConversationUsecase {
  constructor(@inject('IConversationRepository') private _convRepo: IConversationRepo) {}

  async execute(conversationId: string): Promise<void> {
    await this._convRepo.delete(conversationId);
  }
}
