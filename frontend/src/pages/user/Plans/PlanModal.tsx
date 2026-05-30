import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { FiCheck, FiStar, FiX, FiZap } from 'react-icons/fi';
import { PlanData } from '../../../types/entityTypes';
import {
  getPlansForUsers,
  subscribeFreePlan,
  subscribePaidPlan,
} from '../../../services/planServices';
import { toast } from 'react-toastify';
import { BsArrowLeft, BsLightning, BsRocket, BsStar } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [plansData, setPlansData] = useState<PlanData[]>([]);

  const navigate = useNavigate();

  const subscribePlan = async (planId: string, amount: number, name: string) => {
    console.log(planId, amount, name);
    if (!planId) return toast.warn('Can not subscribe to this plan');
    const confirmResult = await Swal.fire({
      icon: 'question',
      title: `Choose ${name}`,
      text: `Are you sure to continue with ${name} plan`,
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const container = Swal.getContainer();
        if (container) {
          container.style.zIndex = '999999';
        }
      },
    });
    if (!confirmResult.isConfirmed) return;
    if (amount === 0) {
      try {
        const result = await subscribeFreePlan(planId);
        // alert(result.message)
        if (result.success) {
          toast.success('subscribed');
          navigate('/feed');
          window.location.reload();
        }
      } catch (error) {
        console.log('error ', error);
        toast.error(error instanceof Error ? error.message : 'Something went wrong');
      }
    } else {
      try {
        const result = await subscribePaidPlan(planId);
        if (result.success && result.result) {
          toast.success('Subscribed');
          window.location.href = result.result;
        }
      } catch (error) {
        console.log(error);
        toast.error(error instanceof Error ? error.message : 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    async function fetchPlansData() {
      try {
        const result = await getPlansForUsers();
        if (result.success) {
          toast.success(result?.message);
          setPlansData(result?.result);
        }
      } catch (error) {
        console.log('errror', error);
        toast.error(error instanceof Error ? error.message : 'Something went wrong');
      }
    }
    fetchPlansData();
  }, []);

  return (
    // <Modal open={open} onClose={onClose} className="overflow-y-auto">
      
    // </Modal>
    <div className='w-full min-h-screen'>
      <div className="bg-gray-50 pt-5 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex w-full justify-start">
            <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-sm text-slate-700 hover:bg-gray-200 p-2 transition-color duration-300 rounded-md'>
              <BsArrowLeft />
              <p>Back</p>
            </button>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-b from-blue-400 to-indigo-600 bg-clip-text text-transparent my-2'>Choose your perfect plan</p>
          <p className="text-gray-700 text-sm">Get advanced features and make your goals even faster</p>

          {/* Toggle */}
          <div className="mt-8 flex justify-center items-center">
            <div className="relative flex bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full p-1 w-48 shadow-inner">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`${billingCycle === 'monthly' ? 'bg-white text-blue-600' : 'text-white'} 
              flex-1 py-1 text-sm font-medium rounded-full transition-all duration-200`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`${billingCycle === 'annually' ? 'bg-white text-blue-600' : 'text-white'} 
              flex-1 py-1 text-sm font-medium rounded-full transition-all duration-200`}
              >
                Annually
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {plansData.map((plan: PlanData) => (
            <div
              key={plan._id}
              className={`relative p-8 rounded-3xl ${plan.monthlyPrice > 300 ? "bg-gradient-to-br from-white to-yellow-50" : "bg-white"} transition-all duration-300 border-2 
            ${plan.monthlyPrice > 0 && plan.monthlyPrice < 300 ? 'border-blue-500 shadow-[0_0_30px_2px_rgba(100,0,200,0.1)] scale-105' : (plan.monthlyPrice > 300 ? "border-amber-400 shadow-[0_0_30px_2px_rgba(100,0,0,0.1)]" : 'border-slate-100 shadow-[0_0_30px_2px_rgba(100,0,200,0.1)]')}`}
            >
              {plan.monthlyPrice > 0 && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${plan.monthlyPrice > 200 ? "bg-gradient-to-br from-yellow-300 to-amber-500" : (plan.monthlyPrice > 100 && plan.monthlyPrice < 300 ? "bg-blue-500" : "")} text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
                  <FiStar size={14} fill="white" /> {plan.monthlyPrice > 300 ? "Elite" : "Most Popular"}
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div
                    className={`p-3 rounded-2xl inline-block mb-4 ${plan.monthlyPrice > 0 && plan.monthlyPrice < 300 ? 'bg-blue-600 text-white' : (plan.monthlyPrice > 300 ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-white" : 'bg-gray-100')}`}
                  >
                    {plan.badgeIcon === 'Star' && <BsStar />}
                    {plan.badgeIcon === 'Lightning' && <BsLightning />}
                    {plan.badgeIcon === 'Rocket' && <BsRocket />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{plan.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  ₹
                  {billingCycle === 'monthly'
                    ? plan.monthlyPrice.toLocaleString('en-IN')
                    : plan.yearlyPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-500">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              <button
                onClick={() => subscribePlan(plan._id as string, plan.monthlyPrice, plan.name)}
                className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mb-8
              ${plan.monthlyPrice > 0 && plan.monthlyPrice < 300 ? 'bg-blue-600 text-white hover:bg-blue-700' : (plan.monthlyPrice > 300 ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-[0_0_30px_2px_rgba(100,0,0,0.1)] text-white" : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50')}`}
              >
                Get started <span className="text-lg">→</span>
              </button>

              <div className="w-full space-y-3 mb-8 px-2">
                <p className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Features included:
                </p>

                {Object.keys(plan.featuresListed).map((f) => {
                  const rawValue = plan.featuresListed[f];

                  const isEnabled =
                    typeof rawValue === 'boolean'
                      ? rawValue
                      : rawValue && rawValue !== '' && rawValue !== '0';

                  if (f === 'isListed') return null;

                  return (
                    <div key={f} className="flex items-center gap-3 text-sm">
                      <div className="shrink-0">
                        {isEnabled ? (
                          <FiCheck size={18} className="text-blue-500 stroke-[3px]" />
                        ) : (
                          <FiX size={18} className="text-gray-300" />
                        )}
                      </div>

                      <span className={isEnabled ? 'text-gray-700 font-medium' : 'text-gray-400'}>
                        {f}
                        {typeof rawValue === 'string' && isEnabled && (
                          <span className="ml-1 text-gray-500 font-normal">
                            ({rawValue} per month)
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
