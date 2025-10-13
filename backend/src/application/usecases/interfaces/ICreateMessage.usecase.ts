import {
  CreateMessageDTO,
  MessageDTO,
} from '../../../domain/entities/message.entity';

export default interface ICreateMessageUseCase {
  execute(createMessageDto: CreateMessageDTO): Promise<MessageDTO | null>;
}
