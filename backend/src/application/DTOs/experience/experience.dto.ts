import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

//legacy
export class CreateExperienceDto {
  @IsDefined({ message: 'User id can not be empty' })
  @IsString({ message: 'User id must be string' })
  userId!: string;

  @IsDefined({ message: 'Job role can not be empty' })
  @IsString({ message: 'Job role must be a string' })
  jobRole!: string;

  @IsDefined({ message: 'Job Type can not be empty' })
  @IsString({ message: 'Job type must be a string' })
  jobType!: string;

  @IsDefined({ message: 'Organization can not be empty' })
  @IsString({ message: 'Organization must be a string' })
  organization!: string;

  @IsDefined({ message: 'Start date can not be empty' })
  @IsString()
  startDate!: string;

  @IsDefined()
  @IsBoolean()
  isPresent!: boolean;

  @IsOptional()
  @IsString()
  endDate!: string;

  @IsDefined()
  @IsString()
  location!: string;

  @IsDefined()
  @IsString()
  workMode!: string;
}

export default interface CreateExperienceDTO {
  userId?: string;
  jobRole: string;
  jobType: string;
  organization: string;
  startDate?: string;
  isPresent: boolean;
  description?: string;
  endDate?: string; //for checking
  location: string;
  workMode: string;
}

//legacy
@Exclude()
export class ExperienceDto {
  @Expose()
  _id!: string;

  @Expose()
  userId!: string;

  @Expose()
  jobRole!: string;

  @Expose()
  jobType!: string;

  @Expose()
  organization!: string;

  @Expose()
  startDate!: string;

  @Expose()
  isPresent!: boolean;

  @Expose()
  endDate!: string; //for checking

  @Expose()
  location!: string;

  @Expose()
  workMode!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;
}

export interface ExperienceDTO {
  _id?: string;
  userId?: string;
  jobRole: string;
  jobType: string;
  organization: string;
  startDate?: string;
  isPresent: boolean;
  description?: string;
  endDate?: string | Date; //for checking
  location: string;
  workMode: string;
  createdAt?: string;
  updatedAt?: string;
}

//legacy
export class UpdateExperienceDto {
  @IsDefined({ message: 'Id can not be empty' })
  @IsString({ message: 'Id must be string' })
  _id!: string;

  @IsOptional({ message: 'User id can not be empty' })
  @IsString({ message: 'User id must be string' })
  userId!: string;

  @IsOptional({ message: 'Job role can not be empty' })
  @IsString({ message: 'Job role must be a string' })
  jobRole!: string;

  @IsOptional({ message: 'Job Type can not be empty' })
  @IsString({ message: 'Job type must be a string' })
  jobType!: string;

  @IsOptional({ message: 'Organization can not be empty' })
  @IsString({ message: 'Organization must be a string' })
  organization!: string;

  @IsOptional({ message: 'Start date can not be empty' })
  @IsString()
  startDate!: string;

  @IsOptional()
  @IsBoolean()
  isPresent!: boolean;

  @IsOptional()
  @IsString()
  endDate!: string;

  @IsOptional()
  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  workMode!: string;
}

//legacy
export interface EditExperienceDTO {
  experienceId: string;
  jobRole: string;
  jobType: string;
  organization: string;
  description?: string;
  startDate: string;
  isPresent: boolean;
  endDate?: string; //for checking
  location: string;
  workMode: string;
}
