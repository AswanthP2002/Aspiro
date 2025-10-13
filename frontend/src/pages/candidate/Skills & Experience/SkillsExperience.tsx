import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddExperienceForm from "../../../components/candidate/Forms/ExperienceAdd";
import {IoSchoolSharp}  from 'react-icons/io5'
import Swal from "sweetalert2";
import EditExperienceForm from "../../../components/candidate/Forms/ExperienceEdit";
import AddSkillsForm from "../../../components/candidate/Forms/SkillsAdd";
import AddEducationForm from "../../../components/candidate/Forms/EducationAdd";
import EditEducationForm from "../../../components/candidate/Forms/EducationEdit";
import { deleteCandidateEducation, deleteCandidateExperience, deleteCandidateSkills, getCandidateEducation, getCandidateExperience, getCandidateSkills } from "../../../services/candidateServices";
import { Education, Experience, Skills } from "../../../types/entityTypes";
import CandidateExperienceCard from "../../../components/candidate/Cards/ExperienceCard";
import CandidateEducationCard from "../../../components/candidate/Cards/EducationCard";


export default function ExperiencePage(){

    const [experiences, setexperiences] = useState<Experience[]>([])
    const [education, seteducation] = useState<Education[]>([])
    const [skills, setskills] = useState<Skills[]>([])

    const [selectedExperience, setSelectedExperience] = useState<any>({})
    const [selectedEducation, setSelecteEducation] = useState<any>({})

    const [experiencemodalopen, setexperiencemodalopen] = useState(false)
    const [editExperienceModalOpen, seteditexperiencemodalopen] = useState(false)

    const [skillsModalOpen, setskillsmodalopen] = useState(false)

    const [educationModalOpen, setEducationModalOpen] = useState(false)
    const [editEducationModalOpen, setEditEducationModalOpen] = useState(false)

    const onAddSkill = (skill : string, type : string, level : string) => {
        setskills((prv : Skills[]) => {
            return [...prv, {level, type, skill}]
        })
    }
    const onRemoveSkill = (skill : string) => {
        setskills((prv : Skills[]) => {
            return prv.filter((s : Skills) => s.skill.toLowerCase() !== skill.toLowerCase())
        })
    }

    const onEditEducation = (id : string, education : Education) => {
        seteducation((prv : Education[]) => {
            return [
                    ...prv.filter((edu : Education) => edu._id !== id),
                    {
                        level:education.level,
                        stream:education.stream,
                        organization:education.organization,
                        isPresent:education.isPresent,
                        startYear:education.startYear,
                        endYear:education.endYear,
                        location:education.location,
                        _id:education._id
                    }
                   ]
        })
    }
    const onDeleteEducation = (eduId? : string) => {
        seteducation((prv : Education[]) => {
            return prv.filter((edu : Education) => edu._id !== eduId)
        })
    }

    const onDeleteExperience = (expId : string) => {
        setexperiences((prv : Experience[]) => {
            return prv.filter((exp : Experience) => exp._id !== expId)
        })
    }



    const token = useSelector((state : any) => {
        return state.candidateAuth.token
    })

    function formatDate(createdAt : Date | string) : string {
        const joined = new Date(createdAt)
        return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    }

    function getExperienceDuration(startDate : Date, endDate : any) : number {
        let yearDifference, monthDifference
        if(!endDate){
            yearDifference = new Date().getFullYear() - startDate.getFullYear()
            monthDifference = new Date().getMonth() - startDate.getMonth()
        }else{
            yearDifference = endDate.getFullYear() - startDate.getFullYear()
            monthDifference = endDate.getMonth() - startDate.getMonth()
        }
        return yearDifference * 12 + monthDifference
    }

    function selecteEditableExperience(expIndex : number){
        setSelectedExperience(experiences[expIndex])
        openExpEditModal()        
    }

    function selecteEditableEducation(eduIndex : number) {
        setSelecteEducation(education[eduIndex])
        openEditEducationModal()
    }

    async function deleteExperience(expId? : string) {
            Swal.fire({
                icon:'warning',
                title:'Confirm Delete?',
                text:'Are you sure to delete this experience',
                showConfirmButton:true,
                showCancelButton:true,
                confirmButtonText:'Delete'
            }).then(async (result) => {
                if(result.isConfirmed){
                    await deleteCandidateExperience(expId)

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => onDeleteExperience(expId as string))
                }else{
                    return
                }
            })
            

    }

    async function deleteSkill(skillId : string, skill : string) {

            await deleteCandidateSkills(skillId)

                Swal.fire({
                    icon:'success',
                    title:'Deleted',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1500
                }).then(() => onRemoveSkill(skill))
    }

    async function deleteEducation(educationId? : string) {
            Swal.fire({
                icon:'warning',
                title:'Confirm Delete',
                text:'Are you sure to delete this education?',
                showCancelButton:true,
                showConfirmButton:true,
                confirmButtonText:'Delete'
            }).then(async (result) => {
                if(result.isConfirmed){
                    await deleteCandidateEducation(educationId)

                    Swal.fire({
                        icon:'success',
                        title:'Deleted',
                        showConfirmButton:false,
                        showCancelButton:false,
                        timer:1500
                    }).then(() => onDeleteEducation(educationId))
                }else{
                    return
                }
            })

            

    }

    const onAddExperience = (experience : Experience) => {
        setexperiences((prv : Experience[]) => {
            return [
                ...prv,
                {
                    role:experience.role,
                    jobtype:experience.jobtype,
                    organization:experience.organization,
                    location:experience.location,
                    locationtype:experience.locationtype,
                    ispresent:experience.ispresent,
                    startdate:experience.startdate,
                    enddate:experience.enddate
                }
            ]
        })
        // role, jobtype, location, locationtype, organization, ispresent, startdate, enddate

        setexperiencemodalopen(false)
    }

    const onEditExperience = (experience : Experience) => {
        setexperiences((prv : Experience[]) => {
            return [
                ...prv.filter((exp : Experience) => exp._id !== experience._id),
                {
                    _id:experience._id,
                    role:experience.role,
                    organization:experience.organization,
                    jobtype:experience.jobtype,
                    location:experience.location,
                    locationtype:experience.locationtype,
                    startdate:experience.startdate,
                    enddate:experience.enddate,
                    ispresent:experience.ispresent
                }
            ]
        })
    }

    const onAddEducation = (education : Education) => {
        seteducation((prv : Education[]) => {
            return [
                ...prv,
                {
                    level:education.level,
                    stream:education.stream,
                    organization:education.organization,
                    location:education.location,
                    isPresent:education.isPresent,
                    startYear:education.startYear,
                    endYear:education.endYear
                }
            ]
        })
    }

    useEffect(() => {
        async function fetchExperiences(){
            
            const experienceResult = await getCandidateExperience()
            const skillResult = await getCandidateSkills()
            const educationResult = await getCandidateEducation()

            
            if(experienceResult?.success && skillResult?.success && educationResult?.success){
                console.log('experience data from the frontend', experienceResult)
                console.log('skills from the backend the', skillResult?.skills)
                console.log('education from the backend', educationResult?.educations)
                setexperiences(experienceResult?.experience)
                setskills(skillResult?.skills)
                seteducation(educationResult?.educations)
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:'Something went wrong'
                })
            }
        }

        fetchExperiences()
    }, [])


    const openModal = () => setexperiencemodalopen(true)
    const closeModal = () => setexperiencemodalopen(false)

    const openExpEditModal = () => seteditexperiencemodalopen(true)
    const closeExpEditModal = () => seteditexperiencemodalopen(false)

    const openSkillModal = () => setskillsmodalopen(true)
    const closeSkillsModal = () => setskillsmodalopen(false)

    const openEducationModal = () => setEducationModalOpen(true)
    const closeEducationModal = () => setEducationModalOpen(false)

    const openEditEducationModal = () => setEditEducationModalOpen(true)
    const closeEditEducationModal = () => setEditEducationModalOpen(false)

    return(
        <>
        <div className="container px-5 py-5">
            <section className="experience">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Experiences</p></div>
                    <div><button onClick={openModal} type="button" className="btn font-normal text-sm">Add experience <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                    {
                        experiences.length > 0
                                ? <>
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
                                </>
                                : <p className="text-center text-gray-300">No Experience provided</p>
                    }
                </div>
            </section>

            <div className="mt-5 border border-gray-200"></div>

            <section className="education mt-10">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Education</p></div>
                    <div><button onClick={openEducationModal} type="button" className="btn font-normal text-sm">Add education <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                    <div className="mt-5 grid grid-cols-4 gap-5">
                        {
                            education.length > 0
                                ? <>
                                    {
                                        education.map((education : Education, index : number) => {
                                            return <CandidateEducationCard key={index} education={education} openEditEducationModal={() => selecteEditableEducation(index)}  deleteEducation={() => deleteEducation(education._id)} />
                                        })
                                    }
                                </>
                                : <p className="text-center text-gray-300">No Education provided</p>
                        }
                    </div>
            </section>

            <div className="mt-5 border border-gray-200"></div>

            <section className="skills mt-10">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Skills</p></div>
                    <div><button onClick={openSkillModal} type="button" className="btn font-normal text-sm">Add skills <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                <div className="mt-5">
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
        </div>
        {/* Experience Modal */}

        <AddExperienceForm onAddExperience={onAddExperience} token={token} experiencemodalopen={experiencemodalopen} closeModal={closeModal} />
        {
            editExperienceModalOpen && (<EditExperienceForm onEditExperience={onEditExperience} experience={selectedExperience} token={token} editExperienceModalOpen={editExperienceModalOpen} closeExpEditModal={closeExpEditModal} />)
        }
        
        <AddEducationForm onAddEducation={onAddEducation} token={token} educationModalOpen={educationModalOpen} closeEducationModal={closeEducationModal} />
        {
            editEducationModalOpen && (<EditEducationForm selectedEducation={selectedEducation} token={token} onEditEducation={onEditEducation} editEducationModalOpen={editEducationModalOpen} closeEditEducationModal={closeEditEducationModal} />)
        }
        
        <AddSkillsForm onRemoveSkill={onRemoveSkill} onAddSkill={onAddSkill} token={token} skillsModalOpen={skillsModalOpen} closeSkillsModal={closeSkillsModal} />
        </>
    )
}