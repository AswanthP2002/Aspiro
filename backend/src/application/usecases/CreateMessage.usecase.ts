import {
  CreateMessageDTO,
  MessageDTO,
} from '../../domain/entities/message.entity';
import IMessageRepo from '../../domain/interfaces/IMessageRepo';
import mapMessagesFromDto from '../mappers/mapMessagesFromDTO.mapper';
import mapToMessageDTO from '../mappers/mapToMessageDTO.mapper';
import ICreateMessageUseCase from './interfaces/ICreateMessage.usecase';

export default class CreateMessageUseCase implements ICreateMessageUseCase {
  constructor(private _repo: IMessageRepo) {}

  async execute(
    createMessageDto: CreateMessageDTO
  ): Promise<MessageDTO | null> {
    const newMessage = mapMessagesFromDto(createMessageDto);
    const result = await this._repo.create(newMessage);
    if (result) {
      const dto = mapToMessageDTO(result);
      return dto;
    }
    return null;
  }
}
