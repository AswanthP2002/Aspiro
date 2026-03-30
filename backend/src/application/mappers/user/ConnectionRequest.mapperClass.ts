import ConnectionRequest, {
  ConnectionWithSenderDetails,
} from '../../../domain/entities/connection/connectionRequest.entity';
import {
  ConnectionRequestDTO,
  ConnectionWithSenderDetailsDTO,
} from '../../DTOs/connection/connectionRequest.dto';

export default class ConnectionRequestMapper {
  public connectionRequestToConnectionRequestDTO(data: ConnectionRequest): ConnectionRequestDTO {
    return {
      _id: data._id,
      sender: data.sender,
      receiver: data.receiver,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public connectionWithSenderDetailsDataToDTO(
    data: ConnectionWithSenderDetails
  ): ConnectionWithSenderDetailsDTO {
    return {
      _id: data._id,
      sender: data.sender,
      receiver: data.receiver,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      senderDetails: {
        _id: data.senderDetails?._id,
        name: data.senderDetails?.name,
        profilePicture: data.senderDetails?.profilePicture?.cloudinarySecureUrl,
        headline: data.senderDetails?.headline,
      },
    };
  }
}
