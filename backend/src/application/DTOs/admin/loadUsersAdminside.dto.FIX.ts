import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import UserDTO from '../user/user.dto.FIX';
import { Exclude, Expose } from 'class-transformer';

export default class LoadUsersQueryDTO {
  @IsDefined()
  @IsString()
  search!: string;

  @IsDefined()
  @IsNumber()
  page!: number;

  @IsDefined()
  @IsNumber()
  limit!: number;

  @IsDefined()
  @IsString()
  sort!: string;

  @IsOptional()
  filter?: any;
}

@Exclude()
export class PaginatedUsersDTO {
  @Expose()
  users!: UserDTO[];

  @Expose()
  page!: number;

  @Expose()
  totalPages!: number;

  @Expose()
  currentSort!: string;
}
