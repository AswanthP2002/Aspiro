import UserDTO from '../user/user.dto';

export default interface LoadUsersQueryDTO {
  search: string;
  page: number;
  limit: number;
  sort: string;
  filter?: any;
}

export interface PaginatedUsersDTO {
  users: UserDTO[];
  page: number;
  totalPages: number;
  currentSort: string;
}
