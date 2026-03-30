import {
  ConnectionRequestDTO,
  UpdateConnectionRequestDTO,
} from '../../../DTOs/connection/connectionRequest.dto';

export default interface IRejectConnectionRequestUsecase {
  execute(
    updateConnectionRequestDto: UpdateConnectionRequestDTO
  ): Promise<ConnectionRequestDTO | null>;
}
