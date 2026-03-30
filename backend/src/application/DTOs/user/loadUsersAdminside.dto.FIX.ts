import AdminUserListDTO from '../../../domain/entities/user/AdminUserList.entity';

export default interface LoadUsersQueryDTO {
  search: string;
  page: number;
  limit: number;
  sort: string;
  filter: {
    status: boolean[];
    roles: string[];
    verification: boolean[];
  };
}

export interface PaginatedUsersDTO {
  users: AdminUserListDTO[];
  page: number;
  totalPages: number;
  currentSort: string;
}
