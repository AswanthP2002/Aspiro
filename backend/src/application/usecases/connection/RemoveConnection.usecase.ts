import { inject, injectable } from 'tsyringe';
import IRemoveConnectionUsecase from '../../interfaces/usecases/connection/IRemoveConnection.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { RemoveConnectionDTO } from '../../DTOs/connection/connectionRequest.dto';

@injectable()
export default class RemoveConnectionUsecase implements IRemoveConnectionUsecase {
  constructor(@inject('IUserRepository') private _repo: IUserRepository) {}

  async execute(dto: RemoveConnectionDTO): Promise<void> {
    const { myId, removingConnectionId } = dto;

    //removing other person from my connection list
    await this._repo.removeFromConnection(myId, removingConnectionId);

    //removing me from other persons connection list
    await this._repo.removeFromConnection(removingConnectionId, myId);
  }
}
