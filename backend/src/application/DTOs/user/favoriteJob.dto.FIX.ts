import { Exclude, Expose } from 'class-transformer';

@Exclude()
export default class FavoriteJobDTO {
  @Expose()
  _id!: string;

  @Expose()
  candidateId!: string;

  @Expose()
  jobId!: string;

  @Expose()
  createdAt!: string;
}
