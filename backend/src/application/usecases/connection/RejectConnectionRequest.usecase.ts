import { inject, injectable } from 'tsyringe';
import IRejectConnectionRequestUsecase from '../../interfaces/usecases/connection/IRejectConnectionRequest.usecase';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import {
  UpdateConnectionRequestDTO,
  ConnectionRequestDTO,
} from '../../DTOs/connection/connectionRequest.dto';
import ConnectionRequestMapper from '../../mappers/user/ConnectionRequest.mapperClass';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';

@injectable()
export default class RejectConnectionRequestUsecase implements IRejectConnectionRequestUsecase {
  private _mapper: ConnectionRequestMapper;
  constructor(
    @inject('IConnectionRequestRepository') private _repo: IConnectionRequestRepository,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter
  ) {
    this._mapper = new ConnectionRequestMapper();
  }

  async execute(
    updateConnectionRequestDto: UpdateConnectionRequestDTO
  ): Promise<ConnectionRequestDTO | null> {
    const { _id, status, receiver, sender } = updateConnectionRequestDto;
    console.log(_id, status);
    const rejectedRequest = await this._repo.rejectRequest(sender as string, receiver as string);

    if (rejectedRequest) {
      await this._repo.delete(rejectedRequest?._id as string);
      const removableNotification =
        await this._notificationRepo.getANotificationBySendReceiverCategory(
          receiver as string,
          sender as string,
          'CONNECTION_REQUEST'
        );

      if (removableNotification) {
        await this._notificationRepo.deleteConnectionRequestNotification(
          receiver as string,
          sender as string
        );

        this._realTimeEventEmitter.removeNotification(receiver as string, sender as string);
      }
      return this._mapper.connectionRequestToConnectionRequestDTO(rejectedRequest);
    }

    return null;
  }
}
