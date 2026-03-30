import ConversationDTO, {
  FetchConversationsRequestDTO,
} from '../../../DTOs/conversation/conversation.dto';

export default interface IGetConversationsUsecase {
  execute(dto: FetchConversationsRequestDTO): Promise<ConversationDTO[] | null>;
}
