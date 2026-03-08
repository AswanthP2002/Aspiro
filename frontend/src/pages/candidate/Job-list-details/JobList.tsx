import { useEffect, useRef, useState } from 'react';
import JobListTile from '../../../components/common/JobListTile';
import { getJobs } from '../../../services/userServices';
import { Notify } from 'notiflix';
import { JobLevelData, JobTypesData, LoadJobsForPublicData, WorkModeData } from '../../../types/entityTypes';
import { BsSearch } from 'react-icons/bs';
import { BiChevronDown, BiMapPin } from 'react-icons/bi';
import { TbBriefcaseOff } from 'react-icons/tb';
import { Button } from '@mui/material';
import { recruiterFetchJobLevelLists, recruiterFetchJobTypeLists, recruiterFetchWorkModeLists } from '../../../services/recruiterServices';

export default function JobListing() {
  const [jobs, setjobs] = useState<LoadJobsForPublicData[]>([]);
  const [search, setsearch] = useState('');
  const [locationSearch, setLoctionSearch] = useState('')
  const [page, setpage] = useState(1);
  const [totalPages, settotalpages] = useState(0);
  const [loading, setLoading] = useState(false)

  const [workModeFilter, setWorkModeFilter] = useState('All')
  const [jobLevelFilter, setJobLevelFilter] = useState('All')
  const [jobTypeFilter, setJobTypeFilter] = useState('All')

  const [isJobTypeFilterOpen, setIsJobTypeFilterOpen] = useState(false)
  const [isJobLevelFilterOpen, setIsJobLevelFilterOpen] = useState(false)
  const [isWorkModeFilterOpen, setIsWorkModeFilterOpen] = useState(false)

  const [jobTypeOptions, setJobTypeOptions] = useState<JobTypesData[]>([])
  const [jobLevelOptions, setJobLevelOptions] = useState<JobLevelData[]>([])
  const [workModeOptions, setWorkModeOptions] = useState<WorkModeData[]>([])
  
  const locationSearchInputField = useRef<HTMLInputElement | null>(null)

  const toggleJobTypeFilterOpen = () => {
    setIsJobTypeFilterOpen((prv) => {
      if(!prv){
        setIsJobLevelFilterOpen(false)
        setIsWorkModeFilterOpen(false)
        return true
      }else{
        return false
      }
    })
  }

  const setSearchingLocation = () => {
    const value = locationSearchInputField.current?.value
    setLoctionSearch(value as string)
  }

  const toggleJobLevelFilterOpen = () => {
    setIsJobLevelFilterOpen((prv) => {
      if(!prv){
        setIsJobTypeFilterOpen(false)
        setIsWorkModeFilterOpen(false)
        return true
      }else {
        return false
      }
    })
  }

  const toggleWorkModeFilter = () => {
    setIsWorkModeFilterOpen((prv) => {
      if(!prv){
        setIsJobTypeFilterOpen(false)
        setIsJobLevelFilterOpen(false)
        return true
      }else{
        return false
      }
    })
  }

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true)
      try {
        const [jobLevelResult, jobTypeResult, workModeResult] = await Promise.all([recruiterFetchJobLevelLists(), recruiterFetchJobTypeLists(), recruiterFetchWorkModeLists()])
        const result = await getJobs(search, locationSearch, page, workModeFilter, jobLevelFilter, jobTypeFilter)

        if (result.success) {
          console.log('Result from the backend :: jobs', result.result);
          setjobs(result?.result?.jobs);
          settotalpages(result?.result?.totalPages);
        }else{
          Notify.failure(result?.message, {timeout:2000})
        }

        setJobLevelOptions(jobLevelResult.result)
        setJobTypeOptions(jobTypeResult.result)
        setWorkModeOptions(workModeResult.result)

      } catch (error: unknown) {
        Notify.failure('Something went wrong', {timeout:2000})
      } finally {
        setLoading(false)
      }
    }

    fetchJobs();
  }, [search, page, workModeFilter, jobLevelFilter, jobTypeFilter, locationSearch]);

  function searchJobs(event: any) {
    setsearch(event.target.value);
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

  return(
    <>
      <section className='job-listing-container pb-10'>
          <div className="header px-5 py-3 bg-white rounded-md border border-slate-200">
              <p >Find your opportunities</p>
              <p className='text-xs text-gray-500'>Discover opportunities that matches your skills</p>
              <div className="mt-3 grid grid-cols-12 gap-2">
                <div className="col-span-12 border border-slate-200 rounded-md flex items-center gap-3 p-2">
                  <BsSearch size={12} color='gray' />
                  <input onKeyUp={(event) => dSearch(event)} type="text" className='w-full !text-xs' placeholder='Search job tile, skills' />
                </div>
                <div className='col-span-12 flex gap-2'>
                  <div className="border flex-1 border-slate-200 rounded-md flex items-center gap-3 p-2">
                  <BiMapPin size={12} color='gray' />
                  <input ref={locationSearchInputField} type="text" className='w-full !text-xs' placeholder='Search location' />
                </div>
                <Button type='button' loading={loading} onClick={setSearchingLocation} className='!text-xs' variant='contained' >Search</Button>
                </div>
                <div className="col-span-4 border border-slate-200 p-2 rounded-md relative">
                  <div className="flex justify-between items-center">
                    <p className='text-xs font-medium text-center'>{jobTypeFilter}</p>
                    <button onClick={toggleJobTypeFilterOpen}><BiChevronDown /></button>
                  </div>
                  {isJobTypeFilterOpen && (
                    <div className="absolute bg-white text-xs flex flex-col w-full left-0 border border-slate-200 rounded-md shadow-sm">
                     <button onClick={() => {setJobTypeFilter('All'); setIsJobTypeFilterOpen(false)}} className='hover:bg-gray-200 py-2'>All</button>
                    {jobTypeOptions.map((option: JobTypesData, index: number) => (
                      <button onClick={() => {setJobTypeFilter(option.name as string); setIsJobTypeFilterOpen(false)}} key={index} className='hover:bg-gray-200 py-2'>{option.name}</button>
                    ))}
                  </div>
                  )}
                </div>
                <div className="col-span-4 border border-slate-200 p-2 rounded-md relative">
                  <div className="flex justify-between items-center">
                    <p className='text-xs font-medium text-center'>{jobLevelFilter}</p>
                    <button onClick={toggleJobLevelFilterOpen}><BiChevronDown /></button>
                  </div>
                  {isJobLevelFilterOpen && (
                    <div className="absolute bg-white text-xs flex flex-col w-full left-0 border border-slate-200 rounded-md shadow-sm">
                    <button onClick={() => {setJobLevelFilter('All'); setIsJobLevelFilterOpen(false)}} className='hover:bg-gray-200 py-2'>All</button>
                    {jobLevelOptions.map((option: JobLevelData, index: number) => (
                      <button onClick={() => {setJobLevelFilter(option.name as string); setIsJobLevelFilterOpen(false)}} key={index} className='hover:bg-gray-200 py-2'>{option.name}</button>
                    ))}
                  </div>
                  )}
                </div>
                <div className="col-span-4 border border-slate-200 p-2 rounded-md relative">
                  <div className="flex justify-between items-center">
                    <p className='text-xs font-medium text-center'>{workModeFilter}</p>
                    <button onClick={toggleWorkModeFilter}><BiChevronDown /></button>
                  </div>
                  {isWorkModeFilterOpen && (
                    <div className="absolute bg-white text-xs flex flex-col w-full left-0 border border-slate-200 rounded-md shadow-sm">
                    <button onClick={() => {setWorkModeFilter('All'); setIsWorkModeFilterOpen(false)}} className='hover:bg-gray-200 py-2'>All</button>
                    {workModeOptions.map((option: WorkModeData, index: number) => (
                      <button onClick={() => {setWorkModeFilter(option.name as string); setIsWorkModeFilterOpen(false)}} key={index} className='hover:bg-gray-200 py-2'>{option.name}</button>
                    ))}
                  </div>
                  )}
                </div>
              </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3">
            {jobs.length > 0 && (
              jobs.map((job: LoadJobsForPublicData) => (
                <JobListTile key={job._id} data={job} />
              ))
            )}
          </div>
          {jobs.length > 0 && (
            <div className='flex mt-5 items-center justify-center gap-3'>
            <button onClick={() => setpage(prv => prv - 1)} disabled={page === 1} className={`border border-slate-300 rounded-md text-xs font-medium px-3 py-2 ${page === 1 ? "bg-gray-300 text-gray-400": "bg-white"}`}>Prev</button>
            {
              Array.from(new Array(totalPages)).map((_, index) => (
                <button onClick={() => setpage(index + 1)} className={`${page === index + 1 ? "bg-blue-500 text-white" : "bg-white border border-slate-300"} px-4 py-1 rounded-md`}>{index + 1}</button>
              ))
            }
            <button onClick={() => setpage(prv => prv + 1)} disabled={page >= totalPages} className={`border border-slate-300 rounded-md text-xs font-medium px-3 py-2 ${page >= totalPages ? "bg-gray-300 text-gray-400": "bg-white"}`}>Next</button>
          </div>
          )}
          {
            jobs.length === 0 && (
              <div className='text-xs text-center flex justify-center flex-col items-center gap-2'>
                <TbBriefcaseOff size={50} color='gray' />
                <p>No jobs found</p>
              </div>
            )
          }
          
      </section>
    </>
  )

}
