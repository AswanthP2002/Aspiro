import landingPageImage from '/Illustration.png'
import './Home.css'
import datas from '../../../assets/data/dummyintrodata'
import jobVacancies from '../../../assets/data/dummyjobvacancies'
import { useState } from 'react'
import Tile from '../../../components/common/Tile'
import TileGuide from '../../../components/common/TileGuide'
import { guideData } from '../../../assets/data/guideData'
import arrowupdown from '/Arrows-up-down.png'
import arrowdownup from '/Arrows-down-up.png'


export default function Home(){
    const [tileData, setTiledata] = useState(datas)
    const [jobvacancies, setjobvacancies] = useState(jobVacancies)
    const [tileguideData, settileguideData] = useState(guideData)
    return(
        <>
            <div className="w-full landing-section-wrapper bg-cluttered" id="landing-section">
            <div className="container w-full px-2 md:px-20 py-5">
                <div className="flex flex-col md:flex-row gap-10 py-20">
                    <div className="left text w-1/2">
                        <p className="intro-landing-page font-ibm-plex-sans text-5xl">Level up your career with Asprio</p>
                        <p className="description-landing-page font-poppins text-xs mt-6 lh-2">
                        No experience? No problem! Work on real projects, gain hands-on experience, build valuable skills, 
                        and connect with top companies offering internships—prepare for your dream job today!
                        </p>
                        <div className="search-options border border-gray-200 bg-white w-full max-w-md mt-5 px-2 py-2 flex items-center justify-between">
                            <div className="item relative">
                               <input className='pl-6' type="text" name="search-keywords" id="search-keywords" placeholder='Opportunity title...' /> 
                                <i className="fa-solid fa-search absolute left-0 top-2"></i>
                            </div>
                            
                            <div className="location relative">
                                <input type="text" name="search-location" placeholder='location....' id="search-location" className='pl-6' />
                                <i className="fa-solid fa-location-dot absolute left-0 top-2"></i>
                            </div>
                            <div className="button">
                                <button type="button" className="bg-blue-600 rounded-sm px-3 py-1 text-white">Search</button>
                            </div>
                            
                        </div>
                        <div>
                        <p className="suggestions text-gray-400 mt-3 text-xs">Suggestions <span className="text-black">Designer, Programming, Digital Marketing..</span></p>
                        </div>
                    </div>
                    <div className="right img w-1/2 flex items-center justify-center">
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

        <div className="w-full pt-3">
            <div className='container w-full px-2 md:px-20 py-5'>
                <p className="text-xl section-title poppins-font mt-5">Most popular vacancies</p>
                <div className="grid grid-cols-4 gap-y-8 gap-x-4 mt-10">
                    {
                        jobvacancies.map((job) => {
                            return <div>
                                <p className="poppins-font section-content">{job.jobRole}</p>
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
        </>
    )
}