// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';
import IGetConversationsUsecase from '../../application/interfaces/usecases/conversation/IGetConversations.usecase';
import IInitializeConversation from '../../application/interfaces/usecases/conversation/IInitializeConversation.usecase';
import IGetchatsUsecase from '../../application/interfaces/usecases/chat/IGetChats.usecase';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IDeleteChatUsecase from '../../application/interfaces/usecases/chat/IDeleteChat.usecase';
import IDeleteChatForMeUsecase from '../../application/interfaces/usecases/chat/IDeleteChatForMe.usecase';

@injectable()
export default class ChatController {
  constructor(
    @inject('IGetConversationsUsecase') private _getConversations: IGetConversationsUsecase,
    @inject('IInitializeConversation') private _initializeConversation: IInitializeConversation,
    @inject('IGetChatsUsecase') private _getChats: IGetchatsUsecase,
    @inject('IDeleteChatUsecase') private _deleteChat: IDeleteChatUsecase,
    @inject('IDeleteChatForMeUsecase') private _deleteChatForMe: IDeleteChatForMeUsecase
  ) {}

  async getConversations(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    try {
      const result = await this._getConversations.execute({
        logedUserId: userId,
        search,
        pageg: page,
        limit,
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Conversations'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async initializeConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sender = req.user?.id as string;
    const receiver = req.body.receiver;

    try {
      const result = await this._initializeConversation.execute(sender, receiver);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Conversation Initialized', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getchats(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conversationId = req.params.conversationId;
    const logedUserId = req.user.id;

    try {
      const result = await this._getChats.execute(conversationId, logedUserId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Chats'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteChat(req: Request, res: Response, next: NextFunction): Promise<void> {
    const chatId = req.params.chatId;

    try {
      await this._deleteChat.execute(chatId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Chats'),
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteChatForMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    const chatId = req.params.chatId;
    const logedUserId = req.user.id;

    try {
      const result = await this._deleteChatForMe.execute(chatId, logedUserId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Chats'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
