import {
  AcceptConnectionRequestDTO,
  ConnectionRequestDTO,
} from '../../../DTOs/user/connectionRequest.dto';

export default interface IAcceptConnectionRequestUsecase {
  execute(dto: AcceptConnectionRequestDTO): Promise<ConnectionRequestDTO | null>;
}
