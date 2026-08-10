import { inject, injectable } from 'tsyringe';
import ISendAttachmentUsecase from '../../interfaces/usecases/chat/ISendAttachment.usecase';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import AttachmentChatDTO from '../../DTOs/chat/attachmentChat.dto';
import ChatDTO from '../../DTOs/chat/chat.dto';
import ICloudStroageService from '../../interfaces/services/ICloudStorageService';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export default class SendAttachmentUsecase implements ISendAttachmentUsecase {
  constructor(
    @inject('IChatRepository') private _chatRepo: IChatRepository,
    @inject('ICloudStorageService') private _cloudStorage: ICloudStroageService,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {}

  async execute(data: AttachmentChatDTO): Promise<ChatDTO | null> {
    const { conversationId, senderId, receiverId, attachements, text } = data;

    const result = (await this._cloudStorage.upload(attachements.buffer, 'attachments', '')) as {
      secure_url: string;
      public_id: string;
    };

    const chatResult = await this._chatRepo.create({
      conversationId,
      senderId,
      receiverId,
      text,
      attachments: [
        {
          fileName: attachements.originalname,
          fileType: attachements.mimetype,
          url: result.secure_url,
          key: result.public_id,
          fileSize: attachements.size,
        },
      ],
      isDeleted: false,
      isRead: false,
    });

    const senderData = await this._userRepo.findById(senderId);

    if (chatResult && senderData) {
      this._realTimeEventEmitter.sendNewMessage(chatResult, receiverId, senderData);
      this._realTimeEventEmitter.sendMesseWithAttachments(chatResult, conversationId);

      return chatResult as ChatDTO;
    }

    return null;
  }
}
