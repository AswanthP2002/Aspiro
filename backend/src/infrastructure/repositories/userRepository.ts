import mongoose from 'mongoose';
import User from '../../domain/entities/shared/User';
import IUserRepository from '../../domain/interfaces/IUserRepo.refactored';
import { UserDAO } from '../database/DAOs/user.dao.refactored';
import BaseRepository from './baseRepository';
import { injectable } from 'tsyringe';
import { FindUsersQuery } from '../../application/queries/users.query';

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

  async findUsersWithQuery(query: FindUsersQuery): Promise<{users: User[], total: number} | null> {
    const { search, page, limit, filterOptions, sortOption } = query;
    const skip = (page - 1) * limit;

    const matchFilter : any = search ? { name: { $regex: new RegExp(search, 'i') } } : {};
    
    if (filterOptions.status.length > 0){
      matchFilter['isBlocked'] = { $in: filterOptions.status }
    }

    if(filterOptions.roles.length > 0){
      matchFilter['role'] = { $in: filterOptions.roles }
    }

    if(filterOptions.verification.length > 0){
      matchFilter['isVerified'] = { $in: filterOptions.verification }
    }
    
    const usersPipeline = [
      { $match: matchFilter },
      { $sort: sortOption },
      { $skip: skip },
      { $limit: limit }
    ];

    const totalCountPipeline = [
      { $match: matchFilter },
      { $count: 'total' }
    ];

    const [users, totalResult] = await Promise.all([
      UserDAO.aggregate(usersPipeline),
      UserDAO.aggregate(totalCountPipeline)
    ]);

    const total = totalResult[0]?.total || 0;

    return { users, total };
  }
}
