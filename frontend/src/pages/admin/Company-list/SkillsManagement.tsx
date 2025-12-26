import { useEffect, useState } from 'react';
import { BiSearch, BiPlus, BiEdit, BiTrash } from 'react-icons/bi';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';
import { Modal } from '@mui/material';
import { CgClose } from 'react-icons/cg';
import { adminAddSkill, adminDeleteSkills, adminGetSkills, adminUpdateSkill } from '../../../services/adminServices';

interface SkillData {
    _id: string;
    skills: string;
    isVerified: boolean;
    createdAt?: string;
}

export default function AdminSkillManagementPage() {
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [filteredSkills, setFilteredSkills] = useState<SkillData[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [pagination, setPagination] = useState<number[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<SkillData | null>(null);
    
    // Form state
    const [skillName, setSkillName] = useState('');

    const searchMethod = (e: any) => {
        setSearch(e.target.value)
        //Notify.info(e.target.value, {timeout: 1000})
    }

    const dbounceSearch = (fn: Function, delay: number) => {
        let timer: any
        return function(...args: any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    const dSearch = dbounceSearch(searchMethod, 600)


    useEffect(() => {
        fetchSkills();
    }, [search, limit, page]);

    useEffect(() => {
        if (search) {
            const filtered = skills.filter(s => s.skills.toLowerCase().includes(search.toLowerCase()));
            setFilteredSkills(filtered);
        } else {
            setFilteredSkills(skills);
        }
    }, [search, skills]);

    const fetchSkills = async () => {
        try {
            const result = await adminGetSkills(search, limit, page)
            if (result?.success) {
                const data = result?.result?.skills || []; 
                setSkills(data);
                setTotalPage(result?.result?.totalPages || 0)
                setPagination(new Array(result?.result?.totalPages || 0).fill(0))
                setFilteredSkills(data);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

   

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
            Notify.failure('Please enter a skill name');
            return;
        }

        try {
            if (isEditing && currentSkill) {
                await adminUpdateSkill(currentSkill._id, skillName, currentSkill.isVerified);
                Notify.success('Skill updated successfully');
            } else {
                await adminAddSkill(skillName);
                Notify.success('Skill added successfully');
            }
            setModalOpen(false);
            fetchSkills();
        } catch (error: any) {
            Notify.failure(error.response?.data?.message || 'Operation failed');
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
                    Notify.success('Skill deleted successfully');
                    fetchSkills();
                } catch (error: any) {
                    Notify.failure(error.response?.data?.message || 'Delete failed');
                }
            }
        });
    };

    return (
        <div className="w-full p-3 lg:p-10">
            <div className="bg-white p-5 rounded-md">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-medium">Skills Management</h1>
                    <button 
                        onClick={openAddModal}
                        className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
                    >
                        <BiPlus /> Add Skill
                    </button>
                </div>

                <div className="border px-2 border-gray-300 rounded-md flex items-center w-full md:w-1/3 mb-5">
                    <BiSearch color='gray' />
                    <input
                        onKeyUp={(e) => dSearch(e)}
                        type="text"
                        placeholder='Search skills...'
                        className='p-2 text-sm font-light w-full outline-none'
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 font-medium border-t border-b border-gray-300">
                            <tr>
                                <th className="p-3">Skill Name</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSkills.length > 0 ? (
                                filteredSkills.map((skill) => (
                                    <tr key={skill._id} className="border-b border-gray-300 hover:bg-gray-50">
                                        <td className="p-3 font-medium">{skill.skills}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-md text-xs border ${skill.isVerified ? 'bg-green-100 text-green-600 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {skill.isVerified ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-3">
                                            <button onClick={() => openEditModal(skill)} className="text-blue-600 hover:text-blue-800">
                                                <BiEdit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(skill._id)} className="text-red-500 hover:text-red-700">
                                                <BiTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-5 text-gray-500">No skills found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between w-full mt-5">
                    <div>
                        <p className='text-xs text-gray-500'>Showing {page} of {totalPage} Page</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            {
                                page > 1 && <button onClick={() => setPage(prev => prev - 1)} className="px-2 py-1 bg-gray-100 rounded">Prev</button>

                            }
                            {
                                pagination.map((pageNumber, pageIndex) => {
                                    return (
                                        <button onClick={() => setPage(pageIndex + 1)} key={pageIndex} className={pageIndex + 1 === page ? 'px-3 py-1 bg-orange-500 text-white rounded' : 'px-3 py-1 bg-gray-100 rounded'}>{pageIndex + 1}</button>
                                    )
                                })
                            }
                            {
                                page < totalPage && <button onClick={() => setPage(prev => prev + 1)} className="px-2 py-1 bg-gray-100 rounded">Next</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
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
        </div>
    );
}