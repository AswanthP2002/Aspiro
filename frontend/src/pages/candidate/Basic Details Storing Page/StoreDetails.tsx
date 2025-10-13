import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {motion, AnimatePresence} from 'motion/react'
import { getLocationDetails, saveBasicDetails } from "../../../services/candidateServices";

export default function StoreDetails(){
    const [jobRole, setjobrole] = useState("")
    const [isLocationUsing, setIsLocationUsing] = useState(false)
    const [jobRoleError, setJobRoleError] = useState("")
    const [city, setcity] = useState("")
    const [cityerror, setcityerror] = useState("")
    const [district, setdistrict] = useState("")
    const [districiterror, setdistricterror] = useState("")
    const [state, setstate] = useState("")
    const [stateerror, setstateerror] = useState("")
    const [country, setcountry] = useState("")
    const [countryerror, setcountryerror] = useState("")
    const [pincode, setpincode] = useState("")
    const [pinCodeError, setpincodeError] = useState("")
    const [about, setsummary] = useState("")
    const [summaryerror, setsummaryerror] = useState("")
    
    const [currentSection, setCurrentSection] = useState(1)

    const location = useLocation()

    const {candidateName, candidateId, candidateRole} = location.state || {}

    const errorLabelStyle = {
        fontSize:'0.7rem',
        color:'red',
        marginBottom:'0rem'
    }
    
    const jobRoles = [
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "Android Developer",
        "iOS Developer",
        "React Developer",
        "Node.js Developer",
        "Java Developer",
        "Python Developer",
        "Go Developer",
        "PHP Developer",
        "DevOps Engineer",
        "Cloud Engineer",
        "Solutions Architect",
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "AI Researcher",
        "Cybersecurity Analyst",
        "Penetration Tester",
        "System Administrator",
        "Network Engineer",
        "Database Administrator",
        "Product Manager",
        "Project Manager",
        "Technical Program Manager",
        "Business Analyst",
        "Scrum Master",
        "UI/UX Designer",
        "Graphic Designer",
        "Product Designer",
        "Visual Designer",
        "Web Designer",
        "Content Writer",
        "Technical Writer",
        "SEO Specialist",
        "Digital Marketing Manager",
        "Social Media Manager",
        "Sales Executive",
        "Customer Success Manager",
        "HR Manager",
        "Recruiter",
        "Talent Acquisition Specialist",
        "Finance Analyst",
        "Accountant",
        "Legal Advisor",
        "Operations Manager",
        "Quality Assurance Engineer",
        "Automation Test Engineer",
        "Game Developer",
        "Embedded Systems Engineer",
        "AR/VR Developer",
        "Blockchain Developer",
        "Robotics Engineer",
        "Bioinformatics Analyst",
        "IT Support Specialist"
      ];

      const navigateTo = useNavigate()


      useEffect(() : any => {
        if(!candidateId || !candidateName || candidateRole){
            return navigateTo(-1)
        }
      }, [])

      //handle error visibility when user types
      //first section
      function goToSecondSection(){
        const job_role_error = !jobRole || !/^[A-Za-z]/.test(jobRole) || false
        job_role_error ? setJobRoleError("Please choose job role") : setJobRoleError("")
        if(job_role_error) return
        setCurrentSection(2)
      }

      function goToThirdSection(){
        const country_error = !country || !/^[a-zA-Z\s\-]{2,50}$/.test(country) || false
        const state_error = !state || !/^[a-zA-Z\s\-]{2,50}$/.test(state) || false
        const district_error = !district || !/^[a-zA-Z\s\-]{2,50}$/.test(district) || false
        const city_error = !city || !/^[a-zA-Z\s\-]{2,50}$/.test(city) || false
        const zip_code_error = !pincode || !/^[1-9][0-9]{5}$/.test(pincode) || false

        country_error ? setcountryerror('Please enter your country') : setcountryerror("")
        state_error ? setstateerror('Please enter your state') : setstateerror("")
        district_error ? setdistricterror('Please enter your district') : setdistricterror("")
        city_error ? setcityerror('Please enter your city') : setcityerror("")
        zip_code_error ? setpincodeError('Please enter your pin code') : setpincodeError("")

        if(country_error || state_error || district_error || city_error || zip_code_error){
            return
        }

        setCurrentSection(3)

      }

      async function proceedToSave(){
        const summary_error = !about || !/^[A-Za-z0-9.,'"\s\-]{30,}$/.test(about) || false

        summary_error ? setsummaryerror('Please enter your summary') : setsummaryerror("")

        if(summary_error){
            return
        }

        await saveBasicDetails(jobRole, city, district, state, country, pincode, about)
          Swal.fire({
              icon: "success",
              title: "Saved",
              text: 'Thank you for providing your basic details, you can add more details from the profile',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: "Continue",
              allowOutsideClick: false,
          }).then((result) => {
              if (result.isConfirmed) {
                  navigateTo('/candidate/profile/personal')
              }
          })
      }
      ///pending route direction etc

      //ask live location permission
      function getLocation(){
        Swal.fire({
            icon:'info',
            title:'Access',
            text:'Aspiro need access to your location',
            showConfirmButton:true,
            confirmButtonText:'Allow',
            showCancelButton:true,
            cancelButtonText:'Deny'
        }).then(async (response) => {
            
            if(response.isConfirmed){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(async (position : GeolocationPosition) => {
                        console.log('This is user current position', position)
                        const result = await getLocationDetails(position.coords.latitude, position.coords.longitude)
                        console.log('Fetched reuslt of my location', result)
                        setcountry(result?.address?.country)
                        setstate(result?.address?.state)
                        setdistrict(result?.address?.state_district)
                        setcity(result?.address?.county)
                        setpincode(result?.address?.postcode)
                    }, (error : GeolocationPositionError) => {
                        console.log('Error occured while geting users position ', error)
                    })
                }
            }else{
                return
            }
        })
        

      }


      console.log('this is current state', currentSection)
      
    return(
        <div className="w-full min-h-screen grid grid-cols-1 relative store-details">
            <div className="fixed w-full flex justify-center gap-3 bottom-6">
                <div className={`px-7 py-1 rounded-full ${currentSection === 1 ? "bg-blue-500" : "bg-gray-500"}`}></div>
                <div className={`px-7 py-1 rounded-full ${currentSection === 2 ? "bg-blue-500" : "bg-gray-500"}`}></div>
                <div className={`px-7 py-1 rounded-full ${currentSection === 3 ? "bg-blue-500" : "bg-gray-500"}`}></div>
            </div>
            {/* Details sections */}

            <AnimatePresence mode="wait">
                {
                    currentSection === 1 && (
                        <motion.section
                            key="section-one" 
                            className="flex h-screen justify-center items-center store-details"
                            initial={{opacity:0, y:50}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:0.6}}
                            exit={{opacity:0}}
                        >
                            <div>
                                <p className="text-blue-500 text-4xl">Welcome ${candidateName}</p>
                                <p className="text-xl mt-5">We would love to know a bit more about you!</p>
                                <div className="group mt-5">
                                    <label htmlFor="" className="text-white block">Which one should describe your interested job role ?</label>
                                    <select value={jobRole} onChange={(evet) => setjobrole(evet.target.value)} className="border border-gray-300 w-full mt-2 text-sm rounded px-2 py-1 outline-none" name="" id="">
                                        <option value="" className="">Role</option>
                                        {
                                            jobRoles.map((role : any, index : number) => {
                                                return(<option value={role} key={index}>{role}</option>)
                                            })
                                        }
                                        <option value="other">Other</option>
                                    </select>
                                    {
                                        jobRole === "other"
                                            ? <input className="w-full border border-gray-300 rounded mt-3 px-2 py-1" type="text" />
                                            : null
                                    }
                                    <label htmlFor="" className="" style={errorLabelStyle}>{jobRoleError}</label>
                                <div className="mt-5 w-full flex justify-center items-center">
                                    <button onClick={goToSecondSection} type="button" className="hover:bg-blue-400 hover:text-white bg-blue-500 text-white text-sm rounded px-5 py-2">Next</button>
                                </div>
                                </div>
                            </div>
                        </motion.section>
                    )
                }

                {
                    currentSection === 2 && (
                        <motion.section
                            key="section-two"
                            className="flex h-screen justify-center items-center store-details"
                            initial={{opacity:0, y:50}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:0.6}}
                            exit={{opacity:0}}
                        >
                            <div>
                                <p className="text-blue-500 text-3xl">May I know about your location?</p>
                                <p className="mt-5 text-black text-lg">This will help us to personalize near by jobs.</p>
                                <div className="mt-2">
                                    {
                                        isLocationUsing
                                            ? <button onClick={() => setIsLocationUsing(false)} className="text-xs text-blue-500">Fill manually</button>
                                            : <button onClick={getLocation} className="text-xs text-blue-500">Use my current location</button>
                                    }
                                </div>
                                <div className="group mt-3">
                                    <label htmlFor="" className="text-white block">Country</label>
                                    <input value={country} onChange={(event) => setcountry(event.target.value)} readOnly={isLocationUsing} type="text" name="" className="border border-white rounded px-2 py-1 mt-1 text-black w-full" id="" />
                                    <label htmlFor="" style={errorLabelStyle}>{countryerror}</label>
                                </div>
                                <div className="group mt-3">
                                    <label htmlFor="" className="text-white block">State</label>
                                    <input value={state} onChange={(event) => setstate(event.target.value)} readOnly={isLocationUsing} type="text" name="" className="border border-white rounded px-2 py-1 mt-1 text-black w-full" id="" />
                                    <label htmlFor="" style={errorLabelStyle}>{stateerror}</label>
                                </div>
                                <div className="group mt-3">
                                    <label htmlFor="" className="text-white block">District</label>
                                    <input value={district} onChange={(event) => setdistrict(event.target.value)} readOnly={isLocationUsing} type="text" name="" className="border border-white rounded px-2 py-1 mt-1 text-black w-full" id="" />
                                    <label htmlFor="" style={errorLabelStyle}>{districiterror}</label>
                                </div>
                                <div className="group mt-3">
                                    <label htmlFor="" className="text-white block">City</label>
                                    <input value={city} onChange={(event) => setcity(event.target.value)} readOnly={isLocationUsing} type="text" name="" className="border border-white rounded px-2 py-1 mt-1 text-black w-full" id="" />
                                    <label htmlFor="" style={errorLabelStyle}>{cityerror}</label>
                                </div>
                                <div className="group mt-3">
                                    <label htmlFor="" className="text-white block">Zip code</label>
                                    <input value={pincode} onChange={(event) => setpincode(event.target.value)} readOnly={isLocationUsing} type="text" name="" className="border border-white rounded px-2 py-1 mt-1 text-black w-full" id="" />
                                    <label htmlFor="" style={errorLabelStyle}>{pinCodeError}</label>
                                </div>
                                <div className="mt-5 w-full flex justify-center items-center gap-5">
                                    <button onClick={() => setCurrentSection(1)} type="button" className="border border-blue-500 text-blue-500 text-sm rounded px-5 py-2">Previous</button>
                                    <button onClick={goToThirdSection} type="button" className="hover:bg-gray-500 hover:text-white bg-blue-500 text-white text-sm rounded px-5 py-2">Next</button>
                                </div>
                            </div>   
                        </motion.section>
                    )
                }

                {
                    currentSection === 3 && (
                        <motion.section
                            key="section-three"
                            className="flex h-screen justify-center items-center animate-smooth store-details"
                            initial={{opacity:0, y:50}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:0.6}}
                            exit={{opacity:0}}
                        >
                            <div>
                                <p className="text-blue-500 text-4xl">Now the final part</p>
                                <p className="text-lg text-black mt-5">Give a brief summary of yourself. This will help others to know about you more</p>
                                <div className="group mt-5">
                                    <label htmlFor="" className="text-white block">About me</label>
                                    <textarea value={about} onChange={(event) => setsummary(event.target.value)} name="" id="" className="text-sm mt-2 border border-gray-400 outline-none rounded w-full h-[200px] text-black p-2"></textarea>
                                    <label htmlFor="" style={errorLabelStyle}>{summaryerror}</label>
                                </div>
                                <div className="mt-5 w-full flex justify-center items-center gap-5">
                                    <button onClick={() => setCurrentSection(2)} type="button" className="border border-blue-500 text-blue-500 text-sm rounded px-5 py-2">Previous</button>
                                    <button onClick={proceedToSave} type="button" className="bg-blue-500 text-white text-sm px-5 py-2 hover:bg-blue-400 hover:text-white rounded">Finish</button>
                                </div>
                            </div>
                        </motion.section>
                    )
                }
            </AnimatePresence>
        </div>
    )
}