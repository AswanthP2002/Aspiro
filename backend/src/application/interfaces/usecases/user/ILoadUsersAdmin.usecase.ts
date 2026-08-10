import LoadUsersQueryDTO, {
  PaginatedUsersDTO,
} from '../../../DTOs/user/loadUsersAdminside.dto';

export default interface ILoadUsersAdminUseCase {
  execute(loadUsersQueryDto: LoadUsersQueryDTO): Promise<PaginatedUsersDTO | null>;
}
