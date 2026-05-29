import { inject, injectable } from 'tsyringe';
import IGetConversationsUsecase from '../../interfaces/usecases/conversation/IGetConversations.usecase';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import {
  ConversationsWithUnreadCountDTO,
  FetchConversationsRequestDTO,
} from '../../DTOs/conversation/conversation.dto';
import ConversationMapper from '../../mappers/conversations/Conversation.mapperClass';

@injectable()
export default class GetconversationsUsecase implements IGetConversationsUsecase {
  constructor(
    @inject('IConversationRepository') private _repo: IConversationRepo,
    @inject('ConversationMapper') private _mapper: ConversationMapper
  ) {}

  async execute(
    dto: FetchConversationsRequestDTO
  ): Promise<ConversationsWithUnreadCountDTO[] | null> {
    const { logedUserId, search, pageg, limit } = dto;
    const result = await this._repo.getConversations(logedUserId, search, pageg, limit);

    if (result) {
      const dto: ConversationsWithUnreadCountDTO[] = [];
      result.forEach((data) => dto.push(this._mapper.conversationWithUnreadCountEntityToDTO(data)));
      return dto;
    }

    return null;
  }
}
