import landingPageImage from '/Illustration.png'
import './Home.css'
import datas from '../../../assets/data/dummyintrodata'
import jobVacancies from '../../../assets/data/dummyjobvacancies'
import { useState } from 'react'
import Tile from '../../../components/common/Tile'
import TileGuide from '../../../components/common/TileGuide'
import { guideData } from '../../../assets/data/guideData'
import {FaSuitcase, FaBriefcase, FaUsers, FaConnectdevelop} from 'react-icons/fa'
import {PiBuildingOfficeFill} from 'react-icons/pi'
import reviews from '../../../assets/data/dummyReviews'
import arrowupdown from '/Arrows-up-down.png'
import arrowdownup from '/Arrows-down-up.png'
import Testimonial from '../../../components/common/testimonials'
import { TileRegisterAsCandidate, TileRegisterAsRecruiter } from '../../../components/common/AccountInfoTile'
import { commonService } from '../../../services/commonServices'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function Home(){
    const [tileData, setTiledata] = useState(datas)
    const [jobvacancies, setjobvacancies] = useState(jobVacancies)
    const [tileguideData, settileguideData] = useState(guideData)
    const [reviewData, setreviews] = useState(reviews)
    const [jobKeywordSearch, setJobKeywordSearch] = useState('')
    const [searchedJobs, setSearchedJobs] = useState<any[]>([])

    const cardData = [
        {
        id:1,
        title:"Jobs",
        count:10000,
        icon:<FaBriefcase size={30} color='white' />
    },
    {
        id:2,
        title:"Companies",
        count:5000,
        icon:<PiBuildingOfficeFill size={30} color='white' />
    },
    {
        id:3,
        title:"Candidates",
        count:7000,
        icon:<FaUsers size={30} color='white' />
    },
    {
        id:4,
        title:"Internships",
        count:8500,
        icon:<FaConnectdevelop size={30} color='white' />
    }
    ]

    const navigator = useNavigate()

    async function searchJob(event : any){
        console.log('search value for everykeyup', event.target.value)
        try {
            const searchResponse = await commonService.homePageSearch(event.target.value)
            const result = await searchResponse.json()
            
            if(result?.success && event.target.value){
                setSearchedJobs(result?.jobs)
            }else{
                setSearchedJobs([])
            }
        } catch (error : unknown) {
            console.log('Error occured while searching the job from the homepage', error)
            if(error instanceof Error){
                Swal.fire({
                    icon:'error',
                    title:'CAUTION',
                    text:error?.message
                })
            }
        }
    }

    function debouncedSearch(fn : Function, delay : number){
        let timer : any
        return function(...args : any) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    function goToJobDetails(jobId : string) : void {
        navigator(`jobs/${jobId}`)
    }

    const dSearch = debouncedSearch(searchJob, 600)

    return(
        <>
            <section className="w-full landing-section-wrapper bg-white py-20" id="landing-section">
            <div className="container w-full aspiro-container">
                <div className="flex flex-col md:flex-row gap-10 py-20">
                    <div className="left text w-1/2">
                    {/* main heading font family changed to default :: previous ibm-plex-sans */}
                        <h1 className="intro-landing-page font-bold leading-tight text-gray-900 text-5xl">Level up your career with Asprio</h1>
                        <h3 className="mt-4 text-sm font-normal leading-relaxed text-gray-600">
                        No experience? No problem! Work on real projects, gain hands-on experience, build valuable skills, 
                        and connect with top companies offering internships—prepare for your dream job today!
                        </h3>
                        <div className="search-options-wrapper relative !mt-6">
                        <div className="search-options border shadow-md border-gray-200 bg-white w-full max-w-[550px] px-2 py-2 flex items-center justify-between">
                            <div className="item relative">
                               <input onKeyUp={(event) => dSearch(event)} className='pl-6 outline-none' type="text" name="search-keywords" id="search-keywords" placeholder='Opportunity title...' /> 
                                <i className="fa-solid fa-search absolute left-0 top-2"></i>
                            </div>
                            
                            <div className="location relative">
                                <input type="text" name="search-location" placeholder='location....' id="search-location" className='pl-6 outline-none' />
                                <i className="fa-solid fa-location-dot absolute left-0 top-2"></i>
                            </div>
                            <div className="button">
                                <button type="button" className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:bg-blue-700 rounded-sm px-5 py-2.5 text-white text-xs">Find Jobs</button>
                            </div>
                            
                        </div>
                        {
                            searchedJobs.length > 0
                                        ? <div className="search-results bg-white shadow w-[550px] p-2 text-sm">
                                            {
                                                searchedJobs.map((job : any, index : number) => {
                                                    return(
                                                        <div onClick={() => goToJobDetails(job?._id)} key={index} className='cursor-pointer flex items-center gap-4 w-full p-2 hover:bg-blue-100'>
                                                            <i className="fa-solid fa-building"></i>
                                                            <div className=''>
                                                                <p className="text-xs font-semibold">{job.jobTitle}</p>
                                                                <p className="text-xs">{job.companyDetails.companyName} <span className='ms-2'><i className="fa-solid fa-location-dot me-2"></i>{job?.location}</span></p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                          </div>
                                        : null
                        }
                        </div>
                        <div>
                        <p className="suggestions text-gray-400 mt-3 text-xs">Suggestions <span className="text-black">Designer, Programming, Digital Marketing..</span></p>
                        </div>
                    </div>
                    <div className="right block ms-10 img w-1/3 flex items-center justify-end">
                        <img src={landingPageImage} alt="" />
                    </div>
                </div>
                <div className="tiles flex justify-between gap-8">
                    {
                        cardData ? cardData.map((data : any, index : number) => {
                            return <Tile key={index} tileData={data} />
                        })
                        : null
                    }
                </div>
            </div>
        </section>

        <section className="w-full py-16 bg-gray-50">
            <div className='aspiro-container container w-full px-2 md:px-20 py-5'>
                <p className="text-3xl text-center font-bold text-gray-900">Most popular vacancies</p>
                <div className="grid grid-cols-4 gap-6 gap-x-4 mt-10">
                    {
                        jobvacancies.map((job, index : number) => {
                            return <div key={index} className='bg-white flex gap-3 items-center border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-lg p-5'>
                                <div className='border border-gray-200 w-[40px] h-[40px] rounded-full flex justify-center items-center'><FaBriefcase /></div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 mb-2">{job.jobRole}</p>
                                    <p className="text-sm font-medium text-gray-500">Openings {job.vacancies}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>

        <section className="w-full bg-white py-20">
            <div className="container w-full px-2 md:px-20 py-5">
                <p className="text-3xl font-semibold text-center mb-16">How Aspiro Works</p>
                <div className="w-full grid grid-cols-4 gap-10 relative">
                    {
                        tileguideData.map((data, index : number) => {
                            return <TileGuide key={index} data={data} />
                        })
                    }

                    <img src={arrowupdown} alt="" className='absolute left-60' />
                    <img src={arrowdownup} alt="" className='absolute left-145 top-20' />
                    <img src={arrowupdown} alt="" className='absolute right-60' />

                </div>
            </div>
        </section>

        <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-70 py-20">
            <div className="aspiro-container">
                <div className="grid grid-cols-2 gap-10">
                    <div className="flex items-center justify-center">
                        <p className="text-3xl font-extrabold text-gray-900">Why Aspiro?</p>
                    </div>
                    <div className="">
                        <p className='leading-relaxed text-lg text-gray-700'>
                            Aspiro is your gateway to real-world experience, connecting freshers and students with top companies. 
                            Whether it's internships, mini-projects, or career opportunities, we help you build skills, 
                            gain hands-on experience, and take the first step toward your dream job. With personalized 
                            opportunities and seamless job applications, Aspiro makes career growth easier and faster!
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full bg-cluttered py-20">
            <div className="aspiro-container">
                <p className="text-3xl font-bold text-center mb-10">What others are saying?</p>
                <div className="flex jusityf-between gap-10">
                    {
                        reviewData.map((data : any, index : number) => {
                            return <Testimonial key={index} reviewData={data} />
                        })
                     }
                </div>
            </div>
        </section>

        <div className="w-full bg-white pt-20 pb-20">
            <div className="aspiro-container">
                <div className="grid grid-cols-2 gap-30">
                    <TileRegisterAsCandidate />
                    <TileRegisterAsRecruiter />
                </div>
            </div>
        </div>
        </>
    )
}