import { model } from 'mongoose';
import User from '../../../domain/entities/shared/User';
import { UserSchema } from '../Schemas/user.schema';

export const UserDAO = model<User>('user', UserSchema);
