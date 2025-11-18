import { useCallback, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import AddExperienceForm from "../../../components/candidate/Forms/ExperienceAdd";
import {IoLocate, IoLocation, IoSchoolSharp}  from 'react-icons/io5'
import Swal from "sweetalert2";
import EditExperienceForm from "../../../components/candidate/Forms/ExperienceEdit";
import AddSkillsForm from "../../../components/candidate/Forms/SkillsAdd";
import AddEducationForm from "../../../components/candidate/Forms/EducationAdd";
import EditEducationForm from "../../../components/candidate/Forms/EducationEdit";
import { deleteUserEducation, deleteUserExperience, deleteUserSkill, getUserExperiences, getUserSkills, getUserEducations } from "../../../services/userServices";
import { Education, Experience, Skills } from "../../../types/entityTypes";
import CandidateExperienceCard from "../../../components/candidate/Cards/ExperienceCard";
import CandidateEducationCard from "../../../components/candidate/Cards/EducationCard";
import { Notify } from "notiflix";
import { FaGraduationCap, FaPlus, FaSuitcase, FaTrash } from "react-icons/fa";
import { FaCircleXmark, FaPencil } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import formatDate from "../../../services/util/formatDate";


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

    const onAddSkill = useCallback((skill : string, skillType : string, skillLevel : string) => {
        setskills((prv : Skills[]) => {
            return [...prv, {skillLevel, skillType, skill}]
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

    const token = useSelector((state: { candidateAuth: { token: string } }) => state.candidateAuth.token, shallowEqual);

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
            icon: 'warning',
            title: 'Confirm Delete?',
            text: 'Are you sure to delete this experience',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete'
        });

        if (result.isConfirmed) {
            await deleteUserExperience(expId);
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000
            });
            onDeleteExperience(expId);
        }
    }, [onDeleteExperience]);

    const deleteSkill = useCallback(async (skillId: string, skill: string) => {
        await deleteUserSkill(skillId);
        Swal.fire({
            icon: 'success',
            title: 'Deleted',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500
        });
        onRemoveSkill(skill);
    }, [onRemoveSkill]);

    const deleteEducation = useCallback(async (educationId?: string) => {
        if (!educationId) return;
            Swal.fire({
                icon:'warning',
                title:'Confirm Delete',
                text:'Are you sure to delete this education?',
                showCancelButton:true,
                showConfirmButton:true,
                confirmButtonText:'Delete'
            }).then(async (result) => {
                if(result.isConfirmed){
                    await deleteUserEducation(educationId);
                    Swal.fire({
                        icon:'success',
                        title:'Deleted',
                        showConfirmButton:false,
                        showCancelButton:false,
                        timer:1500
                    });
                    onDeleteEducation(educationId);
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
                setLoading(false)
                if (experienceResult?.success) setexperiences(experienceResult.experience || []);
                if (skillResult?.success) setskills(skillResult.skills || []);
                if (educationResult?.success) seteducation(educationResult.educations || []);

            } catch (error) {
                setLoading(false)
                console.error("Failed to fetch candidate data:", error);
                Notify.failure('Failed to fetch candidate data', {timeout: 2000})
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
                <div className="grid grid-cols-1 mt-5 w-full gap-3">
                    {
                        experiences.map((exp: any, index: number) => (
                            <div key={index} className="border flex gap-3 border-gray-200 bg-white p-5 rounded-md">
                                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md">
                                    <FaSuitcase color="blue" />
                                </div>
                                <div>
                                  <p className="text-gray-700">{exp.jobRole}</p>
                                  <p className="text-sm font-light text-gray-700 mt-1">{exp.organization}</p>
                                  <div className="flex gap-2 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <IoLocation />
                                        {exp.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CiCalendar />
                                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                    </span>
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <span className="bg-blue-100 text-blue-700 !px-2 rounded-full text-xs">On-site</span>
                                    <span className="bg-blue-100 text-blue-700 !px-2 rounded-full text-xs">Full-time</span>
                                  </div>
                                </div>
                                <div className="flex-1 flex gap-5 justify-end items-start">
                                    <button onClick={() => selecteEditableExperience(index)}><FaPencil size={12} color="gray" /></button>
                                    <button onClick={() => deleteExperience(exp._id)}><FaTrash size={12} color="gray" /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
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
                <div className="grid grid-cols-1 mt-5 w-full gap-3">
                    {
                        education.map((edu: any, index: number) => (
                            <div key={index} className="border flex gap-3 border-gray-200 bg-white p-5 rounded-md">
                                <div className="bg-rose-100 w-10 h-10 flex items-center justify-center rounded-md">
                                    <FaGraduationCap color="indigo" />
                                </div>
                                <div>
                                  <p className="text-gray-700">{edu.educationStream}</p>
                                  <p className="text-xs rounded-md font-light text-black mt-1 bg-gray-200 w-fit px-2 font-medium">{edu.educationLevel}</p>
                                    <p className="text-sm mt-2 font-light">{edu.institution}</p>
                                  <div className="flex gap-2 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <IoLocation />
                                        {edu.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CiCalendar />
                                        {formatDate(edu.startYear)} - {edu.endYear ? formatDate(edu.endYear) : 'Present'}
                                    </span>
                                  </div>
                                  {/* <div className="flex gap-2 mt-2">
                                    <span className="bg-blue-100 text-blue-700 !px-2 rounded-full text-xs">On-site</span>
                                    <span className="bg-blue-100 text-blue-700 !px-2 rounded-full text-xs">Full-time</span>
                                  </div> */}
                                </div>
                                <div className="flex-1 flex gap-5 justify-end items-start">
                                    <button onClick={() => selecteEditableEducation(index)}><FaPencil size={12} color="gray" /></button>
                                    <button onClick={() => deleteEducation(edu._id)}><FaTrash size={12} color="gray" /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    education.length === 0 && (
                        <p className="text-center text-xs text-gray-500">No Education added</p>
                    )
                }
            </section>
            <div className="border-b border-gray-300 w-full my-10"></div>

            <section className="">
                <div className="w-full flex justify-between items-center">
                    <p className="font-light">Skills</p>
                    <button onClick={() => toggleModal('skillsAdd', true)} className="text-white bg-black text-xs flex items-center gap-2 py-2 rounded-md px-2">
                        <FaPlus />
                        Add Skills
                    </button>
                </div>
                <div className="w-full flex flex-wrap gap-3 mt-5">
                    {
                        skills.map((skill: Skills, index: number) => (
                            <div key={index} className="text-xs flex items-center gap-2 font-medium bg-gray-200 rounded-full !px-3 !py-1">
                                <p>{skill.skill}</p>
                                <button onClick={() => deleteSkill(skill._id as string, skill.skill)}>
                                    <FaCircleXmark size={15} color="gray" />
                                </button>
                            </div>
                        ))
                    }
                    
                </div>
                {
                    skills.length === 0 && (
                        <p className="text-center text-xs text-gray-500">No Skills added</p>
                    )
                }
            </section>
            <div className="border-b border-gray-300 w-full my-10"></div>
            
        </div>
        {/* <div className="container px-5 py-5">
            <section className="experience">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Experiences</p></div>
                    <div><button onClick={() => toggleModal('experienceAdd', true)} type="button" className="btn font-normal text-sm">Add experience <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                <div className="mt-5">
                    {loading && (<p>Loading experiences...</p>)}
                    {
                        experiences.length > 0
                                ? <div className="grid grid-cols-2 gap-3">
                                    {
                                        experiences.map((exp : Experience, index : number) => {
                                            return <CandidateExperienceCard 
                                                    key={index} 
                                                    exp={exp} 
                                                    editExperience={() => selecteEditableExperience(index)}
                                                    deleteExperience={() => deleteExperience(exp?._id)}
                                                   />
                                        })
                                    }
                                </div>
                                : <p className="text-center text-gray-300">No Experience provided</p>
                    }
                </div>
            </section>

            <div className="mt-5 border border-gray-200"></div>

            <section className="education mt-10">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Education</p></div>
                    <div><button onClick={() => toggleModal('educationAdd', true)} type="button" className="btn font-normal text-sm">Add education <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                    <div className="mt-5">
                        {loading && (<p>Loading education...</p>)}
                        {
                            education.length > 0
                                ? <div className="grid grid-cols-4 gap-5">
                                    {
                                        education.map((education : Education, index : number) => {
                                            return <CandidateEducationCard key={index} education={education} openEditEducationModal={() => selecteEditableEducation(index)} deleteEducation={() => deleteEducation(education._id)} />
                                        })
                                    }
                                </div>
                                : <p className="text-center text-gray-300">No Education provided</p>
                        }
                    </div>
            </section>

            <div className="mt-5 border border-gray-200"></div>

            <section className="skills mt-10">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Skills</p></div>
                    <div><button onClick={() => toggleModal('skillsAdd', true)} type="button" className="btn font-normal text-sm">Add skills <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                <div className="mt-5">
                    {loading && (<p>Loading skills...</p>)}
                    {
                        skills.length > 0
                            ? <>
                                <div className="flex flex-wrap gap-5">
                                    {
                                        skills?.map((skill : any, index : number) => {
                                        return(
                                            <>
                                             <div key={index} className="">
                                                 <div className="skill rounded-full px-3 py-2 flex items-center gap-2 border border-gray-300">
                                                     <p className="text-xs skill-name">{skill?.skill}</p>
                                                     <i onClick={() => deleteSkill(skill._id, skill.skill)} className="cursor-pointer fa-regular fa-circle-xmark"></i>
                                                 </div>
                                             </div>
                                            </>
                                        )
                                    })
                                    }
                                </div>
                              </>
                            : <p className="text-center mt-5">No Skills added</p>
                    }
                </div>
            </section>
        </div> */}
        {/* Experience Modal */}

        <AddExperienceForm onAddExperience={onAddExperience} token={token} experiencemodalopen={modals.experienceAdd} closeModal={() => toggleModal('experienceAdd', false)} />
        {
            modals.experienceEdit && selectedExperience && (<EditExperienceForm onEditExperience={onEditExperience} experience={selectedExperience} token={token} editExperienceModalOpen={modals.experienceEdit} closeExpEditModal={() => toggleModal('experienceEdit', false)} />)
        }
        
        <AddEducationForm onAddEducation={onAddEducation} token={token} educationModalOpen={modals.educationAdd} closeEducationModal={() => toggleModal('educationAdd', false)} />
        {
            modals.educationEdit && selectedEducation && (<EditEducationForm selectedEducation={selectedEducation} token={token} onEditEducation={onEditEducation} editEducationModalOpen={modals.educationEdit} closeEditEducationModal={() => toggleModal('educationEdit', false)} />)
        }
        
        <AddSkillsForm onRemoveSkill={onRemoveSkill} onAddSkill={onAddSkill} token={token} skillsModalOpen={modals.skillsAdd} closeSkillsModal={() => toggleModal('skillsAdd', false)} />
        </>
    )
}