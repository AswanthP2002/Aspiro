import { Schema } from 'mongoose';
import ConnectionRequest from '../../../../domain/entities/connection/connectionRequest.entity';

export const ConnectionRequestSchema = new Schema<ConnectionRequest>(
  {
    receiver: { type: Schema.Types.ObjectId, required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);
