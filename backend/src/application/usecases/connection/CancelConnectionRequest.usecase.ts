import { inject, injectable } from 'tsyringe';
import ICancelConnectionRequestUsecase from '../../interfaces/usecases/connection/ICancelConnectionRequest.usecase';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import {
  UpdateConnectionRequestDTO,
  ConnectionRequestDTO,
} from '../../DTOs/connection/connectionRequest.dto';
import ConnectionRequestMapper from '../../mappers/user/ConnectionRequest.mapperClass';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';

@injectable()
export default class CancelConnectionRequestUsecase implements ICancelConnectionRequestUsecase {
  private _mapper: ConnectionRequestMapper;
  constructor(
    @inject('IConnectionRequestRepository') private _repo: IConnectionRequestRepository,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter
  ) {
    this._mapper = new ConnectionRequestMapper();
  }

  async execute(dto: UpdateConnectionRequestDTO): Promise<ConnectionRequestDTO | null> {
    const { sender, receiver } = dto;
    console.log('connection request cancelled');
    console.log('sender', sender);
    console.log('receiver', receiver);
    const canceledConnectionRequest = await this._repo.cancelRequest(
      sender as string,
      receiver as string
    );

    if (canceledConnectionRequest) {
      await this._repo.delete(canceledConnectionRequest._id as string);
      const removablNotification =
        await this._notificationRepo.getANotificationBySendReceiverCategory(
          receiver as string,
          sender as string,
          'CONNECTION_REQUEST'
        );
      if (removablNotification) {
        await this._notificationRepo.deleteConnectionRequestNotification(
          receiver as string,
          sender as string
        );

        // this._realTimeEventEmitter.removeNotification(
        //   receiver as string,
        //   removablNotification._id as string
        // );
      }

      return this._mapper.connectionRequestToConnectionRequestDTO(canceledConnectionRequest);
    }
    return null;
  }
}
