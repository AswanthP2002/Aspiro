import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useRefreshToken from "../../../hooks/refreshToken";
import { tokenRefresh } from "../../../redux-toolkit/candidateAuthSlice";
import { candidateService } from "../../../services/apiServices";

export default function StoreDetails(){
    const [jobRole, setjobrole] = useState("")
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
    const [summary, setsummary] = useState("")
    const [summaryerror, setsummaryerror] = useState("")
    
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

      const navigator = useNavigate()
      const dispatch = useDispatch() 

      const token = useSelector((state : any) => {
        return state?.candidateAuth?.token
      })

      async function validateStore(event : any){
        event.preventDefault()

        const typedCityError = !/^[a-zA-Z\s\-]{2,50}$/.test(city) || !city || false
        const typeddistricterror = !/^[a-zA-Z\s\-]{2,50}$/.test(district) || !district || false
        const typedstateerror = !/^[a-zA-Z\s\-]{2,50}$/.test(state) || !state || false
        const typedcountryerror = !/^[a-zA-Z\s\-]{2,50}$/.test(country) || !country || false
        const typedpincodeerror = !/^[1-9][0-9]{5}$/.test(pincode) || !pincode || false
        const typedsummaryerror = !/^[A-Za-z0-9.,'"\s\-]{30,}$/.test(summary) || !summary || false

        typedCityError ? setcityerror("Enter your city") : setcityerror("")
        typeddistricterror ? setdistricterror("Enter your district") : setdistricterror("")
        typedstateerror ? setstateerror("Enter your state") : setstateerror("")
        typedcountryerror ? setcountryerror("Enter your country") : setcountryerror("")
        typedpincodeerror ? setpincodeError("Enter your pincode") : setpincodeError("")
        typedsummaryerror ? setsummaryerror("Enter proper summary") : setsummaryerror("")

        if(typedCityError || typeddistricterror || typedstateerror || typedcountryerror || typedpincodeerror || typedsummaryerror){
            return
        }else{
            console.log('data before sending to confirm',
                jobRole, city, districiterror, state, country, pinCodeError, summary
            )
            //testing the flow
            // alert('Details saved successfully')
            // return
            try {
                let saveResponse = await candidateService.saveBasicDetails(token, jobRole, city, district, state, country, pincode, summary)
                if(saveResponse.status === 401){
                    const newAccessToken = await useRefreshToken('http://localhost:5000/candidate/token/refresh')
                    saveResponse = await candidateService.saveBasicDetails(newAccessToken, jobRole, city, district, state, country, pincode, summary)
                }

                const result = await saveResponse.json()

                if(result.success){
                    Swal.fire({
                        icon:"success",
                        title:"Saved",
                        text:'Thank you for providing your basic details, you can add more details from the profile',
                        showCancelButton:false,
                        showConfirmButton:true,
                        confirmButtonText:"Continue",
                        allowOutsideClick:false,
                    }).then((result) => {
                        if(result.isConfirmed){
                            navigator('/profile/personal')
                        }
                    })
                }else{
                    Swal.fire({
                        icon:'error',
                        text:result.message,
                    })
                }

            } catch (error : unknown) {
                if(error instanceof Error){
                    Swal.fire({
                        icon:'error',
                        title:'Error',
                        text:error.message,
                        showConfirmButton:true,
                        confirmButtonText:'Home',
                        showCancelButton:false
                    }).then((result) => {
                        if(result.isConfirmed) navigator('/')
                    })
                }
            }
        }
      }

      
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="detils-wrapper w-full max-w-2xl">
                <h3 className="text-2xl font-medium">Share a little about you</h3>
                <form className="form" onSubmit={(event) => validateStore(event)}>
                <div className="mt-5">
                    <label htmlFor="">Who are you?</label>
                    <select className="w-full p-2 border border-gray-400 rounded" onChange={(event) => setjobrole(event.target.value)} name="job-role" id="job-role" value={jobRole}>
                        {
                            jobRoles.map((jobs, index) => {
                                return <option key={index} value={jobs}>{jobs}</option>
                            })
                        }
                    </select>
                </div>
                <div className="flex justify-between gap-10 mt-3">
                    <div className="city">
                        <label htmlFor="">City</label>
                        <input value={city} onChange={(event) => setcity(event.target.value)} type="text" className="w-full border border-black-500 p-2" />
                        <label htmlFor="" className="error-label">{cityerror}</label>
                    </div>
                    <div className="district">
                        <label htmlFor="">District</label>
                        <input value={district} onChange={(event) => setdistrict(event.target.value)} type="text" className="w-full border border-black-500 p-2" />
                        <label className="error-label">{districiterror}</label>
                    </div>
                    <div className="state">
                        <label htmlFor="">State</label>
                        <input value={state} onChange={(event) => setstate(event.target.value)} type="text" className="w-full border border-black-500 p-2" />
                        <label htmlFor="" className="error-label">{stateerror}</label>
                    </div>
                </div>
                <div className="flex justify-between mt-3">
                    <div className="pincode">
                        <label htmlFor="">Pin Code</label>
                        <input value={pincode} onChange={(event) => setpincode(event.target.value)} type="text" className="w-full border border-black-500 p-2" />
                        <label htmlFor="" className="error-label">{pinCodeError}</label>
                    </div>
                    <div className="country">
                        <label htmlFor="">Country</label>
                        <input value={country} onChange={(event) => setcountry(event.target.value)} type="text" className="w-full border border-black-500 p-2" />
                        <label htmlFor="" className="error-label">{countryerror}</label>
                     </div>
                </div>
                <div className="mt-3">
                    <label htmlFor="">About me</label>
                    <textarea value={summary} onChange={(event) => setsummary(event.target.value)} name="summary" id="summary" className="p-2 w-full h-[200px] border border-gray-400 outline-none"></textarea>
                    <label htmlFor="" className="error-label">{summaryerror}</label>
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white rounded-sm px-3 py-1">Save</button>
                </div>
                </form>
            </div>
        </div>
    )
}