import User from '../entities/shared/User.entitty';
import IBaseRepo from './IBaseRepo';

export default interface IUserRepository extends IBaseRepo<User> {
  findByEmail(email?: string): Promise<User | null>;
  findByPhone(phone?: string): Promise<User | null>;
  updateVerify(id?: string): Promise<User | null>;
  isUserBlocked(id?: string): Promise<boolean | null>;
  blockUser(userId: string): Promise<boolean>;
  unblockUser(userId: string): Promise<boolean>;
  //removeProfilePicture(id? : string) : Promise<User | null>
  //removeCoverPhoto(id? : string) : Promise<User | null>
}
