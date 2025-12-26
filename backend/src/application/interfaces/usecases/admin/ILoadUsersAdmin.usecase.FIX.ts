import LoadUsersQueryDTO, {
  PaginatedUsersDTO,
} from '../../../DTOs/admin/loadUsersAdminside.dto.FIX';

export default interface ILoadUsersAdminUseCase {
  execute(loadUsersQueryDto: LoadUsersQueryDTO): Promise<PaginatedUsersDTO | null>;
}
