import { model } from "mongoose";
import Conversation from "../../../../domain/entities/user/conversation.entity";
import { ConversationSchema } from "../../Schemas/user/conversation.schema";

export const ConversationDAO = model<Conversation>('conversations', ConversationSchema)