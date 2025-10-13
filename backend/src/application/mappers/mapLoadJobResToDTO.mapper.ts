import LoadJobDTO, { LoadJobRes, LoadJobResDTO } from '../DTOs/loadJob.dto';

export default function mapLoadJobResToDTO(jobRes: LoadJobRes): LoadJobResDTO {
  return {
    jobs: jobRes.jobs,
    currentSort: jobRes.currentSort,
    page: jobRes.page,
    totalPages: jobRes.totalPages,
  };
}
