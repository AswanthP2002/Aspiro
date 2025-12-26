import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export class SkillDTO {
  @Expose()
  _id!: string;

  @Expose()
  skillType!: string;

  @Expose()
  skill!: string;

  @Expose()
  skillLevel!: string;

  @Expose()
  userId!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}

export class CreateSkillDTO {
  @IsDefined()
  @IsString()
  skillType!: string;

  @IsDefined()
  @IsString()
  skill!: string;

  @IsDefined()
  @IsString()
  skillLevel!: string;

  @IsDefined()
  @IsString()
  userId!: string;
}
