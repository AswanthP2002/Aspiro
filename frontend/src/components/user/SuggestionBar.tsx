import dummyUserImage from '/recejames.jpg'
import dummyCompany from '/company.jpg'
import shculler from '/schuller.jpg'
import klara from '/klara.jpg'
import hektor from '/hektor.jpg'
import lucas from '/lucas.jpg'
import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { LuUserPlus } from 'react-icons/lu'
import { PiSuitcase } from 'react-icons/pi'

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
        <div className="suggestions p-3 grid grid-cols-1 gap-4 fixed w-90 ">
            <div className="border border-gray-300 rounded-md p-5 bg-white">
                <p className='font-light text-sm'>People you might know</p>
                <div className="mt-5 grid grid-cols-1 gap-3">
                    {
                        familiarUsers.map((person: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className='flex gap-3 items-center'>
                                    <div className='flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 text-white w-10 h-10 rounded-full'>
                                        <p>{person?.name[0]}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-700'>{person.name}</p>
                                        <p className='text-xs text-gray-500'>{person.role}</p>
                                    </div>
                                </div>
                                <button>
                                    <LuUserPlus color='blue' />
                                </button>
                            </div>
                        ))
                    }
                </div>
                <button className='border-2 border-blue-500 rounded-md w-full mt-5 text-sm py-1 text-blue-500'>
                    Find more people
                </button>
            </div>

            <div className="border border-gray-300 rounded-md p-5 bg-white">
                <p className='font-light text-sm'>Some opportunities that suits to you</p>
                <div className="mt-5 grid grid-cols-1 gap-3">
                    {
                        suitableJobs.map((job: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className='flex gap-3 items-center'>
                                    <div className='flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 text-white w-10 h-10 rounded-full'>
                                        <PiSuitcase color='white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-700'>{job.name}</p>
                                        <p className='text-xs text-gray-500'>{job.company}</p>
                                    </div>
                                </div>
                                <button>
                                    <LuUserPlus color='blue' />
                                </button>
                            </div>
                        ))
                    }
                </div>
                <button className='border-2 border-blue-500 rounded-md w-full mt-5 text-sm py-1 text-blue-500'>
                    Browse more
                </button>
            </div>
                        {/* <div className="border-b border-gray-200 pb-3">
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
                </div> */}
                    </div>
    )
}