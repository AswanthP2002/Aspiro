import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export default class SkillsDTO {
  @Expose()
  _id?: string;

  @Expose()
  skills!: string;

  @Expose()
  isVerified?: boolean;
}

export class CreateSkillDTO {
  @IsDefined()
  @IsString()
  skills!: string;
}

@Exclude()
export class LoadPaginatedSkillsDTO {
  @Expose()
  skills!: SkillsDTO[];

  @Expose()
  totalPages!: number;
}

export class UpdateSkillsDTO {
  @IsDefined()
  @IsString()
  _id!: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

export class GetSkillsDTO {
  @IsDefined()
  @IsString()
  search!: string;

  @IsDefined()
  @IsNumber()
  page!: number;

  @IsDefined()
  @IsNumber()
  limit!: number;
}
