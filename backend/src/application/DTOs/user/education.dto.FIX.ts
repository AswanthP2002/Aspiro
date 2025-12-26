import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, isString, IsString } from 'class-validator';

@Exclude()
export class EducationDTO {
  @Expose()
  _id!: string;

  @Expose()
  userId!: string;

  @Expose()
  educationStream!: string; //particular group of education

  @Expose()
  educationLevel!: string;

  @Expose()
  institution!: string;

  @Expose()
  location!: string;

  @Expose()
  startYear!: string;

  @Expose()
  isPresent!: boolean;

  @Expose()
  endYear!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;
}

export class CreateEducationDTO {
  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  @IsString()
  educationStream!: string; //particular group of education

  @IsDefined()
  @IsString()
  educationLevel!: string;

  @IsDefined()
  @IsString()
  institution!: string;

  @IsDefined()
  @IsString()
  location!: string;

  @IsDefined()
  @IsString()
  startYear!: string;

  @IsDefined()
  @IsBoolean()
  isPresent!: boolean;

  @IsOptional()
  @IsString()
  endYear!: string;
}

export class UpdateEducationDTO {
  @IsDefined()
  @IsString()
  _id!: string;

  @IsOptional()
  @IsString()
  educationStream!: string; //particular group of education

  @IsOptional()
  @IsString()
  educationLevel!: string;

  @IsOptional()
  @IsString()
  institution!: string;

  @IsOptional()
  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  startYear!: string;

  @IsOptional()
  @IsBoolean()
  isPresent!: boolean;

  @IsOptional()
  @IsString()
  endYear!: string;
}
