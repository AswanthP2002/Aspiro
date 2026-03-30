import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { AiFillRocket } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { FiZap, FiCheck, FiX, FiChevronRight, FiSave, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPlan } from '../../../services/planServices';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const PlanConfiguration = () => {
  type AddPlanFormData = {
    planName: string
    planDescription: string
    badgeIcon: string
    monthlyPrice: string | number
    yearlyPrice: string | number
    isListed: boolean
    trialPeriod: string | number
    features: string[]
    recruiterProfile: boolean
    jobPosts: string | number
    directMessaging: boolean
    smartFilter: boolean
    pushJob: boolean
    jobApplications: string | number
    resumeBuilder: boolean
    resumeAnalyzer: boolean
    interviewPractice: boolean
    connectionRequests: string | number
    socialFeed: boolean
    jobRecommendation: boolean
  }

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<AddPlanFormData>({
    defaultValues: {
      planName: '',
      planDescription: '',
      badgeIcon: 'Lightning',
      monthlyPrice: '',
      yearlyPrice: '',
      jobPosts: '',
      directMessaging: false,
      connectionRequests: '',
      features: [],
      interviewPractice: false,
      isListed: true,
      jobApplications: '',
      jobRecommendation: false,
      pushJob: false,
      recruiterProfile: false,
      resumeAnalyzer: false,
      resumeBuilder: false,
      smartFilter: false,
      socialFeed: false,
      trialPeriod: 0
    }
  });

  const navigate = useNavigate()

  // Watch values for the Live Preview
  const formData = useWatch({ control });

  

  const featuresList = [
    { label: 'Unlock Aspiro Recruiter profile', key: 'recruiterProfile', isNumeric: false },
    { label: 'Job Posts (Recruiter)', key: 'jobPosts', isNumeric: true },
    { label: 'Direct Social Messaging', key: 'directMessaging',isNumeric: false },
    { label: 'Access to Smart Filter (Recruiter)', key: 'smartFilter', isNumeric: false },
    { label: 'Push your job on top (Recruiter)', key: 'pushJob', isNumeric: false },
    { label: 'Job Applications', key: 'jobApplications', isNumeric: true},
    { label: 'Resume Builder', key: 'resumeBuilder', isNumeric: false },
    { label: 'Resume Analyser & Feedback', key: 'resumeAnalyzer', isNumeric: false },
    { label: 'Interview Practice', key: 'interviewPractice', isNumeric: false },
    { label: 'Connection Requests', key: 'connectionRequests', isNumeric: true },
    { label: 'Activity in social feed', key: 'socialFeed', isNumeric: false},
    { label: 'Job Recommendations', key: 'jobRecommendation', isNumeric: false},

  ];

  const selectedIcon = watch('badgeIcon')

  const onSubmit = async (data) => {
    
    const booleaFeaturesKey = featuresList
      .filter(f => !f.isNumeric)
      .map(f => f.key)

    const activeFeatures = booleaFeaturesKey.filter(
      (key) => !!data[key as keyof AddPlanFormData]
    )

    const payLoad = {
      ...data,
      features: activeFeatures
    }

    const confirmResult = await Swal.fire({
      icon: 'question',
      title: `Create plan ${data.planName}?`,
      text: 'Are you sure to continue?. This plan will be visible to the users',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    if(!confirmResult.isConfirmed){
      return
    }else{
      try {
      const result = await toast.promise(
        createPlan(payLoad),
        {
          pending: 'Creating plan...',
          success: 'New plan created',
          error: {
            render(props) {
              const error = props.data as AxiosError<{message: string}>
              return error.response?.data.message|| error.message || 'something weent wrong'
            },
          }
        }
      )
      if(result.success){
        // toast.success(result.message)
        navigate('/admin/subscription/plans')
      }
    } catch (error) {
      console.log(error)
      // toast.error(error instanceof Error ? error.message : 'something went wrong')
    }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div>
          <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-xs p-2 hover:bg-slate-200 rounded-md'>
            <BsArrowLeft />
            <p>Back to plans</p>
          </button>
        </div>
        <header className="mb-8 mt-3">
          <h1 className="text-2xl font-bold">Plan Configuration</h1>
          <p className="text-gray-500 text-sm">Create and manage subscription tiers for your platform</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Information */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="font-semibold mb-1">General Information</h2>
              <p className="text-xs text-gray-400 mb-6">Basic details about the subscription plan</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Plan Name</label>
                  <input
                    {...register('planName', { required: {value: true, message: 'Plan name can not be empty'} })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="e.g. Starter"
                  />
                  <label htmlFor="" className='!text-xs !text-red-500'>{errors.planName?.message}</label>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">Plan Description</label>
                  <textarea 
                    {...register('planDescription', {required: {value: true, message: 'Plan description can not be empty'}})}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Briefly describe the plan..."
                  />
                  <label htmlFor="" className='!text-xs !text-red-500'>{errors.planDescription?.message}</label>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">Badge Icon</label>
                  <select 
                    {...register('badgeIcon')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="Lightning">Lightning</option>
                    <option value="Star">Star</option>
                    <option value="Rocket">Rocket</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="font-semibold mb-1">Pricing</h2>
              <p className="text-xs text-gray-400 mb-6">Set monthly and yearly pricing options</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Monthly Price</label>
                  <input 
                    type="number"
                    {...register('monthlyPrice', {required: {value: true, message: 'Monthly price cann not be empty'}, min: {value: 0, message: 'Enter a valid amount'}})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="" className='!text-xs !text-red-500'>{errors.monthlyPrice?.message}</label>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">Yearly Price</label>
                  <input 
                    type="number"
                    {...register('yearlyPrice', {required: {value: true, message: 'Yearly price can not be empty'}, min: {value: 0, message: 'Enter a valid amount'}})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="" className='!text-xs !text-red-500'>{errors.yearlyPrice?.message}</label>
                </div>
              </div>
            </section>

            {/* Feature Permissions */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="font-semibold mb-1">Feature Permissions</h2>
              <p className="text-xs text-gray-400 mb-6">Select which features are included in this plan</p>
              
              <div className="space-y-3">
                {featuresList.map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                    {feature.isNumeric ? (
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2">
                        <input 
                          type="number"
                          {...register(feature.key as keyof AddPlanFormData)}
                          className="w-16 bg-transparent py-1 text-sm outline-none text-right"
                        />
                        <span className="text-xs text-gray-400 ml-2">per month</span>
                      </div>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" {...register(feature.key as keyof AddPlanFormData)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Status & Settings */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="font-semibold mb-1">Status & Settings</h2>
              <div className="mt-4 flex items-center justify-between py-4 border-b border-gray-50">
                <div>
                  <p className="text-sm font-bold">Plan Status</p>
                  <p className="text-xs text-gray-400">Visible to all users</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400">Unlisted</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('isListed')} className="sr-only peer" />
                    <div className="w-12 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                  <span className="text-xs font-bold">Listed</span>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-bold mb-1.5">Trial Period (days)</label>
                <input 
                  type="text"
                  {...register('trialPeriod', {required: false, min: {value: 0, message: 'Please enter a valid number'}, pattern: {value: /^(0|[1-9]\d*)$/, message: 'Enter a valid number'}})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
                <label htmlFor="" className='!text-xs !text-red-500'>{errors.trialPeriod?.message}</label>
                <p className="text-[10px] text-gray-400 mt-2">Users can try this plan free for this many days</p>
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4">
              <button type="button" className="flex-1 py-3 border border-gray-200 rounded-lg font-bold text-gray-600 bg-white hover:bg-gray-50 transition">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-3 bg-slate-500 rounded-lg font-bold text-white flex items-center justify-center gap-2 hover:bg-slate-600 transition">
                <FiSave size={18} />
                Create Plan
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <span className="text-xs uppercase tracking-widest font-bold">Live Preview</span>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    {selectedIcon === 'Lightning' && (<FiZap fill="currentColor" size={24} />)}
                    {selectedIcon === 'Star' && (<FiStar fill='currentColor' size={24} />)}
                    {selectedIcon === 'Rocket' && (<AiFillRocket fill='currentColor' size={24} />)}
                  </div>
                  <h3 className="text-xl font-bold">{formData.planName || 'Plan Name'}</h3>
                  <p className="text-sm text-gray-400 mt-1 mb-6">{formData.planDescription || 'Plan description'}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold">${formData.monthlyPrice || '0'}</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>

                  <div className="w-full space-y-3 mb-8">
                    <p className="text-left text-xs font-bold text-gray-400 uppercase tracking-tight">Features included:</p>
                    {featuresList.map((f) => (
                      <div key={f.key} className="flex items-center gap-3 text-sm">
                        {formData[f.key] ? (
                          <FiCheck size={16} className="text-green-500 stroke-[3px]" />
                        ) : (
                          <FiX size={16} className="text-gray-300" />
                        )}
                        <span className={formData[f.key] ? "text-gray-700" : "text-gray-300"}>
                          {f.label} {f.isNumeric && formData[f.key] ? `(${formData[f.key]} per month)` : ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl text-xs font-bold mb-3">
                    {formData.trialPeriod}-day free trial included
                  </div>
                  
                  <button type="button" className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PlanConfiguration;