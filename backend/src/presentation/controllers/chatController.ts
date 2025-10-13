import ICreateMessageUseCase from '../../application/usecases/interfaces/ICreateMessage.usecase';
import { Auth } from '../../middlewares/auth';
import { Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';

export default class ChatController {
  constructor(private _sendMessageUC: ICreateMessageUseCase) {}

  async sendMessage(req: Auth, res: Response): Promise<void> {
    const { sender, receiver, message } = req.body;
    try {
      const result = await this._sendMessageUC.execute({
        sender,
        receiver,
        message,
      });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Message sent success', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while sending the message', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: 'Internal server error, please try again after some time',
        });
    }
  }
}
