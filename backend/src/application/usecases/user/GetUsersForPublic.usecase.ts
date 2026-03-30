import { GetUsersForPublicDTO } from '../../DTOs/user/getUsersForPublic.dto';
import UserOverviewForPublicDTO, {
  PaginatedUserOverviewForPublicDTO,
} from '../../DTOs/user/userOverviewForPublic.dto';
import { inject, injectable } from 'tsyringe';
import IGetUsersForPublicUsecase from '../../interfaces/usecases/user/IGetUsersforPublic.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserMapper from '../../mappers/user/User.mapperClass';
import UserProfileAggregated from '../../../domain/entities/user/userProfileAggregated';

@injectable()
export default class GetUsersForPublicUsecase implements IGetUsersForPublicUsecase {
  constructor(
    @inject('IUserRepository') private _repo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  public getExperienceInMonths(user: UserOverviewForPublicDTO): number {
    let expInMonths = 0;
    if (user.experience && user.experience?.length > 0) {
      for (let i = 0; i < user.experience.length; i++) {
        const starting = new Date(user.experience[i].startDate as string);
        const end = user.experience[i].isPresent
          ? new Date()
          : new Date(user.experience[i].endDate as string);

        const yearDif = end.getFullYear() - starting.getFullYear();
        const monthDif = end.getMonth() - starting.getMonth();

        const fullDif = yearDif * 12 + monthDif;
        expInMonths += fullDif;
      }
    }

    return expInMonths;
  }

  async execute(
    getCandidatesDto: GetUsersForPublicDTO
  ): Promise<PaginatedUserOverviewForPublicDTO | null> {
    const { search, page, limit, experienceFilter, roleTypeFilter, location } = getCandidatesDto;

    // All | Recruiter | Non-Recruiter
    let roleFilter = ['user'];

    if (roleTypeFilter === 'Recruiter') {
      roleFilter = ['recruiter'];
    } else {
      roleFilter = ['user'];
    }
    //currently testing with search only
    const result = await this._repo.loadUsersForPublic({
      search,
      page,
      limit,
      roleTypeFilter: roleFilter,
      location,
    });

    if (result) {
      console.log('- checking data for inspecing user recruiter profile --', result.users[0]);
      const usersDto: UserOverviewForPublicDTO[] = [];
      result.users.forEach((user: UserProfileAggregated) =>
        usersDto.push(this._mapper.userProfileAggregatedDataToUserOverviewToPublicDTO(user))
      );

      const filtered: UserOverviewForPublicDTO[] = [];
      //Filter data based on experience filter
      for (let i = 0; i < usersDto.length; i++) {
        const expInMonths = this.getExperienceInMonths(usersDto[i]);
        if (experienceFilter === 'High_Level' && expInMonths >= 12 * 4) {
          filtered.push(usersDto[i]);
        } else if (
          experienceFilter === 'Mid_Level' &&
          expInMonths >= 12 * 2 &&
          expInMonths < 12 * 4
        ) {
          filtered.push(usersDto[i]);
        } else if (
          experienceFilter === 'Entry_Level' &&
          expInMonths >= 12 &&
          expInMonths < 12 * 2
        ) {
          filtered.push(usersDto[i]);
        } else if (experienceFilter === 'Fresher') {
          filtered.push(usersDto[i]);
        } else if (experienceFilter === 'All') {
          filtered.push(usersDto[i]);
        }
      }

      return { users: filtered, page: result.page, totalPages: result.totalPages };
    }

    return null;
  }
}
