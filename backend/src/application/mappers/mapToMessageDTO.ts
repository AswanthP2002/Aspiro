import Messsage, { MessageDTO } from "../../domain/entities/Message";

export default function mapToMessageDTO(message : Messsage) : MessageDTO {
    return {
        _id:message._id,
        sender:message.sender,
        receiver:message.receiver,
        message:message.message,
        createdAt:message.createdAt
    }
}