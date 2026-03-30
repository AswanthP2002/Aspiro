import {
  ConnectionRequestDTO,
  SendConnectionRequestDTO,
} from '../../../DTOs/connection/connectionRequest.dto';

export default interface ISendConnectionRequestUsecase {
  execute(sendConnectionRequestDto: SendConnectionRequestDTO): Promise<ConnectionRequestDTO | null>;
}
