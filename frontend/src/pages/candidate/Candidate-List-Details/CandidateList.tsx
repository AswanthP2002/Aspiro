import { useEffect, useState } from "react";
import { candidatesData } from "../../../assets/data/dummyCandidateDetails";
import defaultPicture from '/default-img-instagram.png'
import { getCandidates } from "../../../services/commonServices";
import { useNavigate } from "react-router-dom";

interface FilterType {
    jobRole:string[]
    status:boolean[]
}

export default function CandidatesList() {
    const [candidates, setCandidates] = useState<any>([])
    const [filter, setFilter] = useState<FilterType>({
        jobRole:[],
        status:[]
    })
    const [sort, setSort] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [totalPages, setTotalPages] = useState(0)
    const [pagination, setPagination] = useState<any>([])
    const [search, setSearch] = useState("")

    const navitateTo = useNavigate()

    function searchCandiates(event : any){
        setSearch(event?.target?.value)
    }

    function debouncedSearch(fun : Function, delay : number){
        let timer : any
        return function(...args : any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fun(...args)
            }, delay)
        }
    }

    function goToCandidatePublicProfile(candidateId : string){
        navitateTo(`${candidateId}`, {state:{candidateId}})
    }

    const dbSearch = debouncedSearch(searchCandiates, 600)
    console.log('This is search keyword', search)

    useEffect(() => {
        (async function () {
            const result = await getCandidates(search, page, limit, sort, filter)
            console.log('candidate result is here', result)
            if (result?.success) {
                setCandidates(result?.result?.candidates)
                setPage(result?.result?.currentPage)
                setTotalPages(result?.result?.totalPages)
                setPagination(new Array(result?.result?.totalPages).fill(0))
            }
        })()
    }, [page, search])
    return (
        <>
            <div className="candidate-listing-container w-full">
                <div className="breadcrumbs-header bg-gray-100 w-full">
                    <div className="aspiro-container">
                        <div className="flex justify-between py-3">
                            <div className="left"><p className="text-sm">Find Candidates</p></div>
                            <div className="right"><p className="text-sm">Home / Candidates</p></div>
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
                                        <input onKeyUp={(event) => dbSearch(event)} type="text" name="" id="" className="px-7 py-2" placeholder="candidate name" />
                                    </div>
                                    <div className="job-location-search relative">
                                        <i className="fa-solid fa-location-dot absolute top-3 !text-blue-300"></i>
                                        <input type="text" name="" className="px-7 py-2" id="" placeholder="Search by locations" />
                                    </div>
                                </div>
                                <div className="actions relative">
                                    <button type="button" className="px-3 py-1 btn filter bg-gray-300 rounded me-3"><i className="me-2 fa-solid fa-filter !text-sm"></i>Filter</button>
                                    <button type="button" className="px-3 py-1 btn sort bg-blue-400 text-white rounded"><i className="me-2 fa-solid fa-sort !text-sm"></i>Sort</button>

                                    {/* sort */}
                                    {
                                        false
                                            ? <div className="sort shadow absolute right-0 w-full bg-blue-200 p-3">
                                                <ul>
                                                    <li><input type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Salry high to low</label></li>
                                                    <li><input type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Salry low to high</label></li>
                                                    <li><input type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Job latest</label></li>
                                                    <li><input type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Job oldest</label></li>
                                                </ul>
                                            </div>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="job-list mt-10">
                            {
                                candidates?.length > 0
                                    ? <>
                                        <div className="grid grid-cols-4 gap-5">
                                            {
                                                candidates.map((candidate: any, index: number) => {
                                                    return <div className="border border-gray-300 p-3 rounded" key={index}>
                                                        <div className="flex gap-3 items-center">
                                                            <img className="w-[60px] h-[60px] rounded-full"
                                                                style={{objectFit:'cover'}}
                                                                src={candidate?.profilePicture?.cloudinarySecureUrl ? candidate?.profilePicture?.cloudinarySecureUrl : defaultPicture} alt="" />
                                                            <div>
                                                                <p className="text-sm font-semibold">{candidate?.name}</p>
                                                                <p className="text-xs text-gray-500 mt-1">{candidate?.role}</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => goToCandidatePublicProfile(candidate?._id)} className="mt-3 bg-blue-300 text-sm w-full rounded py-1 text-white">View</button>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </>
                                    : <p className="text-center text-sm text-gray">No candidates Found</p>
                            }
                        </div>
                    </div>
                </section>
                <div className="w-full mt-10 mb-10 flex justify-center">
                    <div className="flex gap-5">
                        
                        {
                            page > 1 && (<button onClick={() => setPage(prev => prev - 1)} type="button" className="bg-blue-100 w-[30px] h-[30px] btn-prev rounded-full"><i className="fa-solid fa-arrow-left"></i></button>)
                        }

                        {
                            pagination?.map((_ : any, index : number) => {
                                return(<button onClick={() => setPage(index + 1)} className={`${page === index + 1 ? "bg-blue-500 text-white" : "bg-blue-300"} w-[30px] h-[30px] btn rounded-full`}>{index + 1}</button>)
                            })
                        }

                        {
                            page < totalPages && (<button onClick={() => setPage(prev => prev + 1)} type="button" className="bg-blue-100 w-[30px] h-[30px] btn-next rounded-full"><i className="fa-solid fa-arrow-right"></i></button>)
                        }

                        {/* } */}
                    </div>
                </div>
            </div>
        </>
    )
}