import Messsage from "../../domain/entities/message.entity";
import { CreateMessageDTO } from "../DTOs/user/message.dto";

export default function mapMessagesFromDto(
  createMessagedto: CreateMessageDTO
): Messsage {
  return {
    sender: createMessagedto.sender,
    receiver: createMessagedto.receiver,
    message: createMessagedto.message,
  };
}
