import ConnectionRequest from '../../../domain/entities/user/connectionRequest.entity';
import { ConnectionRequestDTO } from '../../DTOs/user/connectionRequest.dto';

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
}
