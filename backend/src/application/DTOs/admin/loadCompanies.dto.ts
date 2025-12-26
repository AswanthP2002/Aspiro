import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export default class LoadRecruitersDTO {
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

  @IsDefined()
  @IsString()
  employerTypeFilter!: string;

  @IsOptional()
  @IsString()
  employerStatusFilter?: string;

  @IsOptional()
  filter?: {
    employerType: string;
  };
}
