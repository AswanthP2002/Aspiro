import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddExperienceForm from "../../../components/candidate/Forms/ExperienceAdd";
import Swal from "sweetalert2";
import EditExperienceForm from "../../../components/candidate/Forms/ExperienceEdit";
import AddSkillsForm from "../../../components/candidate/Forms/SkillsAdd";
import AddEducationForm from "../../../components/candidate/Forms/EducationAdd";
import EditEducationForm from "../../../components/candidate/Forms/EducationEdit";
import { deleteCandidateEducation, deleteCandidateExperience, deleteCandidateSkills, getCandidateEducation, getCandidateExperience, getCandidateSkills } from "../../../services/candidateServices";

export default function ExperiencePage(){

    const [experiences, setexperiences] = useState<any[]>([])
    const [education, seteducation] = useState<any[]>([])
    const [skills, setskills] = useState<any[]>([])

    const [selectedExperience, setSelectedExperience] = useState<any>({})
    const [selectedEducation, setSelecteEducation] = useState<any>({})

    const [experiencemodalopen, setexperiencemodalopen] = useState(false)
    const [editExperienceModalOpen, seteditexperiencemodalopen] = useState(false)

    const [skillsModalOpen, setskillsmodalopen] = useState(false)

    const [educationModalOpen, setEducationModalOpen] = useState(false)
    const [editEducationModalOpen, setEditEducationModalOpen] = useState(false)

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

    async function deleteExperience(expId : string) {

            await deleteCandidateExperience(expId)

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => window.location.reload())

    }

    async function deleteSkill(skillId : string) {

            await deleteCandidateSkills(skillId)

                Swal.fire({
                    icon:'success',
                    title:'Deleted',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1500
                }).then(() => window.location.reload())
    }

    async function deleteEducation(educationId : string) {

            await deleteCandidateEducation(educationId)

                Swal.fire({
                    icon:'success',
                    title:'Deleted',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1500
                }).then(() => window.location.reload())

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
        <div className="container px-10 py-5">
            <section className="experience">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Experiences</p></div>
                    <div><button onClick={openModal} type="button" className="btn font-normal text-sm">Add experience <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                <div className="mt-5">
                    {
                        experiences.length > 0
                                ? <>
                                    <table className="table w-full">
                                        <thead className="w-full">
                                            <tr className="bg-gray-300">
                                                <th className="text-sm font-semibold py-1">Role</th>
                                                <th className="text-sm font-semibold py-1">From</th>
                                                <th className="text-sm font-semibold py-1">To</th>
                                                <th className="text-sm font-semibold py-1">Duration</th>
                                                <th className="text-sm font-semibold py-1">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                experiences.map((exp: any, index: number) => {
                                                    return <>
                                                        <tr className="">
                                                            <td className="flex items-center gap-3">
                                                                <div><i className="fa-solid fa-building-user !text-3xl !text-gray-400"></i></div>
                                                                <div className="">
                                                                    <p className="font-semibold text-sm">{exp?.role} <span className="ms-2 rounded-full bg-blue-200 text-blue-500 text-xs font-semibold px-2">{exp?.locationtype}</span></p>
                                                                    <p className="mt-3 text-gray-400 text-xs">{exp.organization} <span><i className="fa-solid fa-location-dot !text-gray-400 me-2"></i>{exp.location}</span></p>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm">{formatDate(exp?.startdate)}</td>
                                                            <td className="text-sm">{exp?.enddate ? formatDate(exp?.enddate) : "Present"}</td>
                                                            <td className="text-sm">
                                                                {
                                                                    exp?.enddate
                                                                        ? getExperienceDuration(new Date(exp?.startdate), new Date(exp.enddate))
                                                                        : getExperienceDuration(new Date(exp?.startdate), "")
                                                                } Months
                                                            </td>
                                                            <td className="flex justify-end">
                                                                <button className="btn text-xs border p-2 me-3" onClick={() => selecteEditableExperience(index)}>Edit <i className="fa-solid fa-pencil !text-xs"></i></button>
                                                                <button className="btn text-xs border p-2" onClick={() => deleteExperience(exp?._id)}>Remove <i className="fa-solid fa-trash !text-xs"></i></button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                : <p className="text-center text-gray-300">No Experience provided</p>
                    }
                </div>
            </section>

            <hr className="mt-5" />

            <section className="education mt-10">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Education</p></div>
                    <div><button onClick={openEducationModal} type="button" className="btn font-normal text-sm">Add education <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
                    <div className="mt-5">
                        {
                            education.length > 0
                                ? <>
                                    <table className="table w-full">
                                        <thead className="w-full">
                                            <tr className="bg-gray-300">
                                                <th className="text-sm font-semibold py-1">Education</th>
                                                <th className="text-sm font-semibold py-1">From</th>
                                                <th className="text-sm font-semibold py-1">To</th>
                                                <th className="text-sm font-semibold py-1">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                education.map((ed: any, index: number) => {
                                                    return <>
                                                        <tr className="">
                                                            <td className="flex items-center gap-3">
                                                                <div><i className="fa-solid fa-school !text-3xl !text-gray-400"></i></div>
                                                                <div className="">
                                                                    <p className="font-semibold text-sm">{ed?.stream}</p>
                                                                    <p className="mt-3 text-gray-400 text-xs">{ed?.level} <span><i className="fa-solid fa-location-dot !text-gray-400 me-2"></i>{ed?.organization}</span></p>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm">{ed?.startYear}</td>
                                                            <td className="text-sm">{ed?.endYear ? ed?.endYear : "Studying"}</td>
                                                            <td className="flex justify-end">
                                                                <button className="btn text-xs border p-2 me-3" onClick={() => selecteEditableEducation(index)}>Edit <i className="fa-solid fa-pencil !text-xs"></i></button>
                                                                <button className="btn text-xs border p-2" onClick={() => deleteEducation(ed?._id)}>Remove <i className="fa-solid fa-trash !text-xs"></i></button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                : <p className="text-center text-gray-300">No Education provided</p>
                        }
                    </div>
            </section>

            <hr className="mt-5" />

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
                                                     <i onClick={() => deleteSkill(skill._id)} className="cursor-pointer fa-regular fa-circle-xmark"></i>
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

        <AddExperienceForm token={token} experiencemodalopen={experiencemodalopen} closeModal={closeModal} />
        <EditExperienceForm experience={selectedExperience} token={token} editExperienceModalOpen={editExperienceModalOpen} closeExpEditModal={closeExpEditModal} />
        
        <AddEducationForm token={token} educationModalOpen={educationModalOpen} closeEducationModal={closeEducationModal} />
        <EditEducationForm selectedEducation={selectedEducation} token={token} editEducationModalOpen={editEducationModalOpen} closeEditEducationModal={closeEditEducationModal} />
        
        <AddSkillsForm token={token} skillsModalOpen={skillsModalOpen} closeSkillsModal={closeSkillsModal} />
        </>
    )
}