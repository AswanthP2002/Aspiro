import ConnectionRequest, {
  ConnectionWithSenderDetails,
} from '../../../domain/entities/connection/connectionRequest.entity';
import {
  ConnectionRequestDTO,
  ConnectionUserDetailsDTO,
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
  ): ConnectionUserDetailsDTO {
    return {
      _id: data._id,
      connectedUserDetails: {
        _id: data.connectedUserDetails._id,
        name: data.connectedUserDetails.name,
        headline: data.connectedUserDetails.headline,
        profilePicture: data.connectedUserDetails?.profilePicture?.cloudinarySecureUrl,
      },
    };
  }
}
