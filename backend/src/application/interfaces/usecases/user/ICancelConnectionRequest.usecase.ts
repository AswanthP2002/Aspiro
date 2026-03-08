import {
  ConnectionRequestDTO,
  UpdateConnectionRequestDTO,
} from '../../../DTOs/user/connectionRequest.dto';

export default interface ICancelConnectionRequestUsecase {
  execute(dto: UpdateConnectionRequestDTO): Promise<ConnectionRequestDTO | null>;
}
