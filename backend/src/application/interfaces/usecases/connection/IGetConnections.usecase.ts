import {
  ConnectionWithSenderDetailsDTO,
  GetConnectionsRequestDTO,
} from '../../../DTOs/connection/connectionRequest.dto';

export default interface IGetConnectionsUsecase {
  exeucte(dto: GetConnectionsRequestDTO): Promise<ConnectionWithSenderDetailsDTO[] | null>;
}
