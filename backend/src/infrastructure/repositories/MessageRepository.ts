import Messsage from '../../domain/entities/message.entity';
import IMessageRepo from '../../domain/interfaces/IMessageRepo';
import { MessageDAO } from '../database/DAOs/message.dao';
import BaseRepository from './baseRepository';

export default class MessageRepository
  extends BaseRepository<Messsage>
  implements IMessageRepo
{
  constructor() {
    super(MessageDAO);
  }
}
