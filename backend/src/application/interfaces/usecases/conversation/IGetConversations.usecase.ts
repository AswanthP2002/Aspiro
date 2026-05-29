import {
  ConversationsWithUnreadCountDTO,
  FetchConversationsRequestDTO,
} from '../../../DTOs/conversation/conversation.dto';

export default interface IGetConversationsUsecase {
  execute(dto: FetchConversationsRequestDTO): Promise<ConversationsWithUnreadCountDTO[] | null>;
}
