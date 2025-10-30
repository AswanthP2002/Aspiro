import { inject, injectable } from 'tsyringe';
import { PaginatedUsersDTO } from '../../DTOs/admin/loadUsersAdminside.dto';
import {
  FindUsersQuery,
  UserJoinDateSortQuery,
  UsersNameSortQuery,
} from '../../queries/users.query';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import LoadUsersQueryDTO from '../../DTOs/admin/loadUsersAdminside.dto';
import UserDTO from '../../DTOs/user/user.dto';
import User from '../../../domain/entities/user/User';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import ILoadUsersAdminUseCase from '../../interfaces/usecases/admin/ILoadUsersAdmin.usecase';

@injectable()
export class LoadUsersAdminUsecase implements ILoadUsersAdminUseCase {
  constructor(@inject('IUserRepository') private _userRepository : IUserRepository) {}

  async execute(loadUsersQueryDto: LoadUsersQueryDTO): Promise<PaginatedUsersDTO | null> {
    const { search, page, limit, sort, filter } = loadUsersQueryDto;

    const sortOption: UsersNameSortQuery & UserJoinDateSortQuery = {
      createdAt: -1,
      name: 1,
    };

    switch (sort) {
      case 'joined-latest':
        sortOption.createdAt = -1;
        break;
      case 'joined-oldest':
        sortOption.createdAt = 1;
        break;
      case 'name-a-z':
        sortOption.name = 1;
        break;
      case 'name-z-a':
        sortOption.name = -1;
        break;
      default:
        // Use default sort if an unknown value is provided
        break;
    }

    const query: FindUsersQuery = {
      search: search,
      page: page,
      limit: limit,
      filterOptions: filter,
      sortOption: sortOption,
    };

    const result = await this._userRepository.findUsersWithQuery(query)

    if(result && result.users){
      const userDto : UserDTO[] = []
      result.users.forEach((user : User) => {
        userDto.push(mapUserToUserDTO(user))
      })

      return {
        users : userDto,
        page,
        totalPages : Math.ceil(result.total / limit),
        currentSort : sort
      }
    }

    return null
    
  }
}
