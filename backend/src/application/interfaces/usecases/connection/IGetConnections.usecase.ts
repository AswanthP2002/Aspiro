import {
  ConnectionUserDetailsDTO,
  GetConnectionsRequestDTO,
} from '../../../DTOs/connection/connectionRequest.dto';

export default interface IGetConnectionsUsecase {
  exeucte(dto: GetConnectionsRequestDTO): Promise<ConnectionUserDetailsDTO[] | null>;
}
