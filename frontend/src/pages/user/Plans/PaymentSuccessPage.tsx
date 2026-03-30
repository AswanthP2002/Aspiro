import React, { useEffect, useState } from 'react';
import { BiCalendar, BiCheckCircle, BiDownload, BiEnvelope } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSessionDetails } from '../../../services/planServices';
import { toast } from 'react-toastify';
import moment from 'moment';
// import { CheckCircle, Calendar, Mail, ArrowRight, Download } from 'lucide-react';

// amount: session.amount_total as number,
//       currency: session.currency as string,
//       email: session.customer_email as string,
//       planName: session.line_items?.data[0].description as string,
//       status: session.payment_status as string
const PaymentSuccessPage = () => {
  const [paymentDetails, setPaymentDetails] = useState<{amount: number, currency: string, email: string, planName: string, status: string, startingPeriod: string, endPeriod: string} | null>(null)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // This grabs the {CHECKOUT_SESSION_ID} Stripe sent back in the URL
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await getSessionDetails(sessionId as string)
        if(result?.success){
          setPaymentDetails(result.result)
        }
      } catch (error) {
        console.log(error)
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    }

    if(sessionId){
      fetchDetails()
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-[#e2f8e9] flex flex-col items-center justify-center p-4 font-sans">
      {/* Success Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-green-500 rounded-full p-2 mb-4">
          <BiCheckCircle className="text-white w-12 h-12" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">Payment Successful</h1>
        <p className="text-gray-600 mt-1">Welcome to Professional plan</p>
      </div>

      {/* Main Invoice Card */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 border border-gray-100">
        {/* Transaction Header */}
        <div className="flex justify-between items-start border-b border-dashed pb-6 mb-6">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Transaction ID</p>
            <p className="font-mono text-gray-700">{sessionId ? sessionId.slice(0, 15) : 'TXN17682757B2912'}</p>
          </div>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
            Paid
          </span>
        </div>

        {/* Plan Details */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xl font-bold text-gray-800">Professional Plan</p>
            <p className="text-gray-500 text-sm">Monthly Subscription</p>
          </div>
          <p className="text-xl font-bold text-gray-800 text-right">Rs. {paymentDetails?.amount}</p>
        </div>

        {/* Breakdown */}
        <div className="space-y-3 border-b pb-6 mb-6">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>Rs. {paymentDetails?.amount}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>GST (18%)</span>
            <span>Rs. {paymentDetails && paymentDetails.amount ? (paymentDetails.amount * 18) / 100 : 0}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg text-gray-400 uppercase tracking-wider font-medium">Grand Total</span>
          <span className="text-2xl font-black text-gray-900 font-mono italic">Rs. {paymentDetails && paymentDetails.amount ? ((paymentDetails.amount * 18) / 100) + paymentDetails.amount : 0}</span>
        </div>

        {/* Status Alerts */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <BiCalendar className="text-blue-500 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-blue-900 font-bold text-sm">Next billing date {moment(paymentDetails?.endPeriod).format("DD MM YYYY")}</p>
              <p className="text-blue-700 text-xs mt-1">
                Your subscription will not automatically renew unless you do. All features included in professional plan will be unavailable.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <BiEnvelope className="text-green-500 w-5 h-5 flex-shrink-0" />
            <p className="text-green-800 text-xs">
              Your subscription will not automatically renew unless you do. All features included in professional plan will be unavailable.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-2xl mt-6 space-y-3">
        <button 
          onClick={() => navigate('/profile/billings')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          Go to billing dashboard <BsArrowRight className="w-4 h-4" />
        </button>
        <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-lg flex items-center justify-center gap-2 border border-gray-200 transition-colors">
          Download Invoice <BiDownload className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;