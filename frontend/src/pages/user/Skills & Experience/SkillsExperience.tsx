import { useCallback, useEffect, useState } from "react";
import AddExperienceForm from "../../../components/candidate/Forms/ExperienceAdd";
import {IoLocation}  from 'react-icons/io5'
import Swal from "sweetalert2";
import EditExperienceForm from "../../../components/candidate/Forms/ExperienceEdit";
import AddSkillsForm from "../../../components/candidate/Forms/SkillsAdd";
import AddEducationForm from "../../../components/candidate/Forms/EducationAdd";
import EditEducationForm from "../../../components/candidate/Forms/EducationEdit";
import { getUserExperiences, deleteUserExperience } from "../../../services/experienceServices";
import { getUserEducations, deleteUserEducation } from "../../../services/educationServices";
import { getUserSkills, deleteUserSkill } from "../../../services/skillService";
// import { deleteUserSkill } from "../../../services/userServices";
import { Education, Experience, Skills } from "../../../types/entityTypes";
import { Notify } from "notiflix";
import { FaGraduationCap, FaPlus, FaSuitcase, FaTrash } from "react-icons/fa";
import { FaCircleXmark, FaPencil } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import formatDate from "../../../services/util/formatDate";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Skeleton } from "@mui/material";


export default function ExperiencePage(){

    const [experiences, setexperiences] = useState<Experience[]>([])
    const [education, seteducation] = useState<Education[]>([])
    const [skills, setskills] = useState<Skills[]>([])

    const [loading, setLoading] = useState<boolean>(false)
 
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
    const [selectedEducation, setSelecteEducation] = useState<Education | null>(null)
 
    const [modals, setModals] = useState({
        experienceAdd: false,
        experienceEdit: false,
        skillsAdd: false,
        educationAdd: false,
        educationEdit: false,
    });
 
    const toggleModal = (modal: keyof typeof modals, isOpen: boolean) => {
        setModals(prev => ({ ...prev, [modal]: isOpen }));
    };

    const onAddSkill = useCallback((skill: Skills) => {
        setskills((prv : Skills[]) => {
            return [...prv, skill]
        })
    }, []);

    const onRemoveSkill = useCallback((skill : string) => {
        setskills((prv : Skills[]) => {
            return prv.filter((s : Skills) => s.skill.toLowerCase() !== skill.toLowerCase())
        })
    }, []);

    const onEditEducation = useCallback((id : string, updatedEducation : Education) => {
        seteducation(prv => 
            prv.map(edu => edu._id === id ? { ...edu, ...updatedEducation } : edu)
        );
    }, []);

    const onDeleteEducation = useCallback((eduId? : string) => {
        seteducation((prv : Education[]) => {
            return prv.filter((edu : Education) => edu._id !== eduId)
        })
    }, []);

    const onDeleteExperience = useCallback((expId : string) => {
        setexperiences((prv : Experience[]) => {
            return prv.filter((exp : Experience) => exp._id !== expId)
        })
    }, []);

    function selecteEditableExperience(expIndex : number){
        setSelectedExperience(experiences[expIndex])
        toggleModal('experienceEdit', true);
    }

    function selecteEditableEducation(eduIndex : number) {
        setSelecteEducation(education[eduIndex])
        toggleModal('educationEdit', true);
    }

    const deleteExperience = useCallback(async (expId?: string) => {
        if (!expId) return;
        const result = await Swal.fire({
            icon: 'question',
            title: 'Confirm Delete?',
            text: 'Are you sure to delete this experience',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete'
        });

        if (result.isConfirmed) {
            try {
                const result = await toast.promise(
                    deleteUserExperience(expId),
                    {
                        pending: 'Deleting experience...',
                        success: 'Experience Deleted',
                        error:{
                            render(props) {
                                const data = props.data as AxiosError<{message: string}>
                                return data.message
                            },
                        }
                    }
                )
                onDeleteExperience(expId);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }
    }, [onDeleteExperience]);

    const deleteSkill = useCallback(async (skillId: string, skill: string) => {
        Swal.fire({
            icon: 'question',
            title: 'Delete skill?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    await toast.promise(
                        deleteUserSkill(skillId),
                        {
                            pending: 'Deleting...',
                            success: 'Skill deleted',
                            error:{
                                render(props) {
                                    const data = props.data as AxiosError<{message: string}>
                                    return data.message
                                },
                            }
                        }
                    )
                    onRemoveSkill(skill)
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')   
                }
            }
        })
    }, [onRemoveSkill]);

    const deleteEducation = useCallback(async (educationId?: string) => {
        if (!educationId) return;
            Swal.fire({
                icon:'question',
                title:'Confirm Delete',
                text:'Are you sure to delete this education?',
                showCancelButton:true,
                showConfirmButton:true,
                confirmButtonText:'Delete'
            }).then(async (result) => {
                if(result.isConfirmed){
                    try {
                        await toast.promise(
                            deleteUserEducation(educationId),
                            {
                                pending: 'Deleting education...',
                                success: 'Education deleted',
                                error:{
                                    render(props) {
                                        const data = props.data as AxiosError<{message: string}>
                                        return data.message
                                    },
                                }
                            }
                        )
                        onDeleteEducation(educationId);
                    } catch (error) {
                        toast.error(error instanceof Error ? error.message : 'Something went wrong')
                    }
                }
            });
    }, [onDeleteEducation]);

    const onAddExperience = useCallback((experience: Experience) => {
        setexperiences(prv => [...prv, {...experience}]);
        toggleModal('experienceAdd', false);
    }, []);

    const onEditExperience = useCallback((updatedExperience: Experience) => {
        setexperiences(prv => 
            prv.map(exp => exp._id === updatedExperience._id ? { ...exp, ...updatedExperience } : exp)
        );
    }, []);

    const onAddEducation = useCallback((education: Education) => {
        seteducation(prv => [...prv, {
            ...education,
            educationStream:education.educationStream,
            educationLevel:education.educationLevel,
            institution:education.institution,
            isPresent:education.isPresent,
            location:education.location,
            startYear:education.startYear,
            endYear:education.endYear,
        }]);
    }, []);

    useEffect(() => {
        async function fetchExperiences(){
            setLoading(true);
            try {
                const [experienceResult, skillResult, educationResult] = await Promise.all([
                    getUserExperiences(),
                    getUserSkills(),
                    getUserEducations()
                ]);
                //checking experience value from the backend
                console.log('- checking experience only data from the backend------', experienceResult)
                //setLoading(false)
                if (experienceResult?.success) setexperiences(experienceResult.experience || []);
                if (skillResult?.success) setskills(skillResult.skills || []);
                if (educationResult?.success) seteducation(educationResult.educations || []);

            } catch (error) {
                // setLoading(false)
                console.error("Failed to fetch candidate data:", error);
                Notify.failure('Failed to fetch candidate data', {timeout: 2000})
            } finally {
                setLoading(false)
            }
        }

        fetchExperiences()
    }, [])

    return(
        <>
        <div className="p-5 md:p-10">
            <section className="">
                <div className="w-full flex justify-between items-center">
                    <p className="font-light">Experiences</p>
                    <button onClick={() => toggleModal('experienceAdd', true)} className="text-white bg-black text-xs flex items-center gap-2 py-2 rounded-md px-2">
                        <FaPlus />
                        Add experience
                    </button>
                </div>
                {loading
                    ? <>
                        <div className="flex gap-3 mt-5">
                            <div>
                                <Skeleton width={40} height={40} variant="circular" />
                            </div>
                            <div>
                                <Skeleton width={250} />
                                <Skeleton width={180} height={12} />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-5">
                            <div>
                                <Skeleton width={40} height={40} variant="circular" />
                            </div>
                            <div>
                                <Skeleton width={250} />
                                <Skeleton width={180} height={12} />
                            </div>
                        </div>
                        </>
                    : <>
                        <div className="grid grid-cols-1 mt-5 w-full gap-3">
                    {
                        experiences.map((exp: Experience, index: number) => (
                            <div key={index} className="group relative border border-gray-100 bg-white p-6 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-200">
    <div className="flex items-start gap-4">
        {/* Icon - More subtle and modern */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
            <FaSuitcase className="text-gray-400 group-hover:text-blue-600" size={20} />
        </div>

        {/* Content Section */}
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                        {exp.jobRole}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 mt-0.5">
                        {exp.organization}
                    </p>
                </div>
                
                {/* Actions - Hidden by default, appears on hover for that "clean" look */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => selecteEditableExperience(index)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                        <FaPencil size={14} />
                    </button>
                    <button 
                        onClick={() => deleteExperience(exp._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                    <IoLocation className="text-gray-400" />
                    {exp.location}
                </span>
                <span className="flex items-center gap-1.5">
                    <CiCalendar className="text-gray-400" size={16} />
                    {formatDate(exp.startDate)} — {exp.endDate && exp.endDate.length > 5 ? formatDate(exp.endDate) : 'Present'}
                </span>
            </div>

            {/* Badges - Using more professional "Ghost" styling */}
            <div className="flex gap-2 mt-4">
                <span className="px-2.5 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {exp.workMode}
                </span>
                <span className="px-2.5 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {exp.jobType}
                </span>
            </div>

            <div className="mt-3">
                <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
            </div>
        </div>
    </div>
</div>
                        ))
                    }
                </div>
                      </>
                }
                {
                    experiences.length === 0 && (
                        <p className="text-center text-xs text-gray-500">No Experience added</p>
                    )
                }
            </section>
            <div className="border-b border-gray-300 w-full my-10"></div>

            <section className="">
                <div className="w-full flex justify-between items-center">
                    <p className="font-light">Educations</p>
                    <button onClick={() => toggleModal('educationAdd', true)} className="text-white bg-black text-xs flex items-center gap-2 py-2 rounded-md px-2">
                        <FaPlus />
                        Add Education
                    </button>
                </div>
                {loading
                    ? <>
                        <div className="flex gap-3 mt-5">
                            <div>
                                <Skeleton width={40} height={40} variant="circular" />
                            </div>
                            <div>
                                <Skeleton width={250} />
                                <Skeleton width={180} height={12} />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-5">
                            <div>
                                <Skeleton width={40} height={40} variant="circular" />
                            </div>
                            <div>
                                <Skeleton width={250} />
                                <Skeleton width={180} height={12} />
                            </div>
                        </div>
                      </>
                    : <>
                        <div className="grid grid-cols-1 mt-5 w-full gap-3">
                    {
                        education.map((edu: Education, index: number) => (
                            <div key={index} className="group relative border border-gray-100 bg-white p-6 rounded-xl hover:border-indigo-100 hover:shadow-md transition-all duration-300">
    <div className="flex items-start gap-5">
        
        {/* Icon - Using a consistent, professional indigo theme */}
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 flex items-center justify-center rounded-lg border border-indigo-100 group-hover:scale-110 transition-transform">
            <FaGraduationCap className="text-indigo-600" size={22} />
        </div>

        {/* Content */}
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    {/* Level Badge - Small, clean, and uppercase */}
                    <span className="inline-block text-[10px] font-bold tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase border border-indigo-100 mb-2">
                        {edu.educationLevel}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {edu.educationStream}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                        {edu.institution}
                    </p>
                </div>

                {/* Actions - Grouped and subtle */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => selecteEditableEducation(index)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                        <FaPencil size={14} />
                    </button>
                    <button 
                        onClick={() => deleteEducation(edu._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>

            {/* Meta Info with better icons and alignment */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium">
                    <IoLocation className="text-gray-400" />
                    {edu.location}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                    <CiCalendar className="text-gray-400" size={16} />
                    {formatDate(edu.startYear)} — {edu.endYear ? formatDate(edu.endYear) : 'Present'}
                </span>
            </div>
        </div>
    </div>
</div>
                        ))
                    }
                </div>
                      </>
                }
                {
                    education.length === 0 && (
                        <p className="text-center text-xs text-gray-500">No Education added</p>
                    )
                }
            </section>
            <div className="border-b border-gray-300 w-full my-10"></div>

            <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
    <div className="w-full flex justify-between items-center mb-6">
        <div>
            <p className="font-bold text-gray-900 uppercase tracking-wider">Skills</p>
        </div>
        <button 
            onClick={() => toggleModal('skillsAdd', true)} 
            className="text-white bg-blue-600 hover:bg-blue-700 text-[11px] font-bold flex items-center gap-2 py-1.5 px-3 rounded-lg transition-all active:scale-95 shadow-sm"
        >
            <FaPlus size={10} />
            Add Skills
        </button>
    </div>
    <div>
        <p className="text-sm text-gray-500 font-medium mt-0.5 uppercase">technical</p>
    
    {loading
        ? <>
            <Skeleton />
        </>
        : <>
            <div className="w-full flex mt-5 flex-wrap gap-2.5">
        {skills.map((skill: Skills, index: number) => {
            if(skill.skillType === 'Technical-Skill'){
                return <div 
                key={index} 
                className="group flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-default"
            >
                <span className="text-xs font-semibold tracking-tight">{skill.skill}</span>
                <button 
                    onClick={() => deleteSkill(skill._id as string, skill.skill)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                >
                    <FaCircleXmark size={14} />
                </button>
            </div>
            }
        })}

        {skills.length === 0 && (
            <div className="w-full py-8 border-2 border-dashed border-gray-50 rounded-xl flex flex-col items-center">
                <p className="text-xs text-gray-400 font-medium italic">No skills added yet</p>
            </div>
        )}
    </div>
          </>
    }
    </div>

    <div className="mt-5">
        <p className="text-sm text-gray-500 font-medium mt-0.5 uppercase">soft</p>
    
    <div className="w-full flex mt-5 flex-wrap gap-2.5">
        {skills.map((skill: Skills, index: number) => {
            if(skill.skillType === 'Soft-Skill'){
                return <div 
                key={index} 
                className="group flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-default"
            >
                <span className="text-xs font-semibold tracking-tight">{skill.skill}</span>
                <button 
                    onClick={() => deleteSkill(skill._id as string, skill.skill)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                >
                    <FaCircleXmark size={14} />
                </button>
            </div>
            }
        })}

        {skills.length === 0 && (
            <div className="w-full py-8 border-2 border-dashed border-gray-50 rounded-xl flex flex-col items-center">
                <p className="text-xs text-gray-400 font-medium italic">No skills added yet</p>
            </div>
        )}
    </div>
    </div>
</section>
            <div className="border-b border-gray-300 w-full my-10"></div>
            
        </div>

        <AddExperienceForm onAddExperience={onAddExperience} experiencemodalopen={modals.experienceAdd} closeModal={() => toggleModal('experienceAdd', false)} />
        {
            modals.experienceEdit && selectedExperience && (<EditExperienceForm onEditExperience={onEditExperience} experience={selectedExperience} editExperienceModalOpen={modals.experienceEdit} closeExpEditModal={() => toggleModal('experienceEdit', false)} />)
        }
        
        <AddEducationForm onAddEducation={onAddEducation} educationModalOpen={modals.educationAdd} closeEducationModal={() => toggleModal('educationAdd', false)} />
        {
            modals.educationEdit && selectedEducation && (<EditEducationForm selectedEducation={selectedEducation} onEditEducation={onEditEducation} editEducationModalOpen={modals.educationEdit} closeEditEducationModal={() => toggleModal('educationEdit', false)} />)
        }
        
        <AddSkillsForm onRemoveSkill={onRemoveSkill} onAddSkill={onAddSkill} skillsModalOpen={modals.skillsAdd} closeSkillsModal={() => toggleModal('skillsAdd', false)} />
        </>
    )
}