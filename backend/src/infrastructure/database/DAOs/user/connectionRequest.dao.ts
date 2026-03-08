import { model } from 'mongoose';
import ConnectionRequest from '../../../../domain/entities/user/connectionRequest.entity';
import { ConnectionRequestSchema } from '../../Schemas/user/connectionRequest.schema';

export const ConnectionRequestDAO = model<ConnectionRequest>(
  'connectionRequest',
  ConnectionRequestSchema
);
