import { model } from "mongoose";
import Messsage from "../../../domain/entities/Message";
import { MessageSchema } from "../Schemas/message.schema";

export const MessageDAO = model<Messsage>('message', MessageSchema)