import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoadJobsAggregatedQueryDto {
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
  sortOption!: string;

  @IsOptional()
  filter!: {
    status: string;
    workMode: string;
    jobType: string;
    jobLevel: string;
  };

  @IsOptional()
  @IsString()
  locationSearch!: string;
}

//legacy
export default interface LoadJobsAggregatedQueryDTO {
  search: string;
  page: number;
  limit: number;
  sortOption: string;
  filter: {
    status: string;
    workMode: string;
    jobType?: string;
    jobLevel?: string;
  };
  locationSearch?: string;
}
//stoped from working
