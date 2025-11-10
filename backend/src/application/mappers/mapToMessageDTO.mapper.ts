import Messsage from "../../domain/entities/message.entity";
import { MessageDTO } from "../DTOs/user/message.dto";

export default function mapToMessageDTO(message: Messsage): MessageDTO {
  return {
    _id: message._id,
    sender: message.sender,
    receiver: message.receiver,
    message: message.message,
    createdAt: message.createdAt,
  };
}
