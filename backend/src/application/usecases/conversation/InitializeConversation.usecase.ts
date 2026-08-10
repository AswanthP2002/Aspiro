import { inject, injectable } from 'tsyringe';
import IInitializeConversation from '../../interfaces/usecases/conversation/IInitializeConversation.usecase';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import ConversationDTO, {
  InitlaizeConversationResponseDTO,
} from '../../DTOs/conversation/conversation.dto';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto';
import ConversationMapper from '../../mappers/conversations/Conversation.mapperClass';

@injectable()
export default class InitializeConversationUsecase implements IInitializeConversation {
  constructor(
    @inject('IConversationRepository') private _repo: IConversationRepo,
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('ConversationMapper') private _convMapper: ConversationMapper
  ) {}

  async execute(
    senderId: string,
    recipientId: string
  ): Promise<InitlaizeConversationResponseDTO | null> {
    const conversation = await this._repo.initializeConversation(senderId, recipientId);

    if (conversation) {
      // console.log('Checking conversation data before mapping', conversation)
      const participantData: UserDTO[] = conversation.participants.map((participant) => {
        return participant.userId as UserDTO;
      });
      const reuslt = this._convMapper.conversationDtoToInitalizeConvResponseDTO({
        ...conversation,
        participantsData: participantData,
      });
      console.log('Initialized conversation mapped data before returning', reuslt);
      return reuslt;
    }

    return null;
  }
}
