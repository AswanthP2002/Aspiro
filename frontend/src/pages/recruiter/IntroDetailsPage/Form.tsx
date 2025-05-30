import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function IntroDetailsPageForm(){
    const token = useSelector((state : any) => {
        return state.recruiterAuth.recruiterToken
    })
    const [step, setstep] = useState(1)
    const [details, setdetails] = useState({
        logo:"",
        coverPhoto:"",
        companyName:"",
        about:"",
        benefits:"",
        companyType:"",
        industryType:"",
        teamStrength:"",
        yearOfEstablishment:"",
        website:"",
        vision:"",
        country:"",
        state:"",
        city:"",
        mobile:"",
        email:""
    })

    const [nameError, setnamerror] = useState("")
    const [aboutError, setabouterror] = useState("")
    const [benefitsError, setbenefitserror] = useState("")
    const [establishmentyearError, setestablishmenterror] = useState("")
    const [websiteError, setwebsiteerror] = useState("")
    const [visionError, setvisionerror] = useState("")
    const [cityError, setcityerror] = useState("")
    const [stateError, setstaterror] = useState("")
    const [countryError, setcountryerror] = useState("")
    const [mobileError, setMobileError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [companyTypeError, setcompanytypeerror] = useState("")
    const [industryError, setindustryerror] = useState("")
    const [teamStrengthError, setteamstreangtherror] = useState("")

    const [logogpreview, setlogopreview] = useState("")
    const [logo, setlogo] = useState<File | null>(null)
    const [logourl, setlogourl] = useState("")

    const [coverphotopreview, setcoverphotoprevew] = useState("")
    const [coverPhoto, setcoverphoto] = useState<File | null>(null)
    const [coverphotourl, setcoverphotourl] = useState("")

    const logophotoinput = useRef<HTMLInputElement>(null)
    const coverphotoinput = useRef<HTMLInputElement>(null)

    const navigator = useNavigate()

    function handleLogoUploadClick(){
        if(logophotoinput.current){
            logophotoinput.current.click()
        }
    }

    function handleCoverPhotoUpload(){
        if(coverphotoinput.current){
            coverphotoinput.current.click()
        }
    }

    function handleLogoFileUpload(event : any){
        const file = event.target.files[0]
        if(file){
            setlogo(file)
            setlogopreview(URL.createObjectURL(file))
        }
    }

    function handleCoverPhotoFileUpload(event : any){
        const file = event.target.files[0]
        if(file){
            setcoverphoto(file)
            setcoverphotoprevew(URL.createObjectURL(file))
        }
    }

    function handleData(event : any){
        setdetails((prev : any) => {
            return {
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }

    const nextStep = async () => {
        let isValidated = false
        if(step === 1) isValidated = validateStepOne()
        if(step === 2) isValidated = validateStepTwo()
        if(step === 3) isValidated = validateStepThree()

        if(step === 3 && isValidated){
            console.log('Datas before sending to the backend', details)
            // Swal.fire({
            //     icon:'info',
            //     title:'Testing Flow',
            //     text:'Data send successfully',
            //     showConfirmButton:true
            // })

            // return 
            
            try {
                if(logo){
                    const logoFormData = new FormData()
                    logoFormData.append('file', logo)
                    logoFormData.append('upload_preset', 'recruiter_profile_images')
                    logoFormData.append('folder', 'profile')

                    const logoResponse = await fetch('https://api.cloudinary.com/v1_1/dfb0unqh6/image/upload', {
                        method:'POST',
                        body:logoFormData
                    })

                    const logoResult = await logoResponse.json()
                    setlogourl(logoResult.secure_url)
                }

                if(coverPhoto){
                    const coverFormData = new FormData()
                    coverFormData.append('file', coverPhoto)
                    coverFormData.append('upload_preset', 'recruiter_profile_images')
                    coverFormData.append('folder', 'profile')

                    const coverPhotoResponse = await fetch('https://api.cloudinary.com/v1_1/dfb0unqh6/image/upload', {
                        method:'POST',
                        body:coverFormData
                    })

                    const coverPhotoResult = await coverPhotoResponse.json()
                    setcoverphotourl(coverPhotoResult.secure_url)
                }

                //save details in the database
                const saveResponse = await fetch('http://localhost:5000/recruiter/intro/details', {
                    method:'POST',
                    headers:{
                        authorization:`Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({details, logourl, coverphotourl})
                })
                
                if(saveResponse.status === 500) throw new Error('Internal server error, please try again after some time')
                
                const saveResult = await saveResponse.json()

                if(saveResult.success){
                    Swal.fire({
                        icon:'success',
                        title:'Saved',
                        text:saveResult.message,
                        showConfirmButton:true,
                        confirmButtonText:'Continue'
                    })
                    .then((result) => {
                        if(result.isConfirmed){
                            navigator('/recruiter/profile/overview')
                            return
                        }else{
                            navigator('/recruiter')
                        }
                    })
                }
            } catch (error : any) {
                console.log('Error occured while saving company/recruiter details', error.message)
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:'Internal server Error, please try again after some time',
                    showConfirmButton:true
                })
                .then((result) => {
                    if(result.isConfirmed) navigator('/recruiter')
                })
                return
            }
        }

        if(isValidated){
            setstep(prevstate => prevstate + 1)}
        }
        
    const previousStep = () => setstep(prevstate => prevstate - 1)

    const companyType = [
        "Startup",
        "SME(Small & Medium Scale Enterprises)",
        "MNC",
        "Government Organization",
        "Non Profit Organization",
        "Educational Institution",
        "Public Sector Unit",
        "Other"
    ]

    const industryTypes = [
        "Information Technology (IT) / Software",
        "Telecommunications",
        "Banking / Financial Services",
        "Healthcare / Medical",
        "Education / E-Learning",
        "Retail / E-commerce",
        "Manufacturing",
        "Logistics / Transportation",
        "Automobile / Automotive",
        "Construction / Real Estate",
        "Hospitality / Travel / Tourism",
        "Media / Advertising / PR",
        "Legal / Law Services",
        "Government / Public Sector",
        "Non-Profit / NGO",
        "Pharmaceuticals / Biotech",
        "Energy / Oil & Gas",
        "Agriculture / Food Processing",
        "Aerospace / Aviation",
        "Others"
    ];

    const strength = [
        '1-10',
        '10-30',
        '30-50',
        '50-100',
        'More than 100'
    ]

    function validateStepOne() : boolean {
        const nameerror = !details.companyName || !/^[A-Za-z0-9&.,' -]{2,100}$/.test(details.companyName) || false
        const abouterror = !details.about || !/^[A-Za-z0-9.,!?'"():;\- \n\r]{10,1000}$/.test(details.about) || false
        const benefitserror = !details.benefits || !/^[A-Za-z0-9.,!?'"():;\- \n\r]{10,1000}$/.test(details.benefits) || false

        nameerror ? setnamerror("Enter valid company name") : setnamerror("")
        abouterror ? setabouterror("Enter valid summary") : setabouterror("")
        benefitserror ? setbenefitserror("Enter valid benefits") : setbenefitserror("")

        if(nameerror || abouterror || benefitserror){
            return false
        }
        return true
    }

    function validateStepTwo() : boolean {
        const yearofestablishmenterror = !details.yearOfEstablishment || !/^(18|19|20)\d{2}$/.test(details.yearOfEstablishment) || false
        const websiteerror = !/^$|^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/.test(details.website) || false
        const visionerror = !details.vision || !/^[A-Za-z0-9.,!?'"():;\- \n\r]{10,1000}$/.test(details.vision) || false
        const companyTypeerror = !details.companyType || false
        const industryerror = !details.industryType || false
        const teamstrengtherror = !details.teamStrength || false

        yearofestablishmenterror ? setestablishmenterror("Enter valid year") : setestablishmenterror("")
        websiteerror ? setwebsiteerror("Enter valid url") : setwebsiteerror("")
        visionerror ? setvisionerror('Enter company vision') : setvisionerror("")
        companyTypeerror ? setcompanytypeerror('Select Company Type') : setcompanytypeerror("")
        industryerror ? setindustryerror('Select Industry') : setindustryerror("") 
        teamstrengtherror ? setteamstreangtherror('Select team strength') : setteamstreangtherror("")

        if(yearofestablishmenterror || websiteError || visionerror || companyTypeerror || industryerror || teamstrengtherror){
            return false
        }

        return true
    }

    function validateStepThree() : boolean {
        const cityerror = !details.city || !/^[a-zA-Z\s]{2,50}$/.test(details.city) || false
        const stateerror = !details.state || !/^[a-zA-Z\s]{2,50}$/.test(details.state) || false
        const countryerror = !details.country || !/^[a-zA-Z\s]{2,50}$/.test(details.country) || false
        const mobileerror = !details.mobile || !/^[6-9]\d{9}$/.test(details.mobile) || false
        const emailerror = !details.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(details.email) || false

        cityerror ? setcityerror("Enter valid city") : setcityerror("")
        stateerror ? setstaterror('Enter valid state') : setstaterror("")
        countryerror ? setcountryerror('Enter valid country') : setcountryerror("")
        mobileerror ? setMobileError('Enter valid mobile') : setMobileError("")
        emailerror ? setEmailError('Enter valid email') : setEmailError("")

        if(cityerror || stateerror || countryerror || mobileerror || emailerror){
            return false
        }

        return true
    }

    return(
        <>
            <div className="container w-full h-screen">
                <div className="m-auto w-[600px] min-w-[400px] mt-30">
                    <div className="w-full flex justify-center gap-15">
                        <p className={step === 1 ? "font-bold shadow" : ""}>Company Info</p>
                        <p className={step === 2 ? "font-bold shadow" : ""}>Founding Info</p>
                        <p className={step === 3 ? "font-bold shadow" : ""}>Contact</p>
                    </div>
                    <hr />
                    <div className="details py-3">
                        {
                            step === 1 && (
                                <>  
                                    <div className="media flex gap-5 p-1">
                                        <div onClick={handleLogoUploadClick} className="p-2 border border-dotted h-[100px] w-[120px] flex flex-col justify-center items-center">
                                            {
                                                logogpreview
                                                    ? <img src={logogpreview} className="w-full h-full" alt="" />
                                                    : <>
                                                        <i className="fa-solid fa-upload"></i>
                                                        <p className="text-xs">Browse a photo</p>
                                                        <p className="text-xs">Company Logo</p>
                                                      </>
                                            }
                                            
                                        </div>
                                        <div onClick={handleCoverPhotoUpload} className="p-2 border border-dotted h-[100px] flex flex-col justify-center items-center" style={{flexGrow:1}}>
                                            {
                                                coverphotopreview
                                                    ? <img src={coverphotopreview} className="w-full h-full" alt="" />
                                                    : <>
                                                        <i className="fa-solid fa-upload"></i>
                                                        <p className="text-xs">Browse a photo</p>
                                                        <p className="text-xs">Cover Photo</p>
                                                      </>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <input onChange={(event) => handleLogoFileUpload(event)} className="hidden" type="file" name="logo" id="" ref={logophotoinput} />
                                        <input onChange={(event) => handleCoverPhotoFileUpload(event)} className="hidden" type="file" name="coverphoto" id="coverphoto" ref={coverphotoinput} />
                                    </div>
                                    <label htmlFor="" className="text-xs block">Company Name <span className="text-red-400">*</span></label>
                                    <input value={details.companyName} onChange={(event) => handleData(event)} type="text" className="w-full p-2 mt-1 border border-gray-400 rounded-sm outline-none" name="companyName" />
                                    <label htmlFor="" className="error-label">{nameError}</label>
                                    
                                    <label htmlFor="" className="text-xs mt-3 block">About Us <span className="text-red-400">*</span></label>
                                    <textarea value={details.about} onChange={(event) => handleData(event)} className="w-full p-2 mt-1 border border-gray-400 rounded-sm outline-none" name="about" id="about"></textarea>
                                    <label htmlFor="" className="error-label">{aboutError}</label>
                                    
                                    <label htmlFor="" className="text-xs mt-3 block">Why work with us <span className="text-red-400">*</span></label>
                                    <textarea value={details.benefits}  onChange={(event) => handleData(event)} className="w-full p-2 mt-1 border border-gray-400 rounded-sm outline-none" name="benefits" id="benefits"></textarea>
                                    <label htmlFor="" className="error-label">{benefitsError}</label>
                                    
                                    <div className="action">
                                    <button onClick={nextStep} type="button" className="bg-blue-400 rounded-sm px-2 text-xs w-25 py-2">Next</button>
                                    </div>
                                </>
                            )
                        }
                        {
                            step === 2 && (
                                <>
                                <div className="">
                                    <div className="div mt-3">
                                        <label htmlFor="" className="text-xs">Company Type <span className="text-red-400">*</span></label>
                                        <select name="companyType" id="companyType" className="mt-1 w-full border border-gray-400 rounded-sm p-2" value={details.companyType} onChange={(event) => handleData(event)}>
                                            <option value="">--Select Company Type--</option>
                                            {
                                                companyType.map((value, index) => {
                                                    return <option key={index} value={value}>{value}</option>
                                                })
                                            }
                                        </select>
                                        <label htmlFor="" className="error-label">{companyTypeError}</label>
                                    </div>
                                    <div className="div mt-3">
                                        <label htmlFor="" className="text-xs">Industry <span className="text-red-400">*</span></label>
                                        <select name="industryType" id="industryType" className="mt-1 w-full border border-gray-400 rounded-sm p-2" value={details.industryType} onChange={(event) => handleData(event)}>
                                            <option value="">--Select Industry--</option>
                                            {
                                                industryTypes.map((industry, index) => {
                                                    return <option key={index} value={industry}>{industry}</option>
                                                })
                                            }
                                        </select>
                                        <label htmlFor="" className="error-label">{industryError}</label>
                                    </div>
                                    <div className="div mt-3">
                                        <label htmlFor="" className="text-xs">Team Strength(Employees) <span className="text-red-400">*</span></label>
                                        <select name="teamStrength" id="teamStrength" className="mt-1 w-full border border-gray-400 rounded-sm p-2" value={details.teamStrength} onChange={(event) => handleData(event)}>
                                                <option value="">--Select team strength--</option>
                                            {
                                                strength.map((count, index) => {
                                                    return <option key={index} value={count}>{count}</option>
                                                })
                                            }
                                        </select>
                                        <label htmlFor="" className="error-label">{teamStrengthError}</label>
                                    </div>
                                    <div className="flex justify-between gap-5 mt-3">
                                        <div>
                                            <label htmlFor="" className="text-xs">year of establishment <span className="text-red-400">*</span></label>
                                            <input value={details.yearOfEstablishment} onChange={(event) => handleData(event)} type="number" name="yearOfEstablishment" id="yearOfEstablishment" className="mt-1 w-full border border-gray-400 rounded-sm p-2" />
                                            <label htmlFor="" className="error-label">{establishmentyearError}</label>
                                        </div>
                                        <div>
                                            <label htmlFor="" className="text-xs">Company website</label>
                                            <input value={details.website} onChange={(event) => handleData(event)} type="text" name="website" id="website" className="mt-1 w-full border border-gray-400 rounded-sm p-2" />
                                            <label htmlFor="" className="error-label">{websiteError}</label>
                                        </div>
                                        
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="" className="text-xs">Comapny Vision</label>
                                        <textarea value={details.vision} onChange={(event) => handleData(event)} name="vision" id="vision" className="border border-gray-400 outline-none rounded-sm w-full mt-1 h-[100px]"></textarea>
                                        <label htmlFor="" className="error-label">{visionError}</label>
                                    </div>
                                    <div className="actions mt-2">
                                        <button onClick={nextStep} type="button" className="bg-blue-400 rounded-sm px-2 text-xs w-25 py-2">Next</button>
                                        <button onClick={previousStep} className="bg-gray-400 rounded-sm px-2 text-xs w-24 py-2 ms-2">Previous</button>
                                    </div>
                                </div>
                                </>
                            )
                        }
                        {
                            step === 3 && (
                                <>
                                    <div className="flex justify-between gap-5">
                                        <div className="w-full">
                                            <label htmlFor="" className="text-xs">City <span className="text-red-400">*</span></label>
                                            <input value={details.city} onChange={(event) => handleData(event)} type="text" name="city" id="city" className="w-full border border-gray-400 rounded-sm p-2" />
                                            <label htmlFor="" className="error-label">{cityError}</label>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="" className="text-xs">State <span className="text-red-400">*</span></label>
                                            <input value={details.state} onChange={(event) => handleData(event)} type="text" name="state" id="state" className="w-full border border-gray-400 rounded-sm p-2" />
                                            <label htmlFor="" className="error-label">{stateError}</label>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="" className="text-xs">Country <span className="text-red-400">*</span></label>
                                            <input value={details.country} onChange={(event) => handleData(event)} type="text" name="country" id="country" className="w-full border border-gray-400 rounded-sm p-2" />
                                            <label htmlFor="" className="error-label">{countryError}</label>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="" className="text-xs">Mobile <span className="text-red-400">*</span></label>
                                        <input value={details.mobile} onChange={(event) => handleData(event)} type="tel" name="mobile" id="mobile" className="w-full border border-gray-400 rounded-sm p-2" />
                                        <label htmlFor="" className="error-label">{mobileError}</label>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="" className="text-xs">Email <span className="text-red-400">*</span></label>
                                        <input value={details.email} onChange={(event) => handleData(event)} type="email" name="email" id="email" className="w-full border border-gray-400 rounded-sm p-2" />
                                        <label htmlFor="" className="error-label">{emailError}</label>
                                    </div>
                                    <div className="actions mt-2">
                                        <button onClick={nextStep} type="button" className="bg-blue-400 rounded-sm px-2 text-xs w-25 py-2">Save & Next</button>
                                        <button onClick={previousStep} className="bg-gray-400 rounded-sm px-2 text-xs w-24 py-2 ms-2">Previous</button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
        // 
    )
}
