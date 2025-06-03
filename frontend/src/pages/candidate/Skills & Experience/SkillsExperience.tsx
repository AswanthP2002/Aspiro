import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import state from "sweetalert/typings/modules/state";
import useRefreshToken from "../../../hooks/refreshToken";
import AddExperienceForm from "../../../components/candidate/Forms/ExperienceAdd";
import Swal from "sweetalert2";
import EditExperienceForm from "../../../components/candidate/Forms/ExperienceEdit";

export default function ExperiencePage(){

    const [experiences, setexperiences] = useState<any[]>([])
    const [education, seteducation] = useState<any[]>([])

    const [selectedExperience, setSelectedExperience] = useState<any>({})

    const [experiencemodalopen, setexperiencemodalopen] = useState(false)
    const [editExperienceModalOpen, seteditexperiencemodalopen] = useState(false)

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

    async function deleteExperience(expId : string) {
        async function makeRequest(accessToken : string){
            return fetch(`http://localhost:5000/candidate/experience/${expId}`, {
                method:'DELETE',
                headers:{
                    authorization:`Bearer ${accessToken}`
                },
                credentials:'include'
            })
        }

        try {
            let response = await makeRequest(token)
            if (response.status === 401) {
                const newAccessToken = await useRefreshToken('http://localhost:5000/candidate/token/refresh')
                response = await makeRequest(newAccessToken)
            }

            const result = await response.json()

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => window.location.reload())
            } else {
                Swal.fire({
                    icon: 'error',
                    text: result.message
                })
            }
        } catch (error : unknown) {
            console.log('Error occured while removing experience', error)
                if(error instanceof Error){
                    Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error.message
                })
            }
        }
    }

    useEffect(() => {
        async function fetchExperiences(){
           async function makeRequest(accessToken : string){
                 return fetch('http://localhost:5000/candidate/experience', {
                    method:'GET',
                    headers:{
                        authorization:`Bearer ${accessToken}`
                    },
                    credentials:'include'
                })
           }

           try {
            let response = await makeRequest(token)
            if(response.status === 401){
                const newAccesstoken = await useRefreshToken('http://localhost:5000/candidate/token/refresh')
                response = await makeRequest(newAccesstoken)
            }

            const result = await response.json()

            if(result?.success){
                console.log('experience data from the frontend', result?.experience)
                setexperiences(result?.experience)
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:result?.message
                })
            }
           } catch (error : unknown) {
                console.log('Error occured while geting experiencd', error)
                Swal.fire({
                    icon:'error',
                    title:'Error'
                })
           }


        }

        fetchExperiences()
    }, [])


    const openModal = () => setexperiencemodalopen(true)
    const closeModal = () => setexperiencemodalopen(false)

    const openExpEditModal = () => seteditexperiencemodalopen(true)
    const closeExpEditModal = () => seteditexperiencemodalopen(false)

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
                    <div><button type="button" className="btn font-normal text-sm">Add education <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
            </section>

            <hr className="mt-5" />

            <section className="skills mt-10">
                <div className="w-full flex justify-between">
                    <div><p className="font-bold">Skills</p></div>
                    <div><button type="button" className="btn font-normal text-sm">Add skills <i className="fa-solid fa-circle-plus"></i></button></div>
                </div>
            </section>
        </div>
        {/* Experience Modal */}

        <AddExperienceForm token={token} experiencemodalopen={experiencemodalopen} closeModal={closeModal} />
        <EditExperienceForm experience={selectedExperience} token={token} editExperienceModalOpen={editExperienceModalOpen} closeExpEditModal={closeExpEditModal} />

        </>
    )
}