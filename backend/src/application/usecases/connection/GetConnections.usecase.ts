import { inject, injectable } from 'tsyringe';
import IGetConnectionsUsecase from '../../interfaces/usecases/connection/IGetConnections.usecase';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import {
  GetConnectionsRequestDTO,
  ConnectionWithSenderDetailsDTO,
} from '../../DTOs/connection/connectionRequest.dto';
import ConnectionRequestMapper from '../../mappers/user/ConnectionRequest.mapperClass';

@injectable()
export default class GetConnectionsUsecase implements IGetConnectionsUsecase {
  constructor(
    @inject('IConnectionRequestRepository') private _repo: IConnectionRequestRepository,
    @inject('ConnectionRequestMapper') private _mapper: ConnectionRequestMapper
  ) {}

  async exeucte(dto: GetConnectionsRequestDTO): Promise<ConnectionWithSenderDetailsDTO[] | null> {
    const { search, page, limit, userId } = dto;

    const result = await this._repo.getConnections(userId, page, limit, search);
    if (result) {
      const dto: ConnectionWithSenderDetailsDTO[] = [];
      result.forEach((connection) =>
        dto.push(this._mapper.connectionWithSenderDetailsDataToDTO(connection))
      );

      return dto;
    }

    return null;
  }
}
