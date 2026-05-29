import { useEffect, useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { AdminCompanyData } from "../../../types/entityTypes";
import { adminEditCompany, adminLoadCompaniesData } from "../../../services/companyServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, FormHelperText, Modal } from "@mui/material";
import { LuX } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function CompaniesPage(){
    const [companies, setCompanies] = useState<AdminCompanyData[]>([])
    const [companyDetails, setCompanyDetails] = useState<AdminCompanyData | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isEditing, setIsEditing] = useState(false)
    
    const closeEditing = () => setIsEditing(false)

    const onCompanyEdit = (editedData: AdminCompanyData) => {
        setCompanies((prv: AdminCompanyData[]) => {
            return prv.map((company: AdminCompanyData) => {
                if(company._id === editedData._id){
                    return {
                        ...company,
                        name: editedData.name,
                        slogan: editedData.slogan,
                        description: editedData.description,
                        website: editedData.website,
                        linkedin: editedData.linkedin,
                        industry: editedData.industry,
                        location: editedData.location,
                    }
                }else{
                    return company
                }
            })
        })

        setCompanyDetails((prv: AdminCompanyData | null) => {
            return {
                ...prv,
                name: editedData.name,
                slogan: editedData.slogan,
                description: editedData.description,
                website: editedData.website,
                linkedin: editedData.linkedin,
                industry: editedData.industry,
                location: editedData.location
            }
        })
    }

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
                                <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white w-full p-3 rounded-md text-sm font-semibold shadow-xl shadow-blue-100 transition-color duration-300 hover:bg-blue-400 hover:shadow-xl">Edit Company profile</button>
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

            {isEditing && (
                <CompanyEditModal open={isEditing} closeModal={closeEditing} data={companyDetails} onCompanyEdit={onCompanyEdit} />
            )}
        </>
    )
}

const CompanyEditModal = ({data, open, closeModal, onCompanyEdit}: {data: AdminCompanyData | null, open: boolean, closeModal: () => void, onCompanyEdit: (editableData: AdminCompanyData) => void}) => {
    
    const [loading, setLoading] = useState<boolean>(false)

    type CompanyEditFormData = {
        name: string;
        description: string;
        slogan: string;
        website: string;
        linkedin: string;
        industry: string;
        location: string;
    }

    const {formState: {errors}, control, reset, setValue, handleSubmit} = useForm<CompanyEditFormData>({
        defaultValues: {
            name:'',
            description: '',
            slogan: '',
            website: '',
            linkedin: '',
            industry: '',
            location: ''
        }
    })

    const submitOnEdit = async (formData: CompanyEditFormData) => {
        const confirmation = await Swal.fire({
            icon: 'question',
            title: 'Confirm Changes',
            showConfirmButton: true,
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                const container = Swal.getContainer()
                if(container){
                    container.style.zIndex = '99999'
                }
            }
        })

        if(!confirmation.isConfirmed) return

        // console.log(formData)
        setLoading(true)
        try {
            const result = await adminEditCompany(data?._id as string, formData.name, formData.slogan, formData.description, formData.website, formData.industry, formData.linkedin, formData.location)
            if(result.success){
                toast.success('Company information updated')
                onCompanyEdit({_id: data?._id, ...formData})
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const finalMessage = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(finalMessage)
        } finally {
            setLoading(false)
            closeModal()
        }
    }

    useEffect(() => {
        if(data){
            setValue('name', data.name)
            setValue('slogan', data.slogan as string)
            setValue('description', data.description as string)
            setValue('website', data.website as string)
            setValue('linkedin', data.linkedin as string)
            setValue('industry', data.industry as string)
            setValue('location', data.location as string)
        }
    }, [data])

    return(
        <>
            <Modal className="flex items-center justify-center" open={open} onClose={closeModal}>
                <div className="bg-white w-md lg:w-xl rounded-lg shadow-xl p-5 lg:p-10">
                    <div className="flex items-center justify-between border-b pb-4 border-slate-300">
                        <div>
                            <p className="font-bold text-xl text-gray-800 tracking-wide">Edit Company</p>
                            <p className="text-sm mt-1 text-gray-700">Edit and manage company informations</p>
                        </div>
                        <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-md transition-color duration-300"><LuX /></button>
                    </div>
                    <div className="mt-5 max-h-[500px] overflow-y-auto">
                        <form onSubmit={handleSubmit(submitOnEdit)}>
                            <FormControl error={Boolean(errors.name)} fullWidth>
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">company name</label>
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{
                                        required:{value: true, message: 'Company name can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.name?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={Boolean(errors.slogan)} fullWidth className="!mt-3">
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">slogan</label>
                                <Controller
                                    control={control}
                                    name="slogan"
                                    rules={{
                                        required:{value: true, message: 'Slogan can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.slogan?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={Boolean(errors.description)} fullWidth className="!mt-3">
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">description</label>
                                <Controller
                                    control={control}
                                    name="description"
                                    rules={{
                                        required:{value: true, message: 'description can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.description?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={Boolean(errors.website)} fullWidth className="!mt-3">
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">website</label>
                                <Controller
                                    control={control}
                                    name="website"
                                    rules={{
                                        required:{value: true, message: 'website url can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.website?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={Boolean(errors.linkedin)} fullWidth className="!mt-3">
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">linkedin</label>
                                <Controller
                                    control={control}
                                    name="linkedin"
                                    rules={{
                                        required:{value: true, message: 'Linkedin url can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.linkedin?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={Boolean(errors.industry)} fullWidth className="!mt-3">
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">industry</label>
                                <Controller
                                    control={control}
                                    name="industry"
                                    rules={{
                                        required:{value: true, message: 'Industry can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.industry?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={Boolean(errors.location)} fullWidth className="!mt-3">
                                <label className="uppercase !text-xs font-semibold !text-gray-400 tracking-wide" htmlFor="">location</label>
                                <Controller
                                    control={control}
                                    name="location"
                                    rules={{
                                        required:{value: true, message: 'Location can not be empty'}
                                    }}
                                    render={({field}) => (
                                        <input {...field} className="border border-slate-200 rounded-lg bg-gray-50 mt-1 w-full p-3 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-100 focus:border-1 focus:!border-blue-300" />
                                    )}
                                />
                                <FormHelperText>{errors.location?.message}</FormHelperText>
                            </FormControl>
                            <div className="mt-5 flex justify-end gap-3">
                                <button className="border border-slate-300 p-3 rounded-lg bg-white text-gray-500">Cancel</button>
                                <button className="border border-transparent p-3 rounded-lg bg-blue-600 text-white text-sm font-medium transition-all duration-300 shadow-xl shadow-blue-100 hover:bg-blue-400">
                                    {loading
                                        ? "ProcessIng..."
                                        : "Submit Changes"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}