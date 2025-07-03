import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import JobListTile from "../../../components/common/JobListTile"
import { useNavigate } from "react-router-dom"
import { industryTypes } from "../../../assets/data/companyDetailsArrayData"
interface filterState {
    industry: string[]
    jobType: string[]
    locationType: string[]
    minSalary: string
    maxSalary: string
}
// const industryTypesTyped : string[] = industryTypes

export default function JobListing() {

    const [jobs, setjobs] = useState<any[]>([])
    const [search, setsearch] = useState("")
    const [page, setpage] = useState(1)
    const [totalPages, settotalpages] = useState(0)
    const [pagination, setpagination] = useState<any[]>([])

    const [sortvalue, setsortvalue] = useState('')
    const [visibleSort, setVisibleSort] = useState(false)
    const [currentSort, setCurrentSort] = useState('job-latest')
    const [filter, setFilter] = useState<filterState>({
        industry:[],
        jobType:[],
        locationType:[],
        minSalary:'',
        maxSalary:''
    })
    const [visibleFilter, setVisibleFilter] = useState(false)

    const navigator = useNavigate()

    function handleIndustryChange(industry : string, isChecked : boolean) {
        setFilter((state : any) => {
            if(isChecked){
                return {...state, industry:[...state.industry, industry]}
            }else{
                return {...state, industry:state.industry.filter((ind : string) => ind !== industry)}
            }
        })
    }

    function handleJobTypeChange(jobType : string, isChecked : boolean) {
       setFilter((state : any) => {
            if(isChecked){
                return {...state, jobType:[...state.jobType, jobType]}
            }else {
                return {...state, jobType:state.jobType.filter((jt : string) => jt !== jobType)}
            }
       })
    }

    function handleLocationType(locationType : string, isChecked : boolean){
        setFilter((state : any) => {
            if(isChecked){
                return {...state, locationType:[...state.locationType, locationType]}
            }else {
                return {...state, locationType:state.locationType.filter((lt : string) => lt !== locationType)}
            }
        })
    }

    function toggleSortVisibility(){
        setVisibleSort(prev => !prev)
    }

    function viewJobDetails(id : any){
        navigator(`${id}`)
    }

    useEffect(() => {
        async function fetchJobs(){
            async function makeRequest(){
                return fetch(`http://localhost:5000/jobs?search=${search}&page=${page}&sort=${sortvalue}&filter=${encodeURIComponent(JSON.stringify(filter))}`, {
                    method:'GET',
                })
            }

            try {
                let response = await makeRequest()

                const result = await response.json()

                if(result.success){
                    console.log('Result from the backend :: jobs', result.result)
                    setjobs(result?.result?.jobs)
                    setpage(result?.result?.page)
                    settotalpages(result?.result?.totalPages)
                    setCurrentSort(result?.result?.currentSort)
                    setpagination(new Array(result?.result?.totalPages).fill(0))
                }
            } catch (error : unknown) {
                console.log('Error occured while fetching the jobs', error)
                if (error instanceof Error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error?.message
                    })
                }
            }
        }

        fetchJobs()
    }, [search, page, sortvalue, filter])

    const nextPage = () => setpage(prev => prev + 1)
    const previousPage = () => setpage(prev => prev - 1)
    const changePage = (pagenumber : number) => {
        setpage(pagenumber)
    }
    function searchJobs(event : any) {
        setsearch(event.target.value)
    }
    function debouncedSearch(fn : Function, dealy : number){
        let timer : any
        return function(...args : any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, dealy);
        }
    }

    function handleMinSalary(salary : string) {
        setFilter((prevState : any) => {
            return {
                ...prevState,
                minSalary:salary
            }
        })
    }

    function handleMaxSalary(salary : string) {
        setFilter((prevState : any) => {
            return {
                ...prevState,
                maxSalary:salary
            }
        })
    }

    const dSearch = debouncedSearch(searchJobs, 500)

    useEffect(() => {
        console.log('this happened ot filter', filter)
    }, [filter])

    return (
        <>  {
            visibleFilter
                ? <>
                    <div style={{ zIndex: '1000' }} className="shadow filter bg-white w-[250px] h-screen absolute top-0 left-0">
                        <div className="flex justify-between p-3">
                            <p className="text-blue-500">Filter</p>
                            <i onClick={() => setVisibleFilter(false)} className="cursor-pointer fa-solid fa-circle-xmark cursor-pointer"></i>
                        </div>
                        <div className="industries p-3 ">
                            <p className="text-sm font-normal text-gray-500">Industries</p>
                            <div className="overflow-y-scroll max-h-[300px]" >
                                <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">All</label></li>
                                {
                                    industryTypes.map((industry: string, index: number) => {
                                        return (
                                            <li key={index} className="list-none"><input type="checkbox" checked={filter.industry.includes(industry)} onChange={(event) => handleIndustryChange(industry, event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">{industry}</label></li>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="job-type p-3">
                            <p className="text-sm font-normal text-gray-500">Job Type</p>
                            <div>
                                <li className="list-none"><input type="checkbox" checked={filter.jobType.includes('Full-Time')} onChange={(event) => handleJobTypeChange('Full-Time', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Full-Time</label></li>
                                <li className="list-none"><input type="checkbox" checked={filter.jobType.includes('Part-Time')} onChange={(event) => handleJobTypeChange('Part-Time', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Part-Time</label></li>
                                <li className="list-none"><input type="checkbox" checked={filter.jobType.includes('Internship')} onChange={(event) => handleJobTypeChange('Internship', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Internship</label></li>
                            </div>
                        </div>

                        <div className="lcoation-type p-3">
                            <p className="text-sm font-normal text-gray-500">Location Type</p>
                            <div>
                                <li className="list-none"><input type="checkbox" checked={filter.locationType.includes('In-Office')} onChange={(event) => handleLocationType('In-Office', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">In-Office</label></li>
                                <li className="list-none"><input type="checkbox" checked={filter.locationType.includes('Remote')} onChange={(event) => handleLocationType('Remote', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Remote</label></li>
                                
                            </div>
                        </div>

                        <div className="salary p-3">
                            <p className="text-sm font-normal text-gray-500">Salary (Monthly)</p>
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label htmlFor="" className="!text-xs">Min Salary</label>
                                    <input value={filter.minSalary} onChange={(event) => handleMinSalary(event.target.value)} type="number" className="border border-gray-300 w-full" name="" id="" />
                                </div>

                                <div className="w-1/2">
                                    <label htmlFor="" className="!text-xs">Max Salary</label>
                                    <input value={filter.maxSalary} onChange={(event) => handleMaxSalary(event.target.value)} type="number" className="border border-gray-300 w-full" name="" id="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : null
        }
            <div className="job-listing-container w-full">
                <div className="breadcrumbs-header bg-gray-100 w-full">
                    <div className="aspiro-container">
                        <div className="flex justify-between py-3">
                            <div className="left"><p className="text-sm">Find Jobs</p></div>
                            <div className="right"><p className="text-sm">Home / Jobs</p></div>
                        </div>
                    </div>
                </div>
                <section className="jobs mt-5">
                    <div className="aspiro-container">
                        <div className="search-header w-full">
                            <div className="search-wrapper-w-full flex justify-between bg-white p-2 rounded-sm items-center border border-gray-300">
                                <div className="search bg-white flex gap-3">
                                    <div className="job-title-search relative">
                                        <i className="fa-solid fa-magnifying-glass absolute top-3 !text-blue-300"></i>
                                        <input onKeyUp={(event) => dSearch(event)} type="text" name="" id="" className="px-7 py-2" placeholder="Search by job title" />
                                    </div>
                                    <div className="job-location-search relative">
                                        <i className="fa-solid fa-location-dot absolute top-3 !text-blue-300"></i>
                                        <input type="text" name="" className="px-7 py-2" id="" placeholder="Search by locations" />
                                    </div>
                                </div>
                                <div className="actions relative">
                                    <button onClick={() => setVisibleFilter(true)} type="button" className="px-3 py-1 btn filter bg-gray-300 rounded me-3"><i className="me-2 fa-solid fa-filter !text-sm"></i>Filter</button>
                                    <button onClick={toggleSortVisibility} type="button" className="px-3 py-1 btn sort bg-blue-400 text-white rounded"><i className="me-2 fa-solid fa-sort !text-sm"></i>Sort</button>
                                
                                {/* sort */}
                                {
                                    visibleSort
                                            ? <div className="sort shadow absolute right-0 w-full bg-blue-200 p-3">
                                                <ul>
                                                    <li><input checked={currentSort === 'salary-high' ? true : false} onChange={() => setsortvalue('salary-high')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Salry high to low</label></li>
                                                    <li><input checked={currentSort === 'salary-low' ? true : false} onChange={() => setsortvalue('salary-low')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Salry low to high</label></li>
                                                    <li><input checked={currentSort === 'job-latest' ? true : false} onChange={() => setsortvalue('job-latest')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Job latest</label></li>
                                                    <li><input checked={currentSort === 'job-oldest' ? true : false} onChange={() => setsortvalue('job-oldest')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Job oldest</label></li>
                                                </ul>
                                            </div>
                                            : null
                                }
                                </div>
                            </div>
                        </div>
                        <div className="job-list mt-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {
                                        jobs.map((job : any, index : number) => {
                                            return(
                                                <>
                                                    <button onClick={() => viewJobDetails(job?._id)}>
                                                        <JobListTile key={index} data={job} />
                                                    </button>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                        </div>
                    </div>
                </section>
                <div className="w-full mt-10 mb-10 flex justify-center">
                    <div className="flex gap-5">
                        {
                            page > 1 
                                ? <button onClick={previousPage} type="button" className="bg-blue-100 w-[30px] h-[30px] btn-prev rounded-full"><i className="fa-solid fa-arrow-left"></i></button>
                                : null
                        }
                        {
                            pagination.map((_, index : number) => {
                                return(
                                    <>
                                        <button onClick={() => changePage(index + 1)} type="button" className={page === index + 1 ? "bg-blue-500 text-white w-[30px] h-[30px] btn rounded-full" : "bg-blue-100 w-[30px] h-[30px] btn rounded-full"}>{index + 1}</button>
                                    </>
                                )
                            })
                        }
                        {
                            page < totalPages
                                ? <button onClick={nextPage} type="button" className="bg-blue-100 w-[30px] h-[30px] btn-next rounded-full"><i className="fa-solid fa-arrow-right"></i></button>
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}