import { Response, NextFunction, Request } from 'express';
import { injectable, inject } from 'tsyringe';
import ISendConnectionRequestUsecase from '../../application/interfaces/usecases/connection/ISendConnectionRequest.usecase';
import IRejectConnectionRequestUsecase from '../../application/interfaces/usecases/connection/IRejectConnectionRequest.usecase';
import ICancelConnectionRequestUsecase from '../../application/interfaces/usecases/connection/ICancelConnectionRequest.usecase';
import IAcceptConnectionRequestUsecase from '../../application/interfaces/usecases/connection/IAcceptConnectionRequest.usecase';
import IGetConnectionsUsecase from '../../application/interfaces/usecases/connection/IGetConnections.usecase';
// import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';

@injectable()
export class ConnectionController {
  constructor(
    @inject('ISendConnectionRequestUsecase')
    private _sendConnectionRequest: ISendConnectionRequestUsecase,
    @inject('IRejectConnectionRequestUsecase')
    private _rejectConnectionRequest: IRejectConnectionRequestUsecase,
    @inject('ICancelConnectionRequestUsecase')
    private _cancelConnectionRequest: ICancelConnectionRequestUsecase,
    @inject('IAcceptConnectionRequestUsecase')
    private _acceptConnectionRequest: IAcceptConnectionRequestUsecase,
    @inject('IGetConnectionsUsecase') private _getConnections: IGetConnectionsUsecase
  ) {}

  async sendConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sender = req.user?.id as string;
    const receiver = req.params.receiverId;
    const { acted_by, acted_user_avatar } = req.body;

    try {
      const result = await this._sendConnectionRequest.execute({
        sender,
        receiver,
        acted_by,
        acted_user_avatar,
      });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Connection request'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async cancelConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sender = req.user?.id as string;
    const receiver = req.params.receiverId;
    try {
      const result = await this._cancelConnectionRequest.execute({ sender, receiver });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Connection request'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async rejectConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sender = req.body.sender;
    const receiver = req.user?.id as string;

    try {
      await this._rejectConnectionRequest.execute({ receiver, sender });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Connection request'),
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async acceptConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    const receiver = req.user?.id as string;
    const { sender, acted_by, acted_user_avatar } = req.body;

    try {
      const result = await this._acceptConnectionRequest.execute({
        senderId: sender,
        myId: receiver,
        myName: acted_by,
        myAvatar: acted_user_avatar,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Connection request status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getConnections(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.params.userId;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    try {
      const result = await this._getConnections.exeucte({
        userId,
        search,
        page,
        limit,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Connections'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
