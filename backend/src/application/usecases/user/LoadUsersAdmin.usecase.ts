import { inject, injectable } from 'tsyringe';
import { PaginatedUsersDTO } from '../../DTOs/user/loadUsersAdminside.dto.FIX';
import { FindUsersQuery } from '../../queries/user/users.query';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import LoadUsersQueryDTO from '../../DTOs/user/loadUsersAdminside.dto.FIX';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import User from '../../../domain/entities/user/User.FIX';
import ILoadUsersAdminUseCase from '../../interfaces/usecases/user/ILoadUsersAdmin.usecase.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export class LoadUsersAdminUsecase implements ILoadUsersAdminUseCase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(loadUsersQueryDto: LoadUsersQueryDTO): Promise<PaginatedUsersDTO | null> {
    const { search, page, limit, sort, filter } = loadUsersQueryDto;

    let sortOption: { [key: string]: -1 | 1 } = { createdAt: -1 };

    switch (sort) {
      case 'joined-latest':
        sortOption = { createdAt: -1 };
        break;
      case 'joined-oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'name-a-z':
        sortOption = { name: 1 };
        break;
      case 'name-z-a':
        sortOption = { name: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const query: FindUsersQuery = {
      search: search,
      page: page,
      limit: limit,
      filterOptions: filter,
      sortOption: sortOption,
    };

    const result = await this._userRepository.findUsersWithQuery(query);

    if (result && result.users) {
      const userDto: UserDTO[] = [];
      result.users.forEach((user: User) => {
        userDto.push(this._mapper.userEntityToAdminUserListDTO(user));
      });

      return {
        users: userDto,
        page,
        totalPages: Math.ceil(result.total / limit),
        currentSort: sort,
      };
    }

    return null;
  }
}
