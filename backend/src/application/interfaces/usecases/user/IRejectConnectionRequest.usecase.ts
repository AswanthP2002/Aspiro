import {
  ConnectionRequestDTO,
  UpdateConnectionRequestDTO,
} from '../../../DTOs/user/connectionRequest.dto';

export default interface IRejectConnectionRequestUsecase {
  execute(
    updateConnectionRequestDto: UpdateConnectionRequestDTO
  ): Promise<ConnectionRequestDTO | null>;
}
