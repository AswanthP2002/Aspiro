import React, { useEffect, useState } from 'react';
import { BiAward, BiBriefcase, BiChart, BiCheck, BiCheckCircle, BiChevronDown, BiChevronRight, BiErrorCircle, BiInfoCircle, BiMessageSquare, BiPlus } from 'react-icons/bi';
import { BsInfo } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { GiLightBulb } from 'react-icons/gi';
import { LuFileCode2, LuGlobe, LuLinkedin, LuMail, LuMapPin, LuPhone, LuUser } from 'react-icons/lu';
import { loadUserFullProfileDetails } from '../../../services/userServices';
import { toast } from 'react-toastify';
import { Certificates, Education, Experience, Skills, UserFullProfileData } from '../../../types/entityTypes';
import { Controller, useForm } from 'react-hook-form';
import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Modal, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { analyzeResume } from '../../../services/resumeServices';
import { eachMinuteOfInterval } from 'date-fns';
import { AxiosError } from 'axios';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { MdAutoAwesome } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';

const GenerateFromProfile = () => {
  // Example state to manage selections
  const [isExperienceAdding, setIsExperienceAdding] = useState(false)
  const [isEducationAdding, setIsEducationAdding] = useState(false)
  const [isCertificateAdding, setIsCertificateAdding] = useState(false)
  const [isSkillAdding, setIsSkillAdding] = useState(false)

  const [personalInfoSectionIncluded, setPersonalInfoSectionIncluded] = useState(true)
  const [experienceSectionIncluded, setExperienceSectionIncluded] = useState(true)
  const [educationSectionIncluded, setEducationSectionIncluded] = useState(true)
  const [skillSectionIncluded, setSkillSectionInclude] = useState(true)
  const [certificateSectionIncluded, setCertificateSectionIncluded] = useState(true)

  const toggleExpAdding = () => setIsExperienceAdding(prv => !prv)
  const toggleEduAdding = () => setIsEducationAdding(prv => !prv)
  const toggleCertAdding = () => setIsCertificateAdding(prv => !prv)
  const toggleSkilAdding = () => setIsSkillAdding(prv => !prv)

  const [selectedSections, setSelectedSections] = useState({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    certificates: true
  });
  const [userFullProfileDetails, setUserFullProfileDetails] = useState<UserFullProfileData | null>(null)
  const [analyticsData, setAnalyticsData] = useState<{score: string, feedback: string, strength: string[], improvements: string[]} | null>(null)
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false)

  const openAnalysisModal = () => setIsAnalysisModalOpen(true)
  const closeAnalysisModal = () => setIsAnalysisModalOpen(false)



  type AddNewExperienceFormData = {
    jobRole: string
    organization: string
    isPresent: boolean
    startDate: string
    endDate?: string
    description?: string
  }

  type AddNewEducationFromData = {
    stream: string
    institution: string
    isPresent: boolean
    startYear: string
    endYear?: string
  }

  type AddNewCertificateFormData = {
    certificate: string
    issuedBy: string
  }

  type AddNewSkillFormData = {
    skill: string
  }


  const {reset: expReset, handleSubmit: expHandleSubmit, watch: expWatch, control: expControl, formState: {errors: expError}} = useForm<AddNewExperienceFormData>({defaultValues: {
    jobRole: '',
    organization: '',
    isPresent: false,
    startDate: '',
    endDate: '',
    description: ''
  }})

  const {reset: eduReset, handleSubmit: eduHandleSubmit, watch: eduWatch, control: eduControl, formState: {errors: eduError}} = useForm<AddNewEducationFromData>({defaultValues: {
    stream: '',
    institution: '',
    isPresent: false,
    startYear: '',
    endYear: ''
  }})

  const {reset: certReset, handleSubmit: certHandleSubmit, watch: certWatch, control: certControl, formState: {errors: certError}} = useForm<AddNewCertificateFormData>({defaultValues: {
    certificate: '',
    issuedBy: ''
  }})

  const {reset: skillReset, handleSubmit: skillHandleSubmit, watch: skillWatch, control: skillControl, formState: {errors: skillError}} = useForm<AddNewSkillFormData>({defaultValues: {
    skill: ''
  }})

  const isCurrentlyWorking = expWatch('isPresent')
  const isCurrentlyStudying = eduWatch('isPresent')

  useEffect(() => {
    async function LoadFullUserProfile(){
        try {
            const result = await loadUserFullProfileDetails()
            console.log('-- full details result from the backend --', result)
            if(result?.success){
                setUserFullProfileDetails(result.result)
            }
        } catch (error) {
            console.log('error', error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    LoadFullUserProfile()
  }, [])

  const addNewExperience = (data: AddNewExperienceFormData) => {
    const {jobRole, isPresent, startDate, endDate, organization, description} = data
    setUserFullProfileDetails((userData: UserFullProfileData | null) => {
        if(!userData) return null
        return {
            ...userData,
            experiences:[
                ...userData.experiences,
                {
                    jobRole: jobRole,
                    isPresent: isPresent,
                    organization: organization,
                    startDate: startDate,
                    endDate: !isPresent ? endDate : "",
                    jobType: "",
                    location: "",
                    workMode: "",
                    description: description
                }
            ]
        }
    })
    expReset({
        jobRole: '',
        organization: '',
        isPresent: false,
        startDate: '',
        endDate: '',
        description
    })
  }

  const addNewEducation = (data: AddNewEducationFromData) => {
    const {stream, institution, isPresent, startYear, endYear} = data
    setUserFullProfileDetails((userData: UserFullProfileData | null) => {
        if(!userData) return null
        return {
            ...userData,
            educations:[
                ...userData.educations,
                {
                    educationStream: stream,
                    institution: institution,
                    isPresent: isPresent,
                    startYear: startYear,
                    endYear: !isPresent ? endYear : startYear,
                    educationLevel: "",
                    location: "",
                }
            ]
        }
    })
    eduReset({
        stream: '',
        institution: '',
        isPresent: false,
        endYear: '',
        startYear: ''
    })
  }

  const addNewCertificate = (data: AddNewCertificateFormData) => {
    const {certificate, issuedBy} = data
    setUserFullProfileDetails((userData: UserFullProfileData | null) => {
        if(!userData) return null
        return {
            ...userData,
            certificates:[
                ...userData.certificates,
                {
                    name: certificate,
                    issuedOrganization: issuedBy,
                }
            ]
        }
    })
    certReset({
        certificate: '',
        issuedBy: ''
    })
  }

  const addNewSkill = (data: AddNewSkillFormData) => {
    const {skill} = data
    setUserFullProfileDetails((userData: UserFullProfileData | null) => {
        if(!userData) return null
        return {
            ...userData,
            skills:[
                ...userData.skills,
                {
                    skill: skill,
                    skillLevel: "",
                    skillType: ""
                }
            ]
        }
    })
    skillReset({
        skill: ''
    })
  }

  const resumeAnalyze = async () => {
    //organize the datas before sending
    const payLoad = {
      name: userFullProfileDetails?.name,
      headline: userFullProfileDetails?.headline,
      summary: userFullProfileDetails?.summary,
      email: userFullProfileDetails?.email,
      phone: userFullProfileDetails?.phone,
      location: userFullProfileDetails?.location,
      experiences: userFullProfileDetails?.experiences.map(({jobRole, organization, startDate, endDate}: Experience) => ({jobRole, organization, startDate, endDate})),
      educations: userFullProfileDetails?.educations.map(({educationStream: course, institution, startYear, endYear}: Education) => ({course, institution, startYear, endYear})),
      skills: userFullProfileDetails?.skills.map(({skill}: Skills) => ({skill})),
      certificates: userFullProfileDetails?.certificates.map(({name: certificate, issuedOrganization: issuedBy}: Certificates) => ({certificate, issuedBy}))
    }
    const targetRole = userFullProfileDetails?.headline
    try {
      const result = await toast.promise(
        analyzeResume(payLoad, targetRole as string),
        {
          pending: 'Analyzing...',
          success: 'Analyzed',
          error: {
            render(props) {
              const error = props.data as AxiosError<{message: string}>
              return error.response?.data.message || error.message || 'Something went wrong'
            },
          }
        }
      )
      if(result.success){
        console.log('- request from the backend -', result.result)
        setAnalyticsData(result.result)
        openAnalysisModal()
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <>
    <div className="min-h-screen bg-[#F1F5F9] px-5 py-15 md:p-8 font-sans text-slate-900">
      {/* Top Header Bar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">Generate resume from profile</p>
          <p className="text-slate-500 text-xs">
            Build your resume automatically from your profile data
          </p>
        </div>
        <div className='space-x-2'>
          <button onClick={resumeAnalyze} className='px-2 py-1 bg-white text-slate-500 rounded-md text-xs'>Analyze</button>
          <button className="bg-blue-500 text-white px-3 py-2 text-xs font-medium rounded-md">
            Generate Resume
        </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Selection Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resume Settings Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <p className="mb-3">Metadata</p>
            <div className="space-y-4">
              <div>
                <label className="!text-xs font-bold text-slate-600 block mb-1">Resume Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter resume name"
                />
              </div>
            </div>
          </div>

          {/* Data Sections */}
          <SectionWrapper
            sectionValueAddingStatus={true}
            onToggleSectionValueAdd={() => console.log('')}
            title="Personal Information"
            icon={<LuUser size={18} />}
            isChecked={personalInfoSectionIncluded}
            toggleCheck={() => setPersonalInfoSectionIncluded(prv => !prv)}
          >
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <BiCheckCircle size={14} className="text-emerald-500" />{' '}
                {userFullProfileDetails?.name}
              </div>
              <div className="flex items-center gap-2">
                <BiCheckCircle size={14} className="text-emerald-500" />{' '}
                {userFullProfileDetails?.email}
              </div>
              <div className="flex items-center gap-2">
                <BiCheckCircle size={14} className="text-emerald-500" />{' '}
                {userFullProfileDetails?.phone}
              </div>
              <div className="flex items-center gap-2">
                <BiCheckCircle size={14} className="text-emerald-500" />{' '}
                {`${userFullProfileDetails?.location?.city}, ${userFullProfileDetails?.location?.district}, ${userFullProfileDetails?.location?.state}, ${userFullProfileDetails?.location?.pincode}`}
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper
            sectionValueAddingStatus={isExperienceAdding}
            onToggleSectionValueAdd={toggleExpAdding}
            title="Work Experience"
            icon={<BiBriefcase size={18} />}
            isChecked={experienceSectionIncluded}
            toggleCheck={() => setExperienceSectionIncluded(prv => !prv)}
          >
            {isExperienceAdding && (
              <div className="border border-slate-300 rounded-lg p-5">
                <p className="text-sm text-slate-500 font-medium mb-3">Add Experience</p>
                <form onSubmit={expHandleSubmit(addNewExperience)}>
                  <FormControl fullWidth error={Boolean(expError.jobRole)}>
                    <label htmlFor="" className="!text-xs ">
                      Job Role
                    </label>
                    <Controller
                      control={expControl}
                      name="jobRole"
                      rules={{
                        required: { value: true, message: 'Job role can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{expError.jobRole?.message}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth className="!mt-2" error={Boolean(expError.organization)}>
                    <label htmlFor="" className="!text-xs ">
                      Organization
                    </label>
                    <Controller
                      control={expControl}
                      name="organization"
                      rules={{
                        required: { value: true, message: 'Organization can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{expError.organization?.message}</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <Controller
                      control={expControl}
                      name="isPresent"
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label="I am currently working here"
                        />
                      )}
                    />
                  </FormControl>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <FormControl fullWidth>
                      <label htmlFor="" className="!text-xs ">
                        Start date
                      </label>
                      <Controller
                        control={expControl}
                        name="startDate"
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <label htmlFor="" className="!text-xs ">
                        End date
                      </label>
                      <Controller
                        control={expControl}
                        name="endDate"
                        render={({ field }) => (
                          <input
                            disabled={isCurrentlyWorking}
                            type="date"
                            {...field}
                            className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                  <FormControl fullWidth className="!mt-2" error={Boolean(expError.description)}>
                    <label htmlFor="" className="!text-xs ">
                      Description
                    </label>
                    <Controller
                      control={expControl}
                      name="description"
                      rules={{
                        required: { value: true, message: 'description can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={5}
                          className="bg-gray-100 border outline-none border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        ></textarea>
                      )}
                    />
                    <FormHelperText>{expError.organization?.message}</FormHelperText>
                  </FormControl>
                  <div className="mt-2">
                    <button
                      className="text-xs font-medium bg-blue-500 text-white w-full p-2 rounded-md mt-2"
                      type="submit"
                    >
                      Add new experience
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="space-y-3">
              {userFullProfileDetails?.experiences &&
              userFullProfileDetails?.experiences.length > 0 ? (
                userFullProfileDetails?.experiences.map((exp: Experience) => (
                  <ItemCard
                    key={exp._id}
                    title={exp.jobRole}
                    subtitle={exp.organization}
                    date={`${moment(exp.startDate).format("DD-MM-YYYY")} - ${exp.endDate ? moment(exp.endDate).format("DD-MM-YYYY") : 'Present'}`}
                    description={exp.description}
                  />
                ))
              ) : (
                <div className="text-center mt-5">
                  <p className="text-xs">No experience</p>
                </div>
              )}
              {/* <ItemCard title="Senior Software Engineer" subtitle="Tech Innovators Inc." date="2021-03 - Present" />
              <ItemCard title="Junior Developer" subtitle="StartUp Hub" date="2019-01 - 2021-02" /> */}
            </div>
          </SectionWrapper>

          <SectionWrapper
            sectionValueAddingStatus={isEducationAdding}
            onToggleSectionValueAdd={toggleEduAdding}
            title="Education"
            icon={<FaGraduationCap size={18} />}
            isChecked={educationSectionIncluded}
            toggleCheck={() => setEducationSectionIncluded(prv => !prv)}
          >
            {isEducationAdding && (
              <div className="border border-slate-300 rounded-lg p-5">
                <p className="text-sm text-slate-500 font-medium mb-3">Add Education</p>
                <form onSubmit={eduHandleSubmit(addNewEducation)}>
                  <FormControl fullWidth error={Boolean(eduError.stream)}>
                    <label htmlFor="" className="!text-xs ">
                      Course
                    </label>
                    <Controller
                      control={eduControl}
                      name="stream"
                      rules={{
                        required: { value: true, message: 'education can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{eduError.stream?.message}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth className="!mt-2" error={Boolean(eduError.institution)}>
                    <label htmlFor="" className="!text-xs ">
                      Instituion
                    </label>
                    <Controller
                      control={eduControl}
                      name="institution"
                      rules={{
                        required: { value: true, message: 'Institution can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{eduError.institution?.message}</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <Controller
                      control={eduControl}
                      name="isPresent"
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label="I am currently studying here"
                        />
                      )}
                    />
                  </FormControl>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <FormControl fullWidth>
                      <label htmlFor="" className="!text-xs ">
                        Start year
                      </label>
                      <Controller
                        control={eduControl}
                        name="startYear"
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <label htmlFor="" className="!text-xs ">
                        End year
                      </label>
                      <Controller
                        control={eduControl}
                        name="endYear"
                        render={({ field }) => (
                          <input
                            disabled={isCurrentlyStudying}
                            type="date"
                            {...field}
                            className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className="mt-2">
                    <button
                      className="text-xs font-medium bg-blue-500 text-white w-full p-2 rounded-md mt-2"
                      type="submit"
                    >
                      Add new education
                    </button>
                  </div>
                </form>
              </div>
            )}
            {userFullProfileDetails?.educations &&
            userFullProfileDetails?.educations?.length > 0 ? (
              userFullProfileDetails?.educations.map((edu: Education) => (
                <ItemCard
                  key={edu._id}
                  title={edu.educationStream}
                  subtitle={edu.institution}
                  date={`${edu.startYear} - ${edu.endYear ? edu.endYear : 'Present'}`}
                />
              ))
            ) : (
              <div className="text-center">
                <p className="text-xs">No Education</p>
              </div>
            )}
            {/* <ItemCard title="BCA - Computer Application" subtitle="Marbaselious Institute of Science and Technology" date="2021-03 - Present" /> */}
          </SectionWrapper>

          <SectionWrapper
            sectionValueAddingStatus={isSkillAdding}
            onToggleSectionValueAdd={toggleSkilAdding}
            title="Skills"
            icon={<LuFileCode2 size={18} />}
            isChecked={skillSectionIncluded}
            toggleCheck={() => setSkillSectionInclude(prv => !prv)}
          >
            {isSkillAdding && (
              <div className="border border-slate-300 rounded-lg p-5">
                <p className="text-sm text-slate-500 font-medium mb-3">Add Skill</p>
                <form onSubmit={skillHandleSubmit(addNewSkill)}>
                  <FormControl fullWidth error={Boolean(skillError.skill)}>
                    <label htmlFor="" className="!text-xs ">
                      Skill
                    </label>
                    <Controller
                      control={skillControl}
                      name="skill"
                      rules={{
                        required: { value: true, message: 'Skill can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{skillError.skill?.message}</FormHelperText>
                  </FormControl>

                  <div className="mt-2">
                    <button
                      className="text-xs font-medium bg-blue-500 text-white w-full p-2 rounded-md mt-2"
                      type="submit"
                    >
                      Add new skill
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="flex gap-2 flex-wrap mt-3">
              {userFullProfileDetails?.skills && userFullProfileDetails?.skills.length > 0 ? (
                userFullProfileDetails?.skills.map((skill: Skills) => (
                  <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-medium">
                    {skill.skill}
                  </span>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-xs">No Skills</p>
                </div>
              )}

              {/* <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-medium">TypeScript</span> */}
            </div>
          </SectionWrapper>

          <SectionWrapper
            sectionValueAddingStatus={isCertificateAdding}
            onToggleSectionValueAdd={toggleCertAdding}
            title="Certificates"
            icon={<BiAward size={18} />}
            isChecked={certificateSectionIncluded}
            toggleCheck={() => setCertificateSectionIncluded(prv => !prv)}
          >
            {isCertificateAdding && (
              <div className="border border-slate-300 rounded-lg p-5">
                <p className="text-sm text-slate-500 font-medium mb-3">Add Certificate</p>
                <form onSubmit={certHandleSubmit(addNewCertificate)}>
                  <FormControl fullWidth error={Boolean(certError.certificate)}>
                    <label htmlFor="" className="!text-xs ">
                      Certificate Name
                    </label>
                    <Controller
                      control={certControl}
                      name="certificate"
                      rules={{
                        required: { value: true, message: 'certificate can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{certError.certificate?.message}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth className="!mt-2" error={Boolean(certError.issuedBy)}>
                    <label htmlFor="" className="!text-xs ">
                      Issued By
                    </label>
                    <Controller
                      control={certControl}
                      name="issuedBy"
                      rules={{
                        required: { value: true, message: 'issued by can not be emtpy' },
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className="bg-gray-100 border border-slate-200 p-2 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    />
                    <FormHelperText>{certError.issuedBy?.message}</FormHelperText>
                  </FormControl>

                  <div className="mt-2">
                    <button
                      className="text-xs font-medium bg-blue-500 text-white w-full p-2 rounded-md mt-2"
                      type="submit"
                    >
                      Add new certificate
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="space-y-2">
              {userFullProfileDetails?.certificates &&
              userFullProfileDetails?.certificates.length > 0 ? (
                userFullProfileDetails?.certificates.map((certificate: Certificates) => (
                  <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-3 border border-slate-100">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 accent-black w-4 h-4"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      <p>{certificate.name}</p>
                      <p className="!text-xs !font-normal">{certificate.issuedOrganization}</p>
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-xs">No Certificates</p>
                </div>
              )}
            </div>
          </SectionWrapper>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
          <WidgetBox
            title="Resume Tips"
            icon={<BsInfo size={18} className="text-blue-500" />}
            color="bg-[#E0F2FE] border-[#BAE6FD] text-blue-800"
          >
            <ul className="text-[11px] space-y-2 leading-relaxed">
              <li>• Use Action verbs to start bullet points</li>
              <li>• Quantify achievements with numbers</li>
              <li>• Keep it concise 1 - 2 page maximum</li>
              <li>• Tailor for each job application</li>
            </ul>
          </WidgetBox>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Inclusion Summary</h3>
            <div className="space-y-3">
              {personalInfoSectionIncluded && <InclusionRow label="Personal Info" />}
              {experienceSectionIncluded && <InclusionRow label="Work Experience" />}
              {educationSectionIncluded && <InclusionRow label="Educations" />}
              {skillSectionIncluded && <InclusionRow label="Skills" />}
              {certificateSectionIncluded && <InclusionRow label="Certifications" />}
            </div>
          </div>

          <WidgetBox
            title="How it works"
            icon={<GiLightBulb size={18} className="text-blue-500" />}
            color="bg-[#E0F2FE] border-[#BAE6FD] text-blue-800"
          >
            <ul className="text-[11px] space-y-2">
              <li>• Select sections and items to include</li>
              <li>• Choose your preferred template</li>
              <li>• AI formats and Optimize contents</li>
              <li>• Review and download your resume</li>
            </ul>
          </WidgetBox>

          <div className="bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] p-[20mm] text-[#111] leading-relaxed select-none pointer-events-none">
            {/* Header: Centered & Clean */}
            {personalInfoSectionIncluded && (
                <header className="text-center mb-8">
              <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
                {userFullProfileDetails?.name}
              </h1>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-700">
                <span className="flex items-center gap-1">
                  <LuMail size={10} /> {userFullProfileDetails?.email}
                </span>
                <span className="flex items-center gap-1">
                  <LuPhone size={10} /> {userFullProfileDetails?.phone}
                </span>
                <span className="flex items-center gap-1">
                  <LuMapPin size={10} />{' '}
                  {`${userFullProfileDetails?.location?.city}, ${userFullProfileDetails?.location?.district}, ${userFullProfileDetails?.location?.state}, ${userFullProfileDetails?.location?.pincode}`}
                </span>
                <span className="flex items-center gap-1">
                  <LuLinkedin size={10} /> linkedin.com/in/aswanth
                </span>
                <a className="flex items-center gap-1">
                  <LuGlobe size={10} /> aswanth.dev
                </a>
              </div>
            </header>
            )}

            <div className="space-y-6">
              {/* Professional Summary */}
              {personalInfoSectionIncluded && (
                <section>
                <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-2 tracking-widest">
                  Professional Summary
                </h2>
                <p className="text-[11px] text-justify">
                  Full-Stack Developer specializing in the MERN stack with a strong focus on Clean
                  Architecture and SOLID principles. Proven track record in building scalable web
                  applications and implementing complex features like real-time notifications and
                  AI-driven modules. Dedicated to high-performance code and professional software
                  patterns.
                </p>
              </section>
              )}

              {/* Work Experience */}
              {experienceSectionIncluded && (
                <section>
                <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-3 tracking-widest">
                  Experience
                </h2>
                <div className="space-y-4">
                  {userFullProfileDetails?.experiences?.length > 0 &&
                    userFullProfileDetails?.experiences.map((exp: Experience) => (
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-[12px] font-bold">{exp.jobRole}</h3>
                          <span className="text-[10px] font-bold">{moment(exp.startDate).format("MMM YYYY")} — {exp.isPresent ? "Present" : moment(exp.endDate).format("MMM YYYY")}</span>
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="text-[11px] font-bold italic text-slate-700">
                            {exp.organization}
                          </p>
                          <span className="text-[10px] text-slate-500 italic">{exp.jobType ? exp.jobType : "In-Office"}</span>
                        </div>
                        {/* <ul className="list-disc ml-4 text-[10px] text-slate-700 space-y-1">
                          <li>
                            Architected a professional job opportunity platform using React,
                            TypeScript, and Node.js.
                          </li>
                          <li>
                            Integrated Amazon S3 for secure file storage and Socket.io for real-time
                            user engagement.
                          </li>
                          <li>
                            Designed an ATS-compliant resume builder with AI optimization tools.
                          </li>
                        </ul> */}
                      </div>
                    ))}
                </div>
              </section>
              )}

              {/* Education */}
              {educationSectionIncluded && (
                <section>
                <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-3 tracking-widest">
                  Education
                </h2>
                <div className="space-y-2">
                    {userFullProfileDetails?.educations.length > 0 && (
                    userFullProfileDetails?.educations.map((edu: Education) => (
                        <>
                        <div>
                            <div className="flex justify-between items-baseline">
                            <h3 className="text-[11px] font-bold">{edu.educationStream}</h3>
                            <span className="text-[10px]">{edu.startYear} — {edu.isPresent ? "Present" : edu.endYear}</span>
                        </div>
                        <p className="text-[10px] text-slate-700">Brototype Institution</p>
                        </div>
                        </>
                    ))
                )}
                </div>
                
              </section>
              )}

              {/* Skills */}
              {skillSectionIncluded && (
                <section>
                <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-2 tracking-widest">
                  Skills
                </h2>
                <p className="text-[10px] text-slate-700">
                  {userFullProfileDetails?.skills.length > 0 && (
                    userFullProfileDetails?.skills.map((skill: Skills) => (
                        <>
                        {`${skill.skill}, `}
                        </>
                    ))
                  )}
                  {/* <span className="font-bold">Languages:</span> TypeScript, JavaScript (ES6+),
                  HTML5, CSS3
                  <br />
                  <span className="font-bold">Frameworks/Libraries:</span> React.js, Node.js,
                  Express.js, Tailwind CSS
                  <br />
                  <span className="font-bold">Database & Tools:</span> MongoDB, Amazon S3,
                  Socket.io, Git, Clean Architecture */}
                </p>
              </section>
              )}

              {/* Certifications */}
              {certificateSectionIncluded && (
                <section>
                <h2 className="text-xs font-bold uppercase border-b-2 border-slate-900 pb-0.5 mb-2 tracking-widest">
                  Certifications
                </h2>
                <ul className="text-[10px] text-slate-700 space-y-0.5">
                  {userFullProfileDetails?.certificates.length > 0 && (
                    userFullProfileDetails?.certificates.map((certificate: Certificates) => (
                        <li>• {certificate.name} - {certificate.issuedOrganization}</li>
                    ))
                  )}
                </ul>
              </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <AnalysisModal open={isAnalysisModalOpen} handleClose={closeAnalysisModal} data={analyticsData} />
    </>
  );
};

// --- Sub-Components ---

const SectionWrapper = ({ title, icon, children, isChecked, toggleCheck, sectionValueAddingStatus, onToggleSectionValueAdd }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2 text-slate-700">
        {icon}
        <p className="font-bold uppercase tracking-wide">{title}</p>
        {sectionValueAddingStatus
            ? <button onClick={onToggleSectionValueAdd} className='hover:bg-slate-100 p-1 rounded-sm'><BiChevronDown /></button>
            : <button onClick={onToggleSectionValueAdd} className='hover:bg-slate-100 p-1 rounded-sm'><BiPlus /></button>
        }
      </div>
      <input type="checkbox" onChange={toggleCheck} defaultChecked={isChecked} className="rounded border-slate-300 accent-black w-4 h-4" />
    </div>
    {children}
  </div>
);

const ItemCard = ({ title, subtitle, date, description = '' }) => (
  <div className="bg-slate-50 p-4 rounded-lg flex gap-4 items-start border border-slate-100">
    <input type="checkbox" defaultChecked className="mt-1 rounded border-slate-300 accent-black w-4 h-4" />
    <div>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
      <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{date}</p>
      <div className="mt-1">
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  </div>
);

const WidgetBox = ({ title, icon, children, color }) => (
  <div className={`${color} border rounded-xl p-5 shadow-sm`}>
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-sm font-bold">{title}</h3>
    </div>
    {children}
  </div>
);

const InclusionRow = ({ label }) => (
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="bg-black text-white px-3 py-1 rounded-md font-bold uppercase scale-90">Included</span>
  </div>
);


export function AnalysisModal({ open, handleClose, data }) {
  // data: { score: 85, feedback: "...", strength: [], improvements: [] }

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.18)',
  p: 0, // Header has internal padding
  outline: 'none',
  overflow: 'hidden',
  // High-end touch: Top accent border based on score
  borderTop: (theme) => `8px solid ${theme.palette.success.main}`, 
};

  return (
    <Modal open={open} onClose={handleClose} className='flex items-center justify-center'>
      <div className='rounded-md bg-white w-lg lg:w-lg max-h-[700px]'>
          <div className="header p-5 flex items-start justify-between rounded-md bg-gray-100">
            <div className='flex items-start gap-2'>
              <div>
                <MdAutoAwesome color='orange' size={25} />
              </div>
              <div>
                <p className='font-medium'>AI Diagnostic Report</p>
                <p className='text-xs text-gray-500'>Powerd by Aspiro Analytics Engine</p>
              </div>
            </div>
            <button onClick={handleClose}>
              <FiX />
            </button>
          </div>
          <div className="body mt-3 p-5 overflow-y-auto max-h-[500px]">
            <div className='flex flex-col items-center gap-2 bg-orange-50 rounded-lg p-5 ring-1 ring-orange-500'>
              <p className='text-sm text-gray-500'>ATS Score</p>
              <p className='font-bold text-2xl text-orange-500'>{data?.score} %</p>
              <div className='w-full h-3 rounded-full bg-gray-100'>
                <div className={`w-[${data?.score}%] bg-orange-500 h-full rounded-full`}></div>
              </div>
            </div>

            <div className='mt-3 bg-slate-50 rounded-lg p-5 ring-1 ring-slate-500'>
              <p className='text-sm font-medium'>Feedback</p>
              <p className='italic text-xs leading-relaxed mt-2 text-gray-500'>{data?.feedback}</p>
            </div>

            <div className="mt-5">
              <div className='flex items-center gap-2'>
                <div className='bg-green-100 w-8 h-8 flex items-center justify-center rounded-md'>
                  <BiCheckCircle color='green' />
                </div>
                <p className='uppercase font-medium text-green-600'>core strengths</p>
              </div>
              <div className="mt-3">
                <ul className='list-disc space-y-2'>
                  {data?.strength?.map((s: string, i: number) => (
                    <div className='p-3 bg-green-50 ring-1 ring-green-500 rounded-md'>
                      <li className='ms-5 text-xs text-gray-700'>{s}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <div className='flex items-center gap-2'>
                <div className='bg-orange-100 w-8 h-8 flex items-center justify-center rounded-md'>
                  <BiInfoCircle color='orange' />
                </div>
                <p className='uppercase font-medium text-orange-600'>improvements needed</p>
              </div>
              <div className="mt-3">
                <ul className='list-disc space-y-2'>
                  {data?.improvements?.map((s: string, i: number) => (
                    <div className='p-3 bg-orange-50 ring-1 ring-orange-500 rounded-md'>
                      <li className='ms-5 text-xs text-gray-700'>{s}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='p-5 bg-gray-100'>
            <p className='text-gray-600 text-xs'>Aspiro Analytics Engine - Update Real time</p>
          </div>
      </div>
    </Modal>
  );
}

export default GenerateFromProfile;