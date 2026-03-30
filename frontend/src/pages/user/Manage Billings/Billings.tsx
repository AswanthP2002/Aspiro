import React, { useEffect, useState } from 'react';
import { BiCheckCircle, BiCreditCard, BiDownload, BiXCircle } from 'react-icons/bi';
import { FiAlertCircle } from 'react-icons/fi';
import { InvoiceData, PaymentMethodsStripeData, UserSubscriptionAndPlanDetailsData } from '../../../types/entityTypes';
import { getPaymentMethods, getUserInvoices, loadMySubscriptionDetails, manageSubscriptionPortal } from '../../../services/planServices';
import { toast } from 'react-toastify';
import moment from 'moment';

const SubscriptionPage = () => {
  const [subscriptionDetails, setSubscriptionDetails] = useState<UserSubscriptionAndPlanDetailsData | null>(null)
  const [invoices, setInvoices] = useState<InvoiceData[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodsStripeData | null>(null)
  const [loading, setLoading] = useState(true)

  const handleManagePayment = async () => {
    try {
        const result = await manageSubscriptionPortal()
        if(result.success){
            window.location.href = result.result.url
        }
    } catch (error) {
        console.log('error  ', error)
        toast.error(error instanceof Error ? error.message : 'Failed to open billing portal')
    }
  }

  useEffect(() => {
    async function fetchSubscriptionDetails(){
        try {
            const result = await loadMySubscriptionDetails()
            if(result.success){
                console.log('result after subscription details', result)
                setSubscriptionDetails(result.result)
                toast.success('Subscription details fetched')
                const invoicesResult = await getUserInvoices(result?.result.stripeCustomerId as string)
                const paymentMethodResult = await getPaymentMethods()
                setInvoices(invoicesResult.result)
                setPaymentMethod(paymentMethodResult.result)
            }
        } catch (error) {
            console.log('error', error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }
    fetchSubscriptionDetails()
  }, [])
  return (
    <>
    
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Subscriptions & Billing</h1>
        <p className="text-sm text-slate-500">Manage your subscription, billing, and payment methods</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Plan Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Plan Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-slate-800">{subscriptionDetails?.planDetails.name}</h2>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{subscriptionDetails?.status}</span>
              </div>
              <p className="text-lg font-semibold text-slate-700">Rs. {subscriptionDetails?.planDetails.monthlyPrice}<span className="text-sm font-normal text-slate-500">/month</span></p>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <FiAlertCircle className="text-blue-500 shrink-0" size={20} />
                <p className="text-sm text-blue-700">
                  Next billing date <span className="font-bold">{moment(subscriptionDetails?.currentPeriodEnd).format("MMM DD YYYY")}</span>. <br />
                  Your subscription will not automatically renew unless you do. All features included in professional plan will be unavailable.
                </p>
              </div>

              {/* Usage List */}
              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-slate-800">Plan usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subscriptionDetails && subscriptionDetails.planDetails && subscriptionDetails.planDetails.featuresListed && Object.keys(subscriptionDetails?.planDetails?.featuresListed).map((feature, i) => {
                    const key = feature
                    const curValue = subscriptionDetails?.planDetails.featuresListed[key]
                    if(curValue){
                        return <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <BiCheckCircle size={18} className="text-blue-500" fill="currentColor" fillOpacity={1} />
                      {feature} {typeof curValue === 'string' ? curValue : null}
                    </div>
                    }else{
                        return <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <BiXCircle size={18} className="text-red-500" fill="currentColor" fillOpacity={0.2} />
                      <p  className='text-slate-300'>{feature} {typeof curValue === 'string' ? curValue : null}</p>
                    </div>
                    }
})}
                </div>
              </div>

              <button className="mt-10 text-red-500 font-bold text-sm hover:underline">
                Cancel Subscription
              </button>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800">Payment Method</h2>
              <button onClick={handleManagePayment} className="text-sm font-semibold px-4 py-1.5 border rounded-lg hover:bg-slate-50">Manage</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-2 rounded text-white"><BiCreditCard size={24} /></div>
                <div>
                  <p className="font-bold text-slate-800">{paymentMethod?.brand} •••• {paymentMethod?.last4}</p>
                  <p className="text-xs text-slate-500">Expires {paymentMethod?.expMonth}/{paymentMethod?.expYear}</p>
                </div>
              </div>
              <span className="bg-slate-300 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Default</span>
            </div>
          </div>

          {/* Billing History Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800">Billing History</h2>
              {/* <button className="text-sm font-semibold px-4 py-1.5 border rounded-lg hover:bg-slate-50">Manage</button> */}
            </div>
            <div className="space-y-3">
              {invoices.map((inv: InvoiceData, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{inv.id}</p>
                    <p className="text-[11px] text-slate-500">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Paid</span>
                    <p className="font-bold text-sm">Rs. {inv.amount}</p>
                    <a href={inv.downloadUrl} target='_blank' rel='noreferrer'><BiDownload size={18} className="text-slate-400 cursor-pointer hover:text-slate-600" /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* Upgrade Card */}
          <div className="bg-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
               <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <BiCheckCircle size={24} />
               </div>
               <h2 className="text-xl font-bold mb-2">Upgrade to professional</h2>
               <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                 Get Unlimited Job postings and applying and other advanced tools and feature
               </p>
               <ul className="space-y-3 mb-8">
                 {["Advanced recruiter tools", "Smart Filter for candidate matching", "Advanced Resume Builder"].map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-sm">
                     <BiCheckCircle size={16} /> {item}
                   </li>
                 ))}
               </ul>
               <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition">
                 Upgrade to professional
               </button>
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-bold text-slate-800 mb-2">Need Help?</h2>
            <p className="text-sm text-slate-500 mb-6">Our support team is here to assist you with any billing or subscription questions.</p>
            <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SubscriptionPage;