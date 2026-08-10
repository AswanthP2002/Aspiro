import AttachmentChatDTO from '../../../DTOs/chat/attachmentChat.dto';
import ChatDTO from '../../../DTOs/chat/chat.dto';

export default interface ISendAttachmentUsecase {
  execute(data: AttachmentChatDTO): Promise<ChatDTO | null>;
}
