import { CreateMessageDTO, MessageDTO } from "../../../domain/entities/Message";

export default interface ICreateMessageUseCase {
    execute(createMessageDto : CreateMessageDTO) : Promise<MessageDTO | null>
}