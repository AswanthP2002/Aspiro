import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';
import { Button, FormControl, FormHelperText, Modal, Switch } from '@mui/material';
import { CgClose, CgTrash } from 'react-icons/cg';
import { adminAddSkill, adminUpdateSkill, adminDeleteSkills, adminGetSkills } from '../../../services/skillService';
import { adminAddWorkMode, adminChangeWorkmodeStatus, adminDeleteWorkMode,adminEditWorkMode, adminGetWorkModes } from '../../../services/workModeServices';
import { adminAddJobLevel, adminChangeJobLevelStatus, adminDeleteJobLevel, adminEditJobLevel, adminGetJobLevels } from '../../../services/jobLevelServices';
// import {  } from '../../../services/adminServices';
import { adminAddJobType, adminChangeJobTypeStatus, adminDeleteJobType, adminGetJobTypes, adminUpdateJobType } from '../../../services/jobTypeServices';
import ReusableTable, { TableColumn } from '../../../components/admin/reusable/Table';
import { BsPencilSquare, BsSearch } from 'react-icons/bs';
import { JobLevelData, JobTypesData, WorkModeData } from '../../../types/entityTypes';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface SkillData {
    _id: string;
    skills: string;
    isVerified: boolean;
    createdAt?: string;
}

export default function AppConfigPage() {
    // const [skills, setSkills] = useState<SkillData[]>([]);
    // const [filteredSkills, setFilteredSkills] = useState<SkillData[]>([]);
    // const [search, setSearch] = useState('');
    // const [page, setPage] = useState(1)
    // const [limit, setLimit] = useState(10)
    // const [pagination, setPagination] = useState<number[]>([])
    // const [totalPage, setTotalPage] = useState(0)
    // const [modalOpen, setModalOpen] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    // const [currentSkill, setCurrentSkill] = useState<SkillData | null>(null);
    const [activeSection, setActiveSection] = useState<'skills' | 'job-level' | 'job-type' | 'work-mode'>('skills')

    // Form state
    // const [skillName, setSkillName] = useState('');

    // const searchMethod = (e: any) => {
    //     setSearch(e.target.value)
    //     //Notify.info(e.target.value, {timeout: 1000})
    // }

    // const dbounceSearch = (fn: Function, delay: number) => {
    //     let timer: any
    //     return function(...args: any){
    //         clearTimeout(timer)
    //         timer = setTimeout(() => {
    //             fn(...args)
    //         }, delay)
    //     }
    // }

    // const dSearch = dbounceSearch(searchMethod, 600)


    // useEffect(() => {
    //     fetchSkills();
    // }, [search, limit, page]);

    // useEffect(() => {
    //     if (search) {
    //         const filtered = skills.filter(s => s.skills.toLowerCase().includes(search.toLowerCase()));
    //         setFilteredSkills(filtered);
    //     } else {
    //         setFilteredSkills(skills);
    //     }
    // }, [search, skills]);

    // const fetchSkills = async () => {
    //     try {
    //         const result = await adminGetSkills(search, limit, page)
    //         if (result?.success) {
    //             const data = result?.result?.skills || []; 
    //             setSkills(data);
    //             setTotalPage(result?.result?.totalPages || 0)
    //             setPagination(new Array(result?.result?.totalPages || 0).fill(0))
    //             setFilteredSkills(data);
    //         }
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // };

    return (
        <div className='p-5 lg:px-20 md:py-10'>
            <p className='font-semibold text-xl'>System configuration</p>
            <p className='text-xs text-gray-500 mt-1'>Manage skill, job level, job type, work mode for your platform</p>
            <div className="mt-5">
                <div className='flex gap-4 bg-white w-fit p-2 rounded-full'>
                    <div onClick={() => setActiveSection('skills')} className={`cursor-pointer group px-2 py-1 rounded-full ${activeSection === 'skills' ? "bg-gray-100" : "bg-white"}`}><p className={`group-hover:font-semibold text-sm ${activeSection === 'skills' ? 'font-semibold' : ''}`}>Skills Library</p></div>
                    <div onClick={() => setActiveSection('work-mode')} className={`cursor-pointer group px-2 py-1 rounded-full ${activeSection === 'work-mode' ? "bg-gray-100" : "bg-white"}`}><p className={`group-hover:font-semibold text-sm ${activeSection === 'work-mode' ? 'font-semibold' : ''}`}>Work Modes</p></div>
                    <div onClick={() => setActiveSection('job-level')} className={`cursor-pointer group px-2 py-1 rounded-full ${activeSection === 'job-level' ? "bg-gray-100" : "bg-white"}`}><p className={`group-hover:font-semibold text-sm ${activeSection === 'job-level' ? 'font-semibold' : ''}`}>Job Levels</p></div>
                    <div onClick={() => setActiveSection('job-type')} className={`cursor-pointer group px-2 py-1 rounded-full ${activeSection === 'job-type' ? "bg-gray-100" : "bg-white"}`}><p className={`group-hover:font-semibold text-sm ${activeSection === 'job-type' ? 'font-semibold' : ''}`}>Job Types</p></div>
                </div>
            </div>
            <section className="mt-10">
                {
                    activeSection === 'skills' && (
                        <SkillsLibrary />
                    )
                }
                {
                    activeSection === 'work-mode' && (
                        <WorkModes />
                    )
                }
                {
                    activeSection === 'job-level' && (
                        <JobLevel />
                    )
                }
                {
                    activeSection === 'job-type' && (
                        <JobTypes />
                    )
                }
            </section>
        </div>
    );
}

