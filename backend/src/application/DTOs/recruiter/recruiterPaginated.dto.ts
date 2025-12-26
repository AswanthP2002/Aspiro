import { Exclude, Expose } from 'class-transformer';
import RecruiterProfilelOverviewDataDTO from './recruiterProfileOverviewData.dto.FIX';

@Exclude()
export default class RecruiterPaginatedDTO {
  @Expose()
  recruiters!: RecruiterProfilelOverviewDataDTO[];

  @Expose()
  page!: number;

  @Expose()
  totalPages!: number;

  @Expose()
  currentSort!: string;
}
