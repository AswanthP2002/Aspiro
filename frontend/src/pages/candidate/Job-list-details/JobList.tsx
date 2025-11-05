import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import JobListTile from '../../../components/common/JobListTile';
import { useNavigate } from 'react-router-dom';
import JobFilterCandidateSide from '../../../components/candidate/JobFiltersCandidateSide';
import { getJobs } from '../../../services/userServices';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { Notify } from 'notiflix';
import { JobAggregatedData } from '../../../types/entityTypes';
interface filterState {
  industry: string[];
  jobType: string[];
  locationType: string[];
  minSalary: string;
  maxSalary: string;
}

export default function JobListing() {
  const [jobs, setjobs] = useState<JobAggregatedData[]>([]);
  const [search, setsearch] = useState('');
  const [locationSearch, setLoctionSearch] = useState('')
  const [page, setpage] = useState(1);
  const [totalPages, settotalpages] = useState(0);
  const [pagination, setpagination] = useState<any[]>([]);

  const [statusFilter, setStatusFilter] = useState('active')
  const [workModeFilter, setWorkModeFilter] = useState('all')
  const [jobLevelFilter, setJobLevelFilter] = useState('all')
  const [jobTypeFilter, setJobTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('Newest')

  const [industryFilterOpen, setIndustryFilterOpen] = useState(false);
  const [jobTyeFilterOpen, setJobTypeFilterOpen] = useState(false);
  const [locationTypeFilterOpen, setLocationTypeFilterOpen] = useState(false);

  // Filter view hide function
  const toggleIndustryFilter = () => {
    setIndustryFilterOpen((prv) => {
      if (!prv) {
        setJobTypeFilterOpen(false);
        setLocationTypeFilterOpen(false);
        return true;
      } else {
        return false;
      }
    });
  };

  const toggleJobTypeFilter = () => {
    setJobTypeFilterOpen((prv) => {
      if (!prv) {
        setIndustryFilterOpen(false);
        setLocationTypeFilterOpen(false);
        return true;
      } else {
        return false;
      }
    });
  };

  const toggleLocationFilter = () => {
    setLocationTypeFilterOpen((prv) => {
      if (!prv) {
        setIndustryFilterOpen(false);
        setJobTypeFilterOpen(false);
        return true;
      } else {
        return false;
      }
    });
  };

  const [sortvalue, setsortvalue] = useState('');
  const [visibleSort, setVisibleSort] = useState(false);
  const [currentSort, setCurrentSort] = useState('job-latest');
  const [filter, setFilter] = useState<filterState>({
    industry: [],
    jobType: [],
    locationType: [],
    minSalary: '',
    maxSalary: '',
  });
  const [minSalary, setMinSalary] = useState('');
  const [minSalaryError, setMinSalaryError] = useState('');
  const [maxSalaryError, setMaxSalaryError] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const navigator = useNavigate();

  function filterSalary() {
    const minSalary: any = document.getElementById('minSalary');
    const maxSalary: any = document.getElementById('maxSalary');

    //validation
    const minsalaryerror =
      !minSalary?.value || minSalary?.value.includes('.') || false;
    const maxsalaryerror =
      !maxSalary?.value || maxSalary?.value.includes('.') || false;

    minsalaryerror
      ? setMinSalaryError('Give minimum salary')
      : setMinSalaryError('');
    maxsalaryerror
      ? setMaxSalaryError('Give maximum salary')
      : setMaxSalaryError('');

    if (minsalaryerror || maxsalaryerror) return;

    setMinSalary(minSalary?.value);
    setMaxSalary(maxSalary?.value);
  }

  function handleIndustryChange(industry: string, isChecked: boolean) {
    setFilter((state: any) => {
      if (isChecked) {
        return { ...state, industry: [...state.industry, industry] };
      } else {
        return {
          ...state,
          industry: state.industry.filter((ind: string) => ind !== industry),
        };
      }
    });
  }

  function handleJobTypeChange(jobType: string, isChecked: boolean) {
    setFilter((state: any) => {
      if (isChecked) {
        return { ...state, jobType: [...state.jobType, jobType] };
      } else {
        return {
          ...state,
          jobType: state.jobType.filter((jt: string) => jt !== jobType),
        };
      }
    });
  }

  function handleLocationType(locationType: string, isChecked: boolean) {
    setFilter((state: any) => {
      if (isChecked) {
        return {
          ...state,
          locationType: [...state.locationType, locationType],
        };
      } else {
        return {
          ...state,
          locationType: state.locationType.filter(
            (lt: string) => lt !== locationType
          ),
        };
      }
    });
  }

  function toggleSortVisibility() {
    setVisibleSort((prev) => !prev);
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        const result = await getJobs(search, locationSearch, page, sortBy, statusFilter, workModeFilter, jobLevelFilter, jobTypeFilter)

        if (result.success) {
          console.log('Result from the backend :: jobs', result.result);
          setjobs(result?.result?.jobs);
          setpage(result?.result?.page);
          settotalpages(result?.result?.totalPages);
          setCurrentSort(result?.result?.currentSort);
          setpagination(new Array(result?.result?.totalPages).fill(0));
        }else{
          Notify.failure(result?.message, {timeout:2000})
        }
      } catch (error: unknown) {
        Notify.failure('Something went wrong', {timeout:2000})
      }
    }

    fetchJobs();
  }, [search, page, sortBy, statusFilter, workModeFilter, jobLevelFilter, jobTypeFilter, locationSearch]);

  const nextPage = () => setpage((prev) => prev + 1);
  const previousPage = () => setpage((prev) => prev - 1);
  const changePage = (pagenumber: number) => {
    setpage(pagenumber);
  };
  function searchJobs(event: any) {
    setsearch(event.target.value);
  }
  function locationSearchJobs(event: any) {
    setLoctionSearch(event.target.value);
  }


  function debouncedSearch(fn: Function, dealy: number) {
    let timer: any;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, dealy);
    };
  }

  const dSearch = debouncedSearch(searchJobs, 500);
  const dLocationSearch = debouncedSearch(locationSearchJobs, 700);


  useEffect(() => {
    console.log('this happened ot filter', filter);
  }, [filter]);

  return (
    <>
      <div className="job-listing-container w-full">
        {/* <div className="breadcrumbs-header bg-gray-100 w-full">
          <div className="aspiro-container">
            <div className="flex justify-between py-3">
              <div className="left">
                <p className="text-sm">Find Jobs</p>
              </div>
              <div className="right">
                <p className="text-sm">Home / Jobs</p>
              </div>
            </div>
          </div>
        </div> */}
        <section className="jobs mt-5">
          <div className="p-10">
            {/* Simplified filter implementation */}
            <div className="relative filter-wrapper mb-3 flex gap-3">
              {/* <div className="">
                <button
                  onClick={toggleIndustryFilter}
                  className={`${
                    industryFilterOpen ? 'bg-blue-500 text-white' : null
                  } text-xs border border-gray-400 text-gray-500 rounded-full px-3 py-2`}
                >
                  Industry{' '}
                  {filter?.industry?.length > 0
                    ? `(${filter?.industry?.length})`
                    : null}
                </button>
                <JobFilterCandidateSide
                  openFilter={industryFilterOpen}
                  filter={filter}
                  filterType="Industry"
                  handleFilterApply={handleIndustryChange}
                />
              </div> */}
              <div>
                <p className='text-xs text-gray-500 block'>Work Mode</p>
              <select value={workModeFilter} onChange={(event) => setWorkModeFilter(event.target.value)} className='border border-gray-300 !px-3 !py-1 rounded text-sm text-gray-700 outline-none' name="" id="workMode-filter">
                <option value="all">All</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              </div>
              <div>
                {/* <button
                  onClick={toggleJobTypeFilter}
                  className={`${
                    jobTyeFilterOpen ? 'bg-blue-500 text-white' : null
                  } text-xs border border-gray-400 text-gray-500 rounded-full px-3 py-2`}
                >
                  Job Type{' '}
                  {filter?.jobType?.length > 0
                    ? `(${filter?.jobType?.length})`
                    : null}
                </button>
                <JobFilterCandidateSide
                  openFilter={jobTyeFilterOpen}
                  filter={filter}
                  filterType="Jobtype"
                  handleFilterApply={handleJobTypeChange}
                /> */}
                <p className='text-xs text-gray-500 block'>Job Level</p>
                <select value={jobLevelFilter} onChange={(event) => setJobLevelFilter(event.target.value)} className='border border-gray-300 !px-3 !py-1 rounded text-sm text-gray-700 outline-none' name="" id="jobLevel-filter">
                  <option value="all">All</option>
                  <option value="Entry-level">Entry Level</option>
                  <option value="Mid-level">Mid Level</option>
                  <option value="Senior-level">Senior Level</option>
                  <option value="Lead">Lead</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div>
                <p className='text-xs text-gray-500 block'>Job Type</p>
                <select value={jobTypeFilter} onChange={(event) => setJobTypeFilter(event.target.value)} className='border border-gray-300 !px-3 !py-1 rounded text-sm text-gray-700 outline-none' name="" id="jobType-filter">
                  <option value="all">All</option>
                  <option value="Full-time">Full Time</option>
                  <option value="Part-time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
              {/* <button className="text-xs border border-gray-400 text-gray-500 rounded-full px-3 py-2">Salary</button> */}
              <div className="flex items-center gap-3">
                <div>
                  {/* <input
                    type="text"
                    id="minSalary"
                    placeholder="Minimum Salary"
                    className="border border-gray-400 rounded-sm !text-xs px-2 py-1"
                  />
                  <label
                    htmlFor=""
                    style={{
                      color: 'red',
                      display: 'block',
                      fontSize: '0.7rem',
                    }}
                  >
                    {minSalaryError}
                  </label> */}
                </div>
                <div>
                  {/* <input
                    type="text"
                    id="maxSalary"
                    placeholder="Minimum Salary"
                    className="border border-gray-400 rounded-sm !text-xs px-2 py-1"
                  />
                  <label
                    htmlFor=""
                    style={{
                      color: 'red',
                      display: 'block',
                      fontSize: '0.7rem',
                    }}
                  >
                    {maxSalaryError}
                  </label> */}
                </div>
                {/* <button
                  onClick={filterSalary}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded"
                >
                  Apply salary filter
                </button> */}
              </div>
            </div>
            <div className="search-header w-full">
              <div className="search-wrapper-w-full flex justify-between bg-white p-1 rounded-sm items-center border border-gray-300">
                <div className="search bg-white flex gap-3">
                  <div className="job-title-search relative">
                    <i className="fa-solid fa-magnifying-glass absolute top-3 !text-blue-300"></i>
                    <input
                      onKeyUp={(event) => dSearch(event)}
                      type="text"
                      name=""
                      id=""
                      className="px-7 py-2"
                      placeholder="Search by job title"
                    />
                  </div>
                  <div className="job-location-search relative">
                    <i className="fa-solid fa-location-dot absolute top-3 !text-blue-300"></i>
                    <input
                      type="text"
                      name=""
                      onKeyUp={(event) => dSearch(event)}
                      className="px-7 py-2"
                      id=""
                      placeholder="Search by locations"
                    />
                  </div>
                </div>
                <div className="actions relative">
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className='border border-gray-500 text-sm !px-3 !py-1 rounded'>
                      <option value="Newest">Newly Posted</option>
                      <option value="Oldest">Oldest</option>
                      <option value="Salry-low">Salary low</option>
                      <option value="Salary-high">Salary high</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="job-list mt-10">
              <div className="grid grid-cols-1">
                {jobs.length > 0 ? (
                  <>
                    {jobs.map((job: JobAggregatedData, index: number) => {
                      return (
                        <>
                          <JobListTile key={index} data={job} />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 text-center absolute">
                    No jobs posted
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="w-full mt-10 mb-10 flex justify-center">
          <div className="flex gap-5">
            {page > 1 ? (
              <button
                onClick={previousPage}
                type="button"
                className="bg-blue-100 w-[30px] h-[30px] btn-prev rounded-full"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            ) : null}
            {pagination.map((_, index: number) => {
              return (
                <>
                  <button
                    onClick={() => changePage(index + 1)}
                    type="button"
                    className={
                      page === index + 1
                        ? 'bg-blue-500 text-white w-[30px] h-[30px] btn rounded-full'
                        : 'bg-blue-100 w-[30px] h-[30px] btn rounded-full'
                    }
                  >
                    {index + 1}
                  </button>
                </>
              );
            })}
            {page < totalPages ? (
              <button
                onClick={nextPage}
                type="button"
                className="bg-blue-100 w-[30px] h-[30px] btn-next rounded-full"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