const SkillsLibrary = () => {
    type FetchSkillsResponsePayload = {
        success: boolean
        message: string
        result: {
            skills: SkillData[]
            totalPages: number
        }
    }
    const [skillName, setSkillName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<SkillData | null>(null);

    const searchMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(/^[a-zA-Z0-9 ]*$/.test(e.target.value)){
            setSearch(e.target.value)
        }
        //Notify.info(e.target.value, {timeout: 1000})
    }

    const dbounceSearch = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
        let timer: ReturnType<typeof setTimeout>
        return function(...args: Parameters<T>){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    const dSearch = dbounceSearch(searchMethod, 600)

    const openAddModal = () => {
        setIsEditing(false);
        setSkillName('');
        setModalOpen(true);
    };

    const openEditModal = (skill: SkillData) => {
        setIsEditing(true);
        setCurrentSkill(skill);
        setSkillName(skill.skills);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentSkill(null);
    };

    const handleSubmit = async () => {
        if (!skillName.trim()) {
            toast.error('Please enter a skill name');
            return;
        }

        try {
            if (isEditing && currentSkill) {
                await adminUpdateSkill(currentSkill._id, skillName, currentSkill.isVerified);
                toast.success('Skill updated successfully');
            } else {
                const result = await toast.promise(
                    adminAddSkill(skillName),
                    {
                        pending: 'Adding skill...',
                        success: 'Skill added',
                        error:{
                            render(props){
                                const error = props.data as AxiosError<{message: string}>
                                return error.response?.data.message || error.message || 'something went wrong'
                            }
                        }
                    }
                )

                if(result?.success){
                    setSkills((prv: SkillData[]) => [result?.result, ...prv])
                }
            }
            setModalOpen(false);
        } catch (error: unknown) {
            console.log(error)
        }
    };

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await adminDeleteSkills(id);
                    toast.success('Skill deleted successfully');
                    setSkills((skills: SkillData[]) => skills.filter((skill: SkillData) => skill._id !== id))
                } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                }
            }
        });
    };

    const skillTableColumns: TableColumn<SkillData>[] = [
        {
            header: "SKILL",
            key: "skills"
        },
        {
            header: "STATUS",
            key: 'isVerified',
            render: (row: SkillData) => (
                row.isVerified
                    ? <span className='uppercase bg-green-200 text-green-600 px-2 text-xs font-medium rounded-md'>verified</span>
                    : <span className='uppercase bg-red-200 text-red-600 px-2 text-xs font-medium rounded-md'>Not Verified</span>
            )
        },
        {
            header: 'ACTIONS',
            key: "actions",
            render: (row: SkillData) => (
                <div className='space-x-2'>
                    <button onClick={() => openEditModal(row)}><BsPencilSquare /></button>
                    <button onClick={() => handleDelete(row._id as string)}><CgTrash /></button>
                </div>
            )
        }
    ]

    const [skills, setSkills] = useState<SkillData[]>([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8)
    const [search, setSearch] = useState('')
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        async function fetchSkills(){
            try {
                const result: FetchSkillsResponsePayload = await adminGetSkills(search, limit, page)
                if(result.success){
                    setSkills(result.result.skills)
                    // Notify.info(result.result.totalPages.toString())
                    setTotalPages(result.result.totalPages)
                }
            } catch (error: unknown) {
                console.log('--Error occured while fetching skills--', error)
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        fetchSkills()
    }, [search, limit, page])

    return(
        <div>
            <div className="flex gap-2 items-center my-3">
                            
                            <div className='flex-1 flex items-center border border-gray-300 px-2 rounded-md'>
                                <BsSearch />
                                <input
                        onKeyUp={(e) => dSearch(e)}
                        type="text"
                        placeholder='Search skills...'
                        className='p-2 text-sm font-light w-full outline-none'
                    />
                            </div>
                            <button onClick={openAddModal} className='bg-blue-500 text-white flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md'>Add Skill<BiPlus /></button>
                        </div>
            {skills.length > 0
                ? <>
                    <div>
                        
                    <ReusableTable 
                        columns={skillTableColumns}
                        data={skills}
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={(page) => setPage(page)}
                    />
                    </div>

                    <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                className="flex items-center justify-center"
            >
                <div className="bg-white rounded-md p-5 w-96 outline-none">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-medium">{isEditing ? 'Edit Skill' : 'Add New Skill'}</h2>
                        <button onClick={handleCloseModal}><CgClose /></button>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-gray-500">Skill Name</label>
                            <input 
                                type="text" 
                                value={skillName}
                                onChange={(e) => setSkillName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm outline-none focus:border-black"
                                placeholder="e.g. React.js"
                            />
                        </div>
                        
                        <button 
                            onClick={handleSubmit}
                            className="bg-black text-white py-2 rounded-md text-sm mt-2 hover:bg-gray-800 transition-colors"
                        >
                            {isEditing ? 'Update Skill' : 'Add Skill'}
                        </button>
                    </div>
                </div>
                    </Modal>
                  </>
                : <>
                    <p className='text-xs text-gray-500 text-center'>No Skill found</p>
                  </>
            }
        </div>
    )
}

const WorkModes = () => {

    type AddWorkModeResultPayload = {
        success: boolean;
        message: string;
        result: WorkModeData
    }

    type EditWorkModeResultPayload = {
        success: boolean;
        message: string;
        result: WorkModeData
    }

    type FetchWorkModesResponsePayload = {
        success: boolean;
        message: string;
        result: {
            workModes: WorkModeData[]
            totalPages: number
        }
    }

    const workModeTableColumn: TableColumn<WorkModeData>[] = [
        {
            header: "NAME",
            key: 'name'
        }, 
        {
            header: 'SLUG',
            key: 'slug',
            render: (row: WorkModeData) => (
                <span className='bg-gray-200 px-2 text-xs rounded-md text-gray-500'>{row.slug}</span>
            )
        },
        {
            header: 'USAGE COUNT',
            key: 'usageCount',
            render: (row: WorkModeData) => (
                <span>0</span>
            )
        },
        {
            header: 'STATUS',
            key: 'isActive',
            render: (row: WorkModeData) => (
                <div className='flex items-center gap-2'>
                    <Switch onChange={(e) => toggleStatus(e, row._id as string)} checked={row.isActive} />
                    {row.isActive
                        ? <p className='text-xs font-medium text-green-500'>Active</p>
                        : <p className='text-xs font-medium text-gray-500'>Inactive</p>
                    }
                </div>
            )
        },
        {
            header: 'ACTIONS',
            key:'actions',
            render: (row: WorkModeData) => (
                <div className="space-x-3">
                    <button onClick={() => openEditModal(row)}><BsPencilSquare /></button>
                    <button onClick={() => deleteWorkMode(row._id as string)}><CgTrash /></button>
                </div>
            )
        }
    ]

    const [workModes, setWorkModes] = useState<WorkModeData[]>([])
    const [currentWorkMode, setCurrentWorkMode] = useState<WorkModeData | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(1)
    const [isAddWorkModeModalOpen, setIsAddWorkModeModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState(true)

    // const openModal = () => setIsAddWorkModeModalOpen(true)
    const closeModal = () => setIsAddWorkModeModalOpen(false)

    const toggleStatus = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = e.target.checked
        setWorkModes((prv: WorkModeData[]) => {
            return prv.map((workMode: WorkModeData) => {
                if(workMode._id === id) {
                    // Notify.info(`status updated current status = ${workMode.isActive}`)
                    return {...workMode, isActive: !workMode.isActive}
                }else{
                    return workMode
                }
            })
        })

        if(isChecked){
            makeWorkModeActive(id)
        }else{
            makeWorkModeInactive(id)
        }
        
    }

    type AddWorkModeInputs = {
        name: string
        isActive?: boolean
    }

    const makeWorkModeActive = (id: string) => {
        if(!id) return
        Swal.fire({
            icon: 'question',
            title: 'Active this workmode?',
            text: 'This work mode will be available for users',
            showConfirmButton: true,
            confirmButtonText: 'Active',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminChangeWorkmodeStatus(id, 'active')
                    if(result?.success){
                        toast.success('Workmode is now active')
                    }
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                setWorkModes((prv: WorkModeData[]) => {
                            return prv.map((workMode: WorkModeData) => {
                                if(workMode._id === id){
                                    return {...workMode, isActive: false}
                                }else{
                                    return workMode
                                }
                            })
                        })
            }
        })
    }

    const makeWorkModeInactive = (id: string) => {
        if(!id) return
        Swal.fire({
            icon: 'question',
            title: 'Inactive this workmode?',
            text: 'This work mode will not be available for users',
            showConfirmButton: true,
            confirmButtonText: 'Inactive',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminChangeWorkmodeStatus(id, 'inactive')
                    if(result?.success){
                        toast.success('Workmode is now inactive')
                    }
                } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                setWorkModes((prv: WorkModeData[]) => {
                            return prv.map((workMode: WorkModeData) => {
                                if(workMode._id === id){
                                    return {...workMode, isActive: true}
                                }else{
                                    return workMode
                                }
                            })
                        })
            }
        })
    }

    const deleteWorkMode = async (id: string) => {
        if(!id) return

        Swal.fire({
            icon: 'question',
            title: 'Delete',
            text: 'Are you sure to delete this work mode?. Users cant access this mode anymore',
            showConfirmButton: true,
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminDeleteWorkMode(id)
                    if(result.success){
                        toast.success('Work mode deleted')
                        setWorkModes((worModes: WorkModeData[]) => {
                            return worModes.filter((workMode: WorkModeData) => workMode._id !== id)
                        })
                    }
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                return
            }
        })
    }


    const {reset, control, formState: {errors}, setValue, handleSubmit} = useForm<AddWorkModeInputs>({defaultValues: {name: '', isActive: false}})
    const [isEditing, setIsEditing] = useState(false)

    const openEditModal = (data: WorkModeData) => {
        setIsEditing(true)
        setValue("name", data.name)
        setCurrentWorkMode(data)
        setIsAddWorkModeModalOpen(true)
    }

    const openAddModal = () => {
        setIsEditing(false)
        setIsAddWorkModeModalOpen(true)
        setCurrentWorkMode(null)
    }


    const onSubmit = async (data: AddWorkModeInputs) => {
        console.log(data)
        try {
            if(isEditing && currentWorkMode){
                const result: EditWorkModeResultPayload = await adminEditWorkMode(currentWorkMode._id as string, data.name)
                if(result.success){
                    toast.success(result.message)
                    setWorkModes((workModes: WorkModeData[]) => {
                        return workModes.map((workMode: WorkModeData) => {
                            if(workMode._id === currentWorkMode._id){
                                return {...workMode, name: result.result.name}
                            }else{
                                return workMode
                            }
                        })
                    })
                }
            }else {
                const result: AddWorkModeResultPayload = await toast.promise(
                    adminAddWorkMode(data.name, isActive),
                    {
                        pending: 'Adding work mode...',
                        success: 'Work mode added',
                        error:{
                            render(props) {
                                const error = props.data as AxiosError<{message: string}>
                                return error.response?.data?.message || error.message || 'Something went wrong'
                            },
                        }
                    }
                )
                if(result.success){
                    setWorkModes((workmodes: WorkModeData[]) => [...workmodes, result.result])
                }
            }
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : 'Something went wrong')
            // toast.error(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setLoading(false)
            reset({name: ''})
            
            closeModal()
        }
    }

    useEffect(() => {
        async function fetchWorkModes() {
            try {
                const result: FetchWorkModesResponsePayload = await adminGetWorkModes(search, page, limit)
                if(result.success){
                    console.log('data from backend w-mode', result)
                    setWorkModes(result.result.workModes)
                    setTotalPages(result.result.totalPages)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            }
        }
        fetchWorkModes()
    }, [search, page, limit])
    return(
        <>
            <div>
            <div className="flex justify-end my-3">
                <button onClick={openAddModal} className='bg-blue-500 text-white flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md'>Add Work mode<BiPlus /></button>
            </div>
            <ReusableTable 
                columns={workModeTableColumn}
                data={workModes}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
        </div>

        {
            isAddWorkModeModalOpen && (
                <Modal className='flex items-center justify-center' open={isAddWorkModeModalOpen} onClose={closeModal}>
                    <div className='bg-white p-5 w-md rounded-md'>
                        <div className="header flex justify-between">
                            <div>
                                <p className='text-sm font-medium'>{isEditing ? "Edit Work mode": "Add new work mode"}</p>
                                <p className="text-xs text-gray-500">{isEditing ? "Update name of the work mode": "Enter the details of new item"}</p>
                            </div>
                            <button onClick={closeModal}><CgClose /></button>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl fullWidth error={Boolean(errors.name)}>
                                    <Controller 
                                        control={control}
                                        name='name'
                                        rules={{required: {value: true, message: 'Please enter name'}}}
                                        render={({field}) => (
                                            <div>
                                                <label htmlFor="" className='!text-xs'>Name</label>
                                                <input type="text" {...field} className='border border-gray-300 w-full rounded-md p-3 !text-xs' placeholder='e,g; Remote' />
                                            </div>
                                        )}
                                    />
                                    <FormHelperText>{errors.name?.message}</FormHelperText>
                                </FormControl>
                                {!isEditing && (
                                    <div>
                                        <span></span>
                                    </div>
                                )}
                                {!isEditing && (
                                    <>
                                        <div className="my-3 flex justify-between items-center">
                                            <div>
                                                <p className='font-medium text-sm'>Active</p>
                                                <p className="text-xs text-gray-500">When this is inactive users can't choose it</p>
                                            </div>
                                            <div>
                                                <Switch onChange={() => setIsActive(prv => !prv)} checked={isActive} defaultChecked={isActive} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-end gap-2 mt-5">
                                    <button onClick={closeModal} type="button" className='border border-gray-200 rounded-md px-2 py-1 text-sm font-medium'>Cancel</button>
                                    <Button type='submit' variant='contained' loading={loading}>{isEditing ? "Update" : "Add"}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )
        }
        </>
    )
}

const JobLevel = () => {

    const [jobLevelData, setJobLevelData] = useState<JobLevelData[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState('')
   
    const JobLevelTableColumn: TableColumn<JobLevelData>[] = [
        {
            header: "NAME",
            key: 'name'
        }, 
        {
            header: 'SLUG',
            key: 'slug',
            render: (row: JobLevelData) => (
                <span className='bg-gray-200 px-2 text-xs rounded-md text-gray-500'>{row.slug}</span>
            )
        },
        {
            header: 'USAGE COUNT',
            key: 'usageCount',
            render: (row: JobLevelData) => (
                <span>0</span>
            )
        },
        {
            header: 'STATUS',
            key: 'isActive',
            render: (row: JobLevelData) => (
                <div className='flex items-center gap-2'>
                    <Switch onChange={(e) => toggleStatus(e, row._id as string)} checked={row.isActive} />
                    {row.isActive
                        ? <p className='text-xs font-medium text-green-500'>Active</p>
                        : <p className='text-xs font-medium text-gray-500'>Inactive</p>
                    }
                </div>
            )
        },
        {
            header: 'ACTIONS',
            key:'actions',
            render: (row: JobLevelData) => (
                <div className="space-x-3">
                    <button onClick={() => openEditModal(row)}><BsPencilSquare /></button>
                    <button onClick={() => deletJobLevel(row._id as string)}><CgTrash /></button>
                </div>
            )
        }
    ]

    type AddJobLevelResultPayload = {
        success: boolean;
        message: string;
        result: JobLevelData
    }

    type EditJobLevelResultPayload = {
        success: boolean;
        message: string;
        result: JobLevelData
    }

    type FetchJobLevelResultPayload = {
        success: boolean;
        message: string;
        result: {
            jobLevels: JobLevelData[]
            totalPages: number
        }
    }

    const [isJobLevelModalOpen, setIsJobLeveModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const [currentJobLevel, setCurrentJobLevel] = useState<JobLevelData | null>(null)

    // const openModal = () => setIsJobLeveModalOpen(true)
    const closeModal = () => setIsJobLeveModalOpen(false)

    const toggleStatus = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = e.target.checked
        setJobLevelData((prv: JobLevelData[]) => {
            return prv.map((jobLevel: JobLevelData) => {
                if(jobLevel._id === id) {
                    Notify.info(`status updated current status = ${jobLevel.isActive}`)
                    return {...jobLevel, isActive: !jobLevel.isActive}
                }else{
                    return jobLevel
                }
            })
        })

        if(isChecked){
            makeJobLevelActive(id)
        }else{
            makeJobLevelInactive(id)
        }
        
    }

    type AddJobLevelInputs = {
        name: string
        isActive?: boolean
    }

    const makeJobLevelActive = (id: string) => {
        if(!id) return
        Swal.fire({
            icon: 'question',
            title: 'Active this job level?',
            text: 'This will be available for users',
            showConfirmButton: true,
            confirmButtonText: 'Active',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminChangeJobLevelStatus(id, true)
                    if(result?.success){
                        Notify.success(result.message)
                    }
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                setJobLevelData((prv: JobLevelData[]) => {
                            return prv.map((jobLevel: JobLevelData) => {
                                if(jobLevel._id === id){
                                    return {...jobLevel, isActive: false}
                                }else{
                                    return jobLevel
                                }
                            })
                        })
            }
        })
    }

    const makeJobLevelInactive = (id: string) => {
        if(!id) return
        Swal.fire({
            icon: 'question',
            title: 'Inactive this jobe level?',
            text: 'This will not be available for users',
            showConfirmButton: true,
            confirmButtonText: 'Inactive',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminChangeJobLevelStatus(id, false)
                    if(result?.success){
                        Notify.success(result.message)
                    }
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                setJobLevelData((prv: JobLevelData[]) => {
                            return prv.map((jobLevel: JobLevelData) => {
                                if(jobLevel._id === id){
                                    return {...jobLevel, isActive: true}
                                }else{
                                    return jobLevel
                                }
                            })
                        })
            }
        })
    }

    const deletJobLevel = async (id: string) => {
        if(!id) return

        Swal.fire({
            icon: 'question',
            title: 'Delete',
            text: 'Are you sure to delete this Job level?. Users cant access this mode anymore',
            showConfirmButton: true,
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminDeleteJobLevel(id)
                    if(result.success){
                        Notify.success(result.message)
                        setJobLevelData((jobLevels: JobLevelData[]) => {
                            return jobLevels.filter((jobLevel: JobLevelData) => jobLevel._id !== id)
                        })
                    }
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                return
            }
        })
    }


    const {reset, control, formState: {errors}, setValue, handleSubmit} = useForm<AddJobLevelInputs>({defaultValues: {name: '', isActive: false}})
    const [isEditing, setIsEditing] = useState(false)

    const openEditModal = (data: JobLevelData) => {
        setIsEditing(true)
        setValue("name", data.name)
        setCurrentJobLevel(data)
        setIsJobLeveModalOpen(true)
    }

    const openAddModal = () => {
        setIsEditing(false)
        setIsJobLeveModalOpen(true)
        setCurrentJobLevel(null)
    }


    const onSubmit = async (data: AddJobLevelInputs) => {
        console.log(data)
        try {
            if(isEditing && currentJobLevel){
                const result: EditJobLevelResultPayload = await adminEditJobLevel(currentJobLevel._id as string, data.name)
                if(result.success){
                    Notify.success(result.message)
                    setJobLevelData((jobLevels: JobLevelData[]) => {
                        return jobLevels.map((jobLevel: JobLevelData) => {
                            if(jobLevel._id === currentJobLevel._id){
                                return {...jobLevel, name: result.result.name, slug: result.result.slug}
                            }else{
                                return jobLevel
                            }
                        })
                    })
                }
            }else {
                const result: AddJobLevelResultPayload = await toast.promise(
                    adminAddJobLevel(data.name, isActive),
                    {
                        pending: 'Adding job level...',
                        success: 'Job level added',
                        error:{
                            render(props) {
                                const error = props.data as AxiosError<{message: string}>
                                return error.response?.data.message || error.message || 'Something went wrong'
                            },
                        }
                    }
                )
                if(result.success){
                    setJobLevelData((jobLevels: JobLevelData[]) => [...jobLevels, result.result])
                }
            }
        } catch (error: unknown) {
            console.log(error)
        } finally {
            setLoading(false)
            reset({name: ''})
            
            closeModal()
        }
    }

    useEffect(() => {
        async function fetchJobLevels() {
            try {
                const result: FetchJobLevelResultPayload = await adminGetJobLevels(search, page, limit)
                if(result.success){
                    console.log('data from backend j-level', result)
                    setJobLevelData(result.result.jobLevels)
                    setTotalPages(result.result.totalPages)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        fetchJobLevels()
    }, [search, page, limit])


   return(
    <div>
        <div className="flex justify-end">
            <button onClick={openAddModal} className='text-xs flex items-center gap-2 bg-blue-500 text-white px-2 py-2 rounded-md'>Add Job Level <FaPlus /></button>
        </div>
        
        {jobLevelData && jobLevelData.length > 0
            ? <>
                <ReusableTable 
                    columns={JobLevelTableColumn}
                    data={jobLevelData}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={(page) => setPage(page)}
                />
                
              </>
            : <>
                <p className='text-xs text-gray-500 text-center mt-5'>No Job Levels found</p>
              </>
        }
        {
            isJobLevelModalOpen && (
                <Modal className='flex items-center justify-center' open={isJobLevelModalOpen} onClose={closeModal}>
                    <div className='bg-white p-5 w-md rounded-md'>
                        <div className="header flex justify-between">
                            <div>
                                <p className='text-sm font-medium'>{isEditing ? "Edit Job Level": "Add new Job Level"}</p>
                                <p className="text-xs text-gray-500">{isEditing ? "Update name of job level": "Enter details of job level"}</p>
                            </div>
                            <button onClick={closeModal}><CgClose /></button>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl fullWidth error={Boolean(errors.name)}>
                                    <Controller 
                                        control={control}
                                        name='name'
                                        rules={{required: {value: true, message: 'Please enter name'}}}
                                        render={({field}) => (
                                            <div>
                                                <label htmlFor="" className='!text-xs'>Name</label>
                                                <input type="text" {...field} className='border border-gray-300 w-full rounded-md p-3 !text-xs' placeholder='e,g; Entry-level' />
                                            </div>
                                        )}
                                    />
                                    <FormHelperText>{errors.name?.message}</FormHelperText>
                                </FormControl>
                                {!isEditing && (
                                    <div>
                                        <span></span>
                                    </div>
                                )}
                                {!isEditing && (
                                    <>
                                        <div className="my-3 flex justify-between items-center">
                                            <div>
                                                <p className='font-medium text-sm'>Active</p>
                                                <p className="text-xs text-gray-500">When this is inactive users can't choose it</p>
                                            </div>
                                            <div>
                                                <Switch onChange={() => setIsActive(prv => !prv)} checked={isActive} defaultChecked={isActive} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-end gap-2 mt-5">
                                    <button onClick={closeModal} type="button" className='border border-gray-200 rounded-md px-2 py-1 text-sm font-medium'>Cancel</button>
                                    <Button type='submit' variant='contained' loading={loading}>{isEditing ? "Update" : "Add"}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )
        }
    </div>
   ) 
}

const JobTypes = () => {
    const [jobTypesData, setJobTypesData] = useState<JobTypesData[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState('')
   
    const jobTypesTableColumn: TableColumn<JobTypesData>[] = [
        {
            header: "NAME",
            key: 'name'
        }, 
        {
            header: 'SLUG',
            key: 'slug',
            render: (row: JobTypesData) => (
                <span className='bg-gray-200 px-2 text-xs rounded-md text-gray-500'>{row.slug}</span>
            )
        },
        {
            header: 'USAGE COUNT',
            key: 'usageCount',
            render: (row: JobTypesData) => (
                <span>0</span>
            )
        },
        {
            header: 'STATUS',
            key: 'isActive',
            render: (row: JobTypesData) => (
                <div className='flex items-center gap-2'>
                    <Switch onChange={(e) => toggleStatus(e, row._id as string)} checked={row.isActive} />
                    {row.isActive
                        ? <p className='text-xs font-medium text-green-500'>Active</p>
                        : <p className='text-xs font-medium text-gray-500'>Inactive</p>
                    }
                </div>
            )
        },
        {
            header: 'ACTIONS',
            key:'actions',
            render: (row: JobTypesData) => (
                <div className="space-x-3">
                    <button onClick={() => openEditModal(row)}><BsPencilSquare /></button>
                    <button onClick={() => deletejobType(row._id as string)}><CgTrash /></button>
                </div>
            )
        }
    ]

    type AddJobTypeResultPayload = {
        success: boolean;
        message: string;
        result: JobTypesData
    }

    type EditJobTypeResultPayload = {
        success: boolean;
        message: string;
        result: JobTypesData
    }

    type FetchJobTypesResultPayload = {
        success: boolean;
        message: string;
        result: {
            jobTypes: JobTypesData[]
            totalPages: number
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const [currentJobType, setCurrentJobType] = useState<JobTypesData | null>(null)

    // const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const toggleStatus = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = e.target.checked
        setJobTypesData((prv: JobTypesData[]) => {
            return prv.map((jobType: JobTypesData) => {
                if(jobType._id === id) {
                    Notify.info(`status updated current status = ${jobType.isActive}`)
                    return {...jobType, isActive: !jobType.isActive}
                }else{
                    return jobType
                }
            })
        })

        if(isChecked){
            makeJobTypeActive(id)
        }else{
            makeJobTypeInActive(id)
        }
        
    }

    type AddJobTypeInputs = {
        name: string
        isActive?: boolean
    }

    const makeJobTypeActive = (id: string) => {
        if(!id) return
        Swal.fire({
            icon: 'question',
            title: 'Active this job type?',
            text: 'This will be available for users',
            showConfirmButton: true,
            confirmButtonText: 'Active',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminChangeJobTypeStatus(id, true)
                    if(result?.success){
                        Notify.success(result.message)
                    }
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                setJobTypesData((prv: JobTypesData[]) => {
                            return prv.map((jobType: JobTypesData) => {
                                if(jobType._id === id){
                                    return {...jobType, isActive: false}
                                }else{
                                    return jobType
                                }
                            })
                        })
            }
        })
    }

    const makeJobTypeInActive = (id: string) => {
        if(!id) return
        Swal.fire({
            icon: 'question',
            title: 'Inactive this jobe type?',
            text: 'This will not be available for users',
            showConfirmButton: true,
            confirmButtonText: 'Inactive',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminChangeJobTypeStatus(id, false)
                    if(result?.success){
                        Notify.success(result.message)
                    }
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                setJobTypesData((prv: JobTypesData[]) => {
                            return prv.map((jobType: JobTypesData) => {
                                if(jobType._id === id){
                                    return {...jobType, isActive: true}
                                }else{
                                    return jobType
                                }
                            })
                        })
            }
        })
    }

    const deletejobType = async (id: string) => {
        if(!id) return

        Swal.fire({
            icon: 'question',
            title: 'Delete',
            text: 'Are you sure to delete this Job type?. Users cant access this mode anymore',
            showConfirmButton: true,
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await adminDeleteJobType(id)
                    if(result.success){
                        Notify.success(result.message)
                        setJobTypesData((jobType: JobTypesData[]) => {
                            return jobType.filter((jobType: JobTypesData) => jobType._id !== id)
                        })
                    }
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                return
            }
        })
    }


    const {reset, control, formState: {errors}, setValue, handleSubmit} = useForm<AddJobTypeInputs>({defaultValues: {name: '', isActive: false}})
    const [isEditing, setIsEditing] = useState(false)

    const openEditModal = (data: JobTypesData) => {
        setIsEditing(true)
        setValue("name", data.name as string)
        setCurrentJobType(data)
        setIsModalOpen(true)
    }

    const openAddModal = () => {
        setIsEditing(false)
        setIsModalOpen(true)
        setCurrentJobType(null)
    }


    const onSubmit = async (data: AddJobTypeInputs) => {
        console.log(data)
        try {
            if(isEditing && currentJobType){
                const result: EditJobTypeResultPayload = await adminUpdateJobType(currentJobType._id as string, data.name)
                if(result.success){
                    Notify.success(result.message)
                    setJobTypesData((jobTypes: JobTypesData[]) => {
                        return jobTypes.map((jobType: JobTypesData) => {
                            if(jobType._id === currentJobType._id){
                                return {...jobTypes, name: result.result.name}
                            }else{
                                return jobType
                            }
                        })
                    })
                }
            }else {
                const result: AddJobTypeResultPayload = await toast.promise(
                    adminAddJobType(data.name, isActive),
                    {
                        pending: 'Adding job type...',
                        success: 'Job type added',
                        error:{
                            render(props) {
                                const error = props.data as AxiosError<{message: string}>
                                return error.response?.data.message || error.message || 'Something went wrong'
                            },
                        }
                    }
                )
                if(result.success){
                    setJobTypesData((jobTypes: JobTypesData[]) => [...jobTypes, result.result])
                }
            }
        } catch (error: unknown) {
            console.log(error)
        } finally {
            setLoading(false)
            reset({name: ''})
            
            closeModal()
        }
    }

    useEffect(() => {
        async function fetchJobTypes() {
            try {
                const result: FetchJobTypesResultPayload = await adminGetJobTypes(search, page, limit)
                if(result.success){
                    console.log('data from backend j-type', result)
                    setJobTypesData(result.result.jobTypes)
                    setTotalPages(result.result.totalPages)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            }
        }
        fetchJobTypes()

    }, [search, page, limit])


   return(
    <div>
        <div className="flex justify-end mb-3">
            <button onClick={openAddModal} className='text-xs flex items-center gap-2 bg-blue-500 text-white px-2 py-2 rounded-md'>Add Job Type <FaPlus /></button>
        </div>
        
        {jobTypesData && jobTypesData.length > 0
            ? <>
                <ReusableTable 
                    columns={jobTypesTableColumn}
                    data={jobTypesData}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={(page) => setPage(page)}
                />
                
              </>
            : <>
                <p className='text-xs text-gray-500 text-center mt-5'>No Job Types found</p>
              </>
        }
        {
            isModalOpen && (
                <Modal className='flex items-center justify-center' open={isModalOpen} onClose={closeModal}>
                    <div className='bg-white p-5 w-md rounded-md'>
                        <div className="header flex justify-between">
                            <div>
                                <p className='text-sm font-medium'>{isEditing ? "Edit Job Type": "Add new Job Type"}</p>
                                <p className="text-xs text-gray-500">{isEditing ? "Update name of job type": "Enter details of job type"}</p>
                            </div>
                            <button onClick={closeModal}><CgClose /></button>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl fullWidth error={Boolean(errors.name)}>
                                    <Controller 
                                        control={control}
                                        name='name'
                                        rules={{required: {value: true, message: 'Please enter name'}}}
                                        render={({field}) => (
                                            <div>
                                                <label htmlFor="" className='!text-xs'>Name</label>
                                                <input type="text" {...field} className='border border-gray-300 w-full rounded-md p-3 !text-xs' placeholder='e,g; Full-time' />
                                            </div>
                                        )}
                                    />
                                    <FormHelperText>{errors.name?.message}</FormHelperText>
                                </FormControl>
                                {!isEditing && (
                                    <div>
                                        <span></span>
                                    </div>
                                )}
                                {!isEditing && (
                                    <>
                                        <div className="my-3 flex justify-between items-center">
                                            <div>
                                                <p className='font-medium text-sm'>Active</p>
                                                <p className="text-xs text-gray-500">When this is inactive users can't choose it</p>
                                            </div>
                                            <div>
                                                <Switch onChange={() => setIsActive(prv => !prv)} checked={isActive} defaultChecked={isActive} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-end gap-2 mt-5">
                                    <button onClick={closeModal} type="button" className='border border-gray-200 rounded-md px-2 py-1 text-sm font-medium'>Cancel</button>
                                    <Button type='submit' variant='contained' loading={loading}>{isEditing ? "Update" : "Add"}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )
        }
    </div>
)}

