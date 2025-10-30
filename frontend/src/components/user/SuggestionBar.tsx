import dummyUserImage from '/recejames.jpg'
import dummyCompany from '/company.jpg'
import shculler from '/schuller.jpg'
import klara from '/klara.jpg'
import hektor from '/hektor.jpg'
import lucas from '/lucas.jpg'
import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'

const suggestedUsers = [
    {name:"Le Schuller", role:"Project Manager",image:shculler},
    {name:"Hektor Fort", role:"Graphic Desginer",image:hektor},
    {name:'Klara', role:'Prompt Engineer', image:klara},
    {name:'Lucas Bergvel', role:'HR Manager', image:lucas}
]

const suggestedJobs = [
    {name:"Node Js Developer", company:"Konami",image:dummyCompany},
    {name:"Sales Executive", company:"Nabraz",image:dummyCompany},
    {name:"English Tutor", company:"Pragathi",image:dummyCompany},
    {name:"Python Intern", company:"Mosch",image:dummyCompany}
]

export default function SuggessionBar(){
    const [familiarUsers, setFamiliarUsers] = useState<any>(suggestedUsers)
    const [suitableJobs, setSuitableJobs] = useState<any>(suggestedJobs)
    const [loadingFamiliarUsers, setLodingFamiliarUsers] = useState(true)
    const [loadingSuitableJobs, setLoadingSuitableJobs] = useState(true)
    useEffect(() => {
        let timout = setTimeout(() => {
            setLodingFamiliarUsers(false)
            setLoadingSuitableJobs(false)
        }, 2000)

        return () => clearTimeout(timout)
    }, [])

    return(
        <div className="suggestions p-3 fixed w-90 !mt-10 bg-white shadow-lg border border-gray-300 rounded-md">
                        <div className="border-b border-gray-200 pb-3">
                    <p className="font-semibold text-gray-700">Peoples you might know</p>
                    <div className="mt-3">
                        {
                            familiarUsers.map((person : any, index : number) => {
                                return <div key={index} className="flex items-center gap-2 mb-3">
                                    {loadingFamiliarUsers ? <Skeleton variant='circular' width={40} height={40} /> : <img className="w-10 h-10 rounded-full" style={{objectFit:'cover'}} src={person.image} alt="" />}
                                    <div>
                                        {loadingFamiliarUsers ? <Skeleton variant='text' height={15} width={130} /> : <p className="font-semibold text-sm">{person.name}</p>}
                                        {loadingFamiliarUsers ? <Skeleton variant='text' height={10} width={100} /> : <p className="text-xs text-gray-500">{person.role}</p>}
                                    </div>
                                </div>
                            })
                        }
                        {loadingFamiliarUsers ? <Skeleton variant='rectangular' height={30} /> : <button className="bg-gradient-to-br from-blue-500 to-indigo-600 mt-2 text-white text-sm !py-1 w-full rounded" type="button">Find more people</button>}
                    </div>
                </div>

                <div className="border-b border-gray-200 pb-3 mt-5">
                    <p className="font-semibold text-gray-700">Some opportunties that suits you</p>
                    <div className="mt-3">
                        {
                            suitableJobs.map((person : any, index : number) => {
                                return <div key={index} className="flex items-center gap-2 mb-3">
                                    {loadingSuitableJobs ? <Skeleton variant='circular' width={40} height={40} /> : <img className="w-10 h-10 rounded-full" style={{objectFit:'cover'}} src={person.image} alt="" />}
                                    <div>
                                        {loadingSuitableJobs ? <Skeleton variant='text' height={15} width={130} /> : <p className="font-semibold text-sm">{person.name}</p>}
                                        {loadingSuitableJobs ? <Skeleton variant='text' height={10} width={100} /> : <p className="text-xs text-gray-500">{person.company}</p>}
                                    </div>
                                </div>
                            })
                        }
                        {loadingSuitableJobs ? <Skeleton variant='rectangular' height={30} /> : <button className="bg-gradient-to-br mt-2 from-blue-500 to-indigo-600 text-white text-sm w-full !py-1 rounded" type="button">Browse More</button>}
                    </div>
                </div>
                    </div>
    )
}