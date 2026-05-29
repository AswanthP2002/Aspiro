import { inject, injectable } from 'tsyringe';
import IGetConnectionsUsecase from '../../interfaces/usecases/connection/IGetConnections.usecase';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import {
  GetConnectionsRequestDTO,
  ConnectionUserDetailsDTO,
} from '../../DTOs/connection/connectionRequest.dto';
import ConnectionRequestMapper from '../../mappers/user/ConnectionRequest.mapperClass';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export default class GetConnectionsUsecase implements IGetConnectionsUsecase {
  constructor(
    // @inject('IConnectionRequestRepository') private _repo: IConnectionRequestRepository,
    @inject('ConnectionRequestMapper') private _mapper: ConnectionRequestMapper,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {}

  async exeucte(dto: GetConnectionsRequestDTO): Promise<ConnectionUserDetailsDTO[] | null> {
    const { search, page, limit, userId } = dto;

    const result = await this._userRepo.getConnections(userId, page, limit, search);
    if (result) {
      const dto: ConnectionUserDetailsDTO[] = [];
      result.forEach((connection) =>
        dto.push(this._mapper.connectionWithSenderDetailsDataToDTO(connection))
      );

      return dto;
    }

    return null;
  }
}
