import React, { useEffect, useRef, useState } from 'react';
import JobListTile from '../../../components/common/JobListTile';
import { getJobs } from '../../../services/userServices';
import { Notify } from 'notiflix';
import { JobLevelData, JobTypesData, LoadJobsForPublicData, WorkModeData } from '../../../types/entityTypes';
import { BsSearch } from 'react-icons/bs';
import { BiChevronDown, BiMapPin } from 'react-icons/bi';
import { TbBriefcaseOff } from 'react-icons/tb';
import { Button } from '@mui/material';
import { recruiterFetchJobLevelLists, recruiterFetchJobTypeLists, recruiterFetchWorkModeLists } from '../../../services/recruiterServices';
import { toast } from 'react-toastify';

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
          toast.error(result?.message)
        }

        setJobLevelOptions(jobLevelResult.result)
        setJobTypeOptions(jobTypeResult.result)
        setWorkModeOptions(workModeResult.result)

      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs();
  }, [search, page, workModeFilter, jobLevelFilter, jobTypeFilter, locationSearch]);

  function searchJobs(event: React.ChangeEvent<HTMLInputElement>) {
    setsearch(event.target.value);
  }

  function debouncedSearch <T extends (...args: never[]) => void>(fn: T, dealy: number) {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, dealy);
    };
  }

  const dSearch = debouncedSearch(searchJobs, 500);

  return(
    <>
      <section className='job-listing-container pt-15 lg:pt-0 pb-10'>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
  {/* Header Title Section */}
  <div className="px-6 py-4 border-b border-gray-100">
    <h1 className="text-xl font-bold text-gray-900">Find your opportunities</h1>
    <p className="text-sm text-gray-500 mt-0.5">Discover roles that match your expertise and career goals</p>
  </div>

  <div className="p-5 bg-gray-50/50">
    {/* Integrated Search Bar */}
    <div className="flex flex-col md:flex-row items-stretch gap-0 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
      
      {/* Job Title Search */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
        <BsSearch size={16} className="text-gray-400" />
        <input 
          onKeyUp={(event) => dSearch(event)} 
          type="text" 
          className="w-full text-sm outline-none bg-transparent placeholder-gray-400" 
          placeholder="Job title, skills, or company" 
        />
      </div>

      {/* Location Search */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3">
        <BiMapPin size={18} className="text-gray-400" />
        <input 
          ref={locationSearchInputField} 
          type="text" 
          className="w-full text-sm outline-none bg-transparent placeholder-gray-400" 
          placeholder="City, state, or remote" 
        />
      </div>

      {/* Main Search Button */}
      <div className="p-1.5">
        <button 
          onClick={setSearchingLocation} 
          disabled={loading}
          className="h-full px-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors flex items-center justify-center min-w-[120px]"
        >
          {loading ? 'Searching...' : 'Find Jobs'}
        </button>
      </div>
    </div>

    {/* Quick Filters Row */}
    <div className="mt-4 flex flex-wrap gap-3">
      {[
        { label: jobTypeFilter, toggle: toggleJobTypeFilterOpen, isOpen: isJobTypeFilterOpen, options: jobTypeOptions, set: setJobTypeFilter, setOpen: setIsJobTypeFilterOpen },
        { label: jobLevelFilter, toggle: toggleJobLevelFilterOpen, isOpen: isJobLevelFilterOpen, options: jobLevelOptions, set: setJobLevelFilter, setOpen: setIsJobLevelFilterOpen },
        { label: workModeFilter, toggle: toggleWorkModeFilter, isOpen: isWorkModeFilterOpen, options: workModeOptions, set: setWorkModeFilter, setOpen: setIsWorkModeFilterOpen },
      ].map((filter, idx) => (
        <div key={idx} className="relative">
          <button 
            onClick={filter.toggle}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border rounded-full transition-all ${
              filter.label !== 'All' 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {filter.label}
            <BiChevronDown size={16} className={`${filter.isOpen ? 'rotate-180' : ''} transition-transform`} />
          </button>

          {filter.isOpen && (
            <div className="absolute top-full mt-2 z-30 bg-white w-48 border border-gray-200 rounded-lg shadow-xl py-1 animate-in fade-in zoom-in duration-100">
              <button 
                onClick={() => {filter.set('All'); filter.setOpen(false)}} 
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs"
              >
                All
              </button>
              {filter.options.map((option, i) => (
                <button 
                  key={i} 
                  onClick={() => {filter.set(option.name); filter.setOpen(false)}} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs text-gray-700"
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
          {/* <div className="header px-5 py-3 bg-white rounded-md border border-slate-200">
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
          </div> */}
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
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl">
  {/* Icon Container with a soft glow/bg */}
  <div className="relative mb-4">
    <div className="absolute inset-0 bg-slate-200 rounded-full blur-xl opacity-50 scale-150"></div>
    <div className="relative bg-white p-4 rounded-full shadow-sm border border-slate-100">
      <TbBriefcaseOff size={42} className="text-slate-400" />
    </div>
  </div>

  {/* Text Content */}
  <div className="text-center max-w-[250px]">
    <h3 className="text-slate-900 font-semibold text-lg">No jobs found</h3>
    {/* <p className="text-slate-500 text-sm mt-1 leading-relaxed">
      This recruiter hasn't posted any active job listings yet.
    </p> */}
  </div>
</div>
            )
          }
          
      </section>
    </>
  )

}
