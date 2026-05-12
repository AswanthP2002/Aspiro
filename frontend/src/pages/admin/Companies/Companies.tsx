import { useEffect, useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { AdminCompanyData } from "../../../types/entityTypes";
import { adminLoadCompaniesData } from "../../../services/companyServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function CompaniesPage(){
    const [companies, setCompanies] = useState<AdminCompanyData[]>([])
    const [companyDetails, setCompanyDetails] = useState<AdminCompanyData | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const selectACompany = (index: number) => {
        if(index){
            setCompanyDetails(companies[index])
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        async function loadCompaniesData(){
            try {
                const result = await adminLoadCompaniesData(page)
                if(result.success){
                    console.log('Companies result from the backend --', result.result)
                    setCompanies(result.result.companies)
                    setTotalPages(result.result.totalPages)
                    if(result.result.companies.length > 0 ){
                        setCompanyDetails(result.result.companies[0])
                    }else{
                        setCompanyDetails(null)
                    }
                    
                }else{
                    setCompanies([])
                }
            } catch (error: unknown) {
                const err = error as AxiosError<{message: string}>
                const finalMessage = err.response?.data.message || err.message || 'Something went wrong'
                toast.error(finalMessage)
            }
        }

        loadCompaniesData()
    }, [page])

    return(
        <>
            <div className="w-full min-h-screen bg-gray-50 p-5 lg:px-20 lg:py-10">
                <div className="flex w-full justify-between">
                    <div>
                        <p className="text-xl font-semibold tracking-wide">Company Management</p>
                        <p className="mt-1 text-sm text-gray-700">Manage company page and information</p>
                    </div>
                    <div>
                        <div className="bg-white w-fit border border-slate-200 flex gap-2 rounded-md">
                            <button onClick={() => navigate('/admin/recruiters')} className={`text-xs p-1 rounded-md ${window.location.href.includes('recruiters') ? "bg-blue-500 text-white" : "bg-white text-black"}`}>Recruiters</button>
                            <button onClick={() => navigate('/admin/companies')} className={`text-xs p-1 rounded-md ${window.location.href.includes('companies') ? "bg-blue-500 text-white" : "bg-white text-black"}`}>Companies</button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-7 order-2 lg:order-1 border-2 border-slate-200 rounded-lg">
                        <div className="p-5 border-b border-slate-200">
                            <p className="font-semibold tracking-wide">All Companies</p>
                            <p className="text-xs text-gray-700">comapnies registered</p>
                        </div>
                        <div className="div bg-white">
                            {companies.map((company, index) => (
                                <div onClick={() => selectACompany(index)} key={company._id} className="p-3 border-b flex gap-5 border-slate-200 transition-color duration-300 hover:bg-gray-100 cursor-pointer">
                                    <div className="bg-gradient-to-br shadow-[0_0_30px_2px_rgba(100,0,250,0.2)] from-blue-600 to-indigo-700 w-12 h-12 rounded-md flex items-center justify-center text-white">
                                        <p>TC</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold tracking-wide">{company.name}</p>
                                        <p className="text-xs text-gray-700">{company.slogan}</p>
                                        <span className="flex items-center gap-2 mt-2">
                                            <a href={company.website} className="text-xs text-blue-500 underline">{company.name}</a>
                                            <p>|</p>
                                            <p className="text-xs text-gray-700">{company.recruiters} recruiters</p>
                                            <p>|</p>
                                            <p className="text-xs text-gray-700">{company.jobs} jobs</p>
                                        </span>
                                        <span className="flex items-center gap-5 mt-3 text-xs text-gray-700">
                                            {/* <p>{company.keyword}</p> */}
                                            <p className="flex items-center gap-2"><MdLocationOn />{company.location}</p>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 p-2 justify-end">
                            <button disabled={page === 1} className="text-sm disabled:text-gray-400 disabled:bg-gray-300 px-4 py-2 border border-slate-200 rounded-lg bg-white shadow-xl">Prev</button>
                            <button disabled={page >= totalPages} className="text-sm disabled:text-gray-400 disabled:bg-blue-400 px-4 py-2 border border-slate-200 rounded-lg bg-blue-600 text-white shadow-xl shadow-blue-200">Next</button>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 border-2 rounded-lg border-slate-200">
                        <div className="p-5">
                            <p className="font-semibold tracking-wide">Comapny Details</p>
                        </div>
                        <div className="bg-white p-5 rounded-b rounded-lg">
                            {companyDetails
                                ? <>
                                    <div className="w-full flex justify-center">
                                <div className="w-14 h-14 rounded-mg bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center rounded-md text-white">
                                    <p>{companyDetails.name[0]}</p>
                                </div>
                            </div>
                            <div className="mt-5 border-b border-slate-200 py-3">
                                <div>
                                    <p className="text-xs uppercase font-medium text-gray-400 tracking-wide">company name</p>
                                    <p className="font-semibold">{companyDetails.name}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs uppercase font-medium text-gray-400 tracking-wide">Description</p>
                                    <p className="text-sm leading-relaxed text-gray-700">{companyDetails.description}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs uppercase font-medium text-gray-400 tracking-wide">website</p>
                                    <a href={companyDetails.website} className="text-sm text-blue-500 underline">{companyDetails.name}</a>
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs uppercase font-medium text-gray-400 tracking-wide">Linkedin</p>
                                    <a href={companyDetails.linkedin} className="text-sm text-blue-500 underline">linkedin.com</a>
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs uppercase font-medium text-gray-400 tracking-wide">industry</p>
                                    <p className="text-sm text-gray-800">{companyDetails.industry}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs uppercase font-medium text-gray-400 tracking-wide">location</p>
                                    <p className="text-sm text-gray-800">{companyDetails.location}</p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-5">
                                <div className="bg-blue-100 text-center p-5 rounded-lg">
                                    <p className="text-blue-700 font-bold text-xl">{companyDetails.recruiters}</p>
                                    <p className="text-sm text-gray-700">Recruiters</p>
                                </div>
                                <div className="bg-green-100 text-center p-5 rounded-lg">
                                    <p className="text-green-700 font-bold text-xl">{companyDetails.jobs}</p>
                                    <p className="text-sm text-gray-700">Jobs</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button className="bg-blue-600 text-white w-full p-3 rounded-md text-sm font-semibold shadow-xl shadow-blue-100 transition-color duration-300 hover:bg-blue-400 hover:shadow-xl">Edit Company profile</button>
                                <button className="mt-3 bg-red-600 w-full text-white p-3 text-sm font-semibold rounded-md shadow-xl shadow-red-100 transition-color duration-300 hover:bg-red-400 hover:shadow-xl">Delete Company</button>
                            </div>
                                  </>
                                : <div>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}