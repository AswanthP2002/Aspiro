import LoadJobDTO, { LoadJobRes, LoadJobResDTO } from '../DTOs/job/loadJob.dto.FIX';

export default function mapLoadJobResToDTO(jobRes: LoadJobRes): LoadJobResDTO {
  return {
    jobs: jobRes.jobs,
    currentSort: jobRes.currentSort,
    page: jobRes.page,
    totalPages: jobRes.totalPages,
  };
}
