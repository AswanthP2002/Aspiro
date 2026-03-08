import {
  ConnectionRequestDTO,
  SendConnectionRequestDTO,
} from '../../../DTOs/user/connectionRequest.dto';

export default interface ISendConnectionRequestUsecase {
  execute(sendConnectionRequestDto: SendConnectionRequestDTO): Promise<ConnectionRequestDTO | null>;
}
