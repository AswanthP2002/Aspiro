import { model } from 'mongoose';
import User from '../../../domain/entities/shared/User.entitty';
import { UserSchema } from '../Schemas/user.schema.refactored';

export const UserDAO = model<User>('user', UserSchema);
