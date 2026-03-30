import {
  AcceptConnectionRequestDTO,
  ConnectionRequestDTO,
} from '../../../DTOs/connection/connectionRequest.dto';

export default interface IAcceptConnectionRequestUsecase {
  execute(dto: AcceptConnectionRequestDTO): Promise<ConnectionRequestDTO | null>;
}
