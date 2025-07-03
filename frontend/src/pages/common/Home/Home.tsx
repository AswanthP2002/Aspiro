import landingPageImage from '/Illustration.png'
import './Home.css'
import datas from '../../../assets/data/dummyintrodata'
import jobVacancies from '../../../assets/data/dummyjobvacancies'
import { useState } from 'react'
import Tile from '../../../components/common/Tile'
import TileGuide from '../../../components/common/TileGuide'
import { guideData } from '../../../assets/data/guideData'
import reviews from '../../../assets/data/dummyReviews'
import arrowupdown from '/Arrows-up-down.png'
import arrowdownup from '/Arrows-down-up.png'
import Testimonial from '../../../components/common/testimonials'
import { TileRegisterAsCandidate, TileRegisterAsRecruiter } from '../../../components/common/AccountInfoTile'
import { commonService } from '../../../services/apiServices'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function Home(){
    const [tileData, setTiledata] = useState(datas)
    const [jobvacancies, setjobvacancies] = useState(jobVacancies)
    const [tileguideData, settileguideData] = useState(guideData)
    const [reviewData, setreviews] = useState(reviews)
    const [jobKeywordSearch, setJobKeywordSearch] = useState('')
    const [searchedJobs, setSearchedJobs] = useState<any[]>([])

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
            <div className="w-full landing-section-wrapper bg-cluttered" id="landing-section">
            <div className="container w-full aspiro-container py-5">
                <div className="flex flex-col md:flex-row gap-10 py-20">
                    <div className="left text w-1/2">
                        <p className="intro-landing-page text-ibm-plex-sans font-medium text-5xl">Level up your career with Asprio</p>
                        <p className="description-landing-page cluttered-text font-semibold font-poppins text-xs mt-6 me-8 lh-2">
                        No experience? No problem! Work on real projects, gain hands-on experience, build valuable skills, 
                        and connect with top companies offering internships—prepare for your dream job today!
                        </p>
                        <div className="search-options-wrapper relative">
                        <div className="search-options border border-gray-200 bg-white w-full max-w-[550px] mt-5 px-2 py-2 flex items-center justify-between">
                            <div className="item relative">
                               <input onKeyUp={(event) => dSearch(event)} className='pl-6' type="text" name="search-keywords" id="search-keywords" placeholder='Opportunity title...' /> 
                                <i className="fa-solid fa-search absolute left-0 top-2"></i>
                            </div>
                            
                            <div className="location relative">
                                <input type="text" name="search-location" placeholder='location....' id="search-location" className='pl-6' />
                                <i className="fa-solid fa-location-dot absolute left-0 top-2"></i>
                            </div>
                            <div className="button">
                                <button type="button" className="bg-blue-600 rounded-sm px-3 py-2 text-white text-xs">Find Jobs</button>
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
                <div className="tiles flex justify-between gap-10">
                    {
                        tileData ? tileData.map((data : any) => {
                            return <Tile tileData={data} />
                        })
                        : null
                    }
                </div>
            </div>
        </div>

        <div className="w-full pt-3 pb-3">
            <div className='aspiro-container container w-full px-2 md:px-20 py-5'>
                <p className="text-xl section-title poppins-font mt-5">Most popular vacancies</p>
                <div className="grid grid-cols-4 gap-y-8 gap-x-4 mt-10">
                    {
                        jobvacancies.map((job) => {
                            return <div>
                                <p className="poppins-font section-content !font-normal">{job.jobRole}</p>
                                <label htmlFor="">Vacancies {job.vacancies}</label>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>

        <div className="w-full pt-5 pb-20 bg-cluttered">
            <div className="container w-full px-2 md:px-20 py-5">
                <p className="text-xl section-title poppins-font mt-5 text-center">How Aspiro Works</p>
                <div className="w-full mt-10 flex justify-between gap-10 relative">
                    {
                        tileguideData.map((data) => {
                            return <TileGuide data={data} />
                        })
                    }

                    <img src={arrowupdown} alt="" className='absolute left-60' />
                    <img src={arrowdownup} alt="" className='absolute left-145 top-20' />
                    <img src={arrowupdown} alt="" className='absolute right-60' />

                </div>
            </div>
        </div>

        <div className="w-full bg-white pt-20 pb-20">
            <div className="aspiro-container">
                <div className="flex flex-col md:flex-row">
                    <div className="col w-1/2 flex items-center justify-center">
                        <p className="text-3xl font-bold">Why Aspiro?</p>
                    </div>
                    <div className="col w-1/2">
                        <p className='leading-loose'>
                            Aspiro is your gateway to real-world experience, connecting freshers and students with top companies. 
                            Whether it's internships, mini-projects, or career opportunities, we help you build skills, 
                            gain hands-on experience, and take the first step toward your dream job. With personalized 
                            opportunities and seamless job applications, Aspiro makes career growth easier and faster!
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full bg-cluttered pt-20 pb-20">
            <div className="aspiro-container">
                <p className="text-2xl font-semibold text-center mb-10">What others saying?</p>
                <div className="flex jusityf-between gap-10">
                    {
                        reviewData.map((data : any, index : number) => {
                            return <Testimonial reviewData={data} />
                        })
                     }
                </div>
            </div>
        </div>

        <div className="w-full bg-white pt-20 pb-20">
            <div className="aspiro-container">
                <div className="flex flex-col md:flex-row justify-between gap-30">
                    <TileRegisterAsCandidate />
                    <TileRegisterAsRecruiter />
                </div>
            </div>
        </div>
        </>
    )
}