import Messsage from '../entities/message/message.entity';
import IBaseRepo from './IBaseRepo';

export default interface IMessageRepo extends IBaseRepo<Messsage> {
  _placeholder?: never;
}
