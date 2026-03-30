import { inject, injectable } from 'tsyringe';
import IAcceptConnectionRequestUsecase from '../../interfaces/usecases/connection/IAcceptConnectionRequest.usecase';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';
import {
  // UpdateConnectionRequestDTO,
  ConnectionRequestDTO,
  AcceptConnectionRequestDTO,
} from '../../DTOs/connection/connectionRequest.dto';
import ConnectionRequestMapper from '../../mappers/user/ConnectionRequest.mapperClass';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export default class AcceptConnectionRequestUsecase implements IAcceptConnectionRequestUsecase {
  private _mapper: ConnectionRequestMapper;
  constructor(
    @inject('IConnectionRequestRepository') private _repo: IConnectionRequestRepository,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {
    this._mapper = new ConnectionRequestMapper();
  }

  async execute(dto: AcceptConnectionRequestDTO): Promise<ConnectionRequestDTO | null> {
    console.log('inside accept usecase - method calling');
    const { senderId, myId, myAvatar, myName } = dto;

    //first updating the request
    const acceptedRequest = await this._repo.acceptRequest(senderId as string, myId as string);

    if (acceptedRequest) {
      //delete that request
      await this._repo.delete(acceptedRequest._id as string);

      //delete that notification
      const updatableNotification =
        await this._notificationRepo.getANotificationBySendReceiverCategory(
          myId as string,
          senderId as string,
          'CONNECTION_REQUEST'
        );
      //update the notification status to mark as read
      await this._notificationRepo.update(updatableNotification?._id as string, { isRead: true });

      //update accepted persons connection
      await this._userRepo.addToConnection(myId as string, senderId as string);
      //update sender's connection
      await this._userRepo.addToConnection(senderId as string, myId as string);

      //create notifification for the other user as accptance
      const newNotification = await this._notificationRepo.create({
        category: 'CONNECTION_ACCEPTED',
        actorId: myId, // since the user who recived the request is trigering accept
        message: `${myName} accepted your connection request`,
        recepientId: senderId, // since the user who send the request is now receiving it
        targetType: 'USER',
        targetId: myId,
        targetUrl: `http://localhost:5173/users/${myId}`,
        metadata: {
          acted_by: myName,
          acted_user_avatar: myAvatar,
        },
      });

      //live notification
      this._realTimeEventEmitter.connectionAccepted({
        _id: newNotification?._id,
        category: 'CONNECTION_ACCEPTED',
        actorId: myId,
        message: `${myName} accepted your connection request`,
        recepientId: senderId,
        targetType: 'USER',
        targetId: myId,
        targetUrl: `http://localhost:5000/users/${myId}`,
        metadata: newNotification?.metadata,
        createdAt: newNotification?.createdAt,
        isRead: newNotification?.isRead,
        isDeleted: newNotification?.isDeleted,
      });
      console.log('-- Inside the usecase backend returning actual dto');
      return this._mapper.connectionRequestToConnectionRequestDTO(acceptedRequest);
    }
    console.log('-- Inside the usecase backend returning null');
    return null;
  }
}
