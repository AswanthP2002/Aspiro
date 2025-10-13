import Messsage, {
  CreateMessageDTO,
  MessageDTO,
} from '../../domain/entities/message.entity';

export default function mapMessagesFromDto(
  createMessagedto: CreateMessageDTO
): Messsage {
  return {
    sender: createMessagedto.sender,
    receiver: createMessagedto.receiver,
    message: createMessagedto.message,
  };
}
