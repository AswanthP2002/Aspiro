import mongoose from 'mongoose';
import User from '../../domain/entities/shared/User.entitty';
import IUserRepository from '../../domain/interfaces/IUserRepo.refactored';
import { UserDAO } from '../database/DAOs/user.dao.refactored';
import BaseRepository from './baseRepository';
import { injectable } from 'tsyringe';

@injectable()
export default class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(UserDAO);
  }

  async findByEmail(email?: string): Promise<User | null> {
    const result = await UserDAO.findOne({ email: email });
    return result;
  }

  async findByPhone(phone?: string): Promise<User | null> {
    const result = await UserDAO.findOne({ phone: phone });
    return result;
  }

  async updateVerify(id?: string): Promise<User | null> {
    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isVerified: true } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async isUserBlocked(id?: string): Promise<boolean | null> {
    const user = await UserDAO.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return user?.isBlocked === true;
  }

  async blockUser(userId: string): Promise<boolean> {
    console.log('id of user being blocked', userId);
    const result = await UserDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { isBlocked: true } }
    );
    console.log('update result', result);
    return result.modifiedCount > 0;
  }

  async unblockUser(userId: string): Promise<boolean> {
    const result = await UserDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { isBlocked: false } }
    );

    return result.modifiedCount > 0;
  }
}
