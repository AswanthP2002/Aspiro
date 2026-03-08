import { Auth } from '../../middlewares/auth';
import { NextFunction, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';
import IGetConversationsUsecase from '../../application/interfaces/usecases/user/IGetConversations.usecase';
import IInitializeConversation from '../../application/interfaces/usecases/user/IInitializeConversation.usecase';
import IGetchatsUsecase from '../../application/interfaces/usecases/user/IGetChats.usecase';

@injectable()
export default class ChatController {
  constructor(
    @inject('IGetConversationsUsecase') private _getConversations: IGetConversationsUsecase,
    @inject('IInitializeConversation') private _initializeConversation: IInitializeConversation,
    @inject('IGetChatsUsecase') private _getChats: IGetchatsUsecase
  ) {}

  async getConversations(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const result = await this._getConversations.execute(userId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Conversations fetched', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async initializeConversation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const sender = req.user.id;
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

  async getchats(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const conversationId = req.params.conversationId;

    try {
      const result = await this._getChats.execute(conversationId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Chats fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }
}
