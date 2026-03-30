import { inject, injectable } from 'tsyringe';
import IGetConversationsUsecase from '../../interfaces/usecases/conversation/IGetConversations.usecase';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import ConversationDTO, {
  FetchConversationsRequestDTO,
} from '../../DTOs/conversation/conversation.dto';

@injectable()
export default class GetconversationsUsecase implements IGetConversationsUsecase {
  constructor(@inject('IConversationRepository') private _repo: IConversationRepo) {}

  async execute(dto: FetchConversationsRequestDTO): Promise<ConversationDTO[] | null> {
    const { logedUserId, search, pageg, limit } = dto;
    const result = await this._repo.getConversations(logedUserId, search, pageg, limit);

    if (result) {
      return result as ConversationDTO[];
    }

    return null;
  }
}
