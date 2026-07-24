import { inject, injectable } from 'tsyringe';
import ISendConnectionRequestUsecase from '../../interfaces/usecases/connection/ISendConnectionRequest.usecase';
import ConnectionRequestMapper from '../../mappers/user/ConnectionRequest.mapperClass';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import {
  SendConnectionRequestDTO,
  ConnectionRequestDTO,
} from '../../DTOs/connection/connectionRequest.dto';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export class SendConnectionRequestUsecase implements ISendConnectionRequestUsecase {
  private _mapper: ConnectionRequestMapper;

  constructor(
    @inject('IConnectionRequestRepository') private _repo: IConnectionRequestRepository,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
    @inject('ISubscriptionRepository') private subscriptionRepo: ISubscriptionRepo
  ) {
    this._mapper = new ConnectionRequestMapper();
  }

  async execute(
    sendConnectionRequestDto: SendConnectionRequestDTO
  ): Promise<ConnectionRequestDTO | null> {
    const { sender, receiver, acted_by, acted_user_avatar } = sendConnectionRequestDto;

    if (sender === receiver) return null;

    const newConnectionRequest = await this._repo.create({
      sender: sender,
      receiver: receiver,
      status: 'PENDING',
    });

    const userSubscriptionData = await this.subscriptionRepo.getUserSubscriptionDetails(sender);
    if (userSubscriptionData && userSubscriptionData.features) {
      const existingCount = userSubscriptionData?.features['connectionRequests'];
      if (parseInt(existingCount.toString()) > 0) {
        const reminingCount = parseInt(existingCount.toString()) - 1;
        await this.subscriptionRepo.updateFeaturesConnectionRequestCountByUserId(
          sender,
          reminingCount.toString()
        );
      }
    }

    if (newConnectionRequest) {
      //notificaton
      await this._notificationRepo.create({
        category: 'CONNECTION_REQUEST',
        actorId: sender,
        recepientId: receiver,
        message: `${acted_by} send you a connection request`,
        targetType: 'USER',
        targetId: sender,
        targetUrl: `http://localhost:5173/users/${sender}`,
        metadata: {
          acted_by,
          acted_user_avatar,
        },
      });

      // //live notification testing
      // if (notify) {
      //   this._realTimeEventEmitter.connectionRequest({
      //     _id: notify._id,
      //     category: notify.category,
      //     actorId: sender,
      //     recepientId: receiver,
      //     message: `${acted_by} send you a connection request`,
      //     targetType: notify.targetType,
      //     targetId: sender,
      //     targetUrl: `http://localhost:5173/users/${sender}`,
      //     metadata: notify.metadata,
      //     createdAt: notify.createdAt,
      //     isDeleted: notify.isDeleted,
      //     isRead: notify.isRead,
      //   });
      // }

      return this._mapper.connectionRequestToConnectionRequestDTO(newConnectionRequest);
    }

    return null;
  }
}
