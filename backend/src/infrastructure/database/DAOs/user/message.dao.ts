import { model } from "mongoose";
import Message from "../../../../domain/entities/user/message.entity";
import { MessageSchema } from "../../Schemas/user/messages.schema";

export const MessageDAO = model<Message>('messages', MessageSchema)