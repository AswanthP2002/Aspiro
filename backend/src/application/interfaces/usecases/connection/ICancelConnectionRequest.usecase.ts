import {
  ConnectionRequestDTO,
  UpdateConnectionRequestDTO,
} from '../../../DTOs/connection/connectionRequest.dto';

export default interface ICancelConnectionRequestUsecase {
  execute(dto: UpdateConnectionRequestDTO): Promise<ConnectionRequestDTO | null>;
}
