import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import JobListTile from "../../../components/common/JobListTile"

export default function JobListing() {

    const [jobs, setjobs] = useState<any[]>([])
    const [search, setsearch] = useState("")
    const [page, setpage] = useState(1)
    const [totalPages, settotalpages] = useState(0)
    const [pagination, setpagination] = useState<any[]>([])

    useEffect(() => {
        async function fetchJobs(){
            async function makeRequest(){
                return fetch(`http://localhost:5000/jobs?search=${search}&page=${page}`, {
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
    }, [search, page])

    const nextPage = () => setpage(prev => prev + 1)
    const previousPage = () => setpage(prev => prev - 1)
    const changePage = (pagenumber : number) => {
        setpage(pagenumber)
    }
    function searchJobs(event : any) {
        setsearch(event.target.value)
    }
    function debouncedSearch(fn : Function, dealy : number){
        let timer : number
        return function(...args : any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, dealy);
        }
    }

    const dSearch = debouncedSearch(searchJobs, 500)

    return (
        <>
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
                                <div className="actions">
                                    <button type="button" className="px-3 py-1 btn filter bg-gray-300 rounded me-3"><i className="me-2 fa-solid fa-filter !text-sm"></i>Filter</button>
                                    <button type="button" className="px-3 py-1 btn sort bg-blue-400 text-white rounded"><i className="me-2 fa-solid fa-sort !text-sm"></i>Sort</button>
                                </div>
                            </div>
                        </div>
                        <div className="job-list mt-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {
                                        jobs.map((job : any, index : number) => {
                                            return(
                                                <>
                                                    <JobListTile key={index} data={job} />
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