import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';

export default interface RecruiterPaginatedDTO {
  recruiters: Recruiter[];
  page: number;
  totalPages: number;
  currentSort: any;
}
