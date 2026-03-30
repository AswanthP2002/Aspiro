import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { BsLightning, BsPencilSquare, BsRocket, BsStar, BsTrash3 } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { TbBusinessplan, TbLayoutCards, TbPackage } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PlanData } from "../../../types/entityTypes";
import { adminDeletePlan, adminGetPlans, adminTogglePlanListing } from "../../../services/planServices";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export default function Plans(){
    const [loading, setLoading] = useState(false)
    const [plans, setPlans] = useState<PlanData[]>([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(1)

    const navigate = useNavigate()

    const navigateToAddPlanPage = () => {
        return navigate('/admin/subscription/plans/create')
    }

    const navigateToEditPlanPage = (data: PlanData) => {
        return navigate(`/admin/subscription/plans/edit/${data._id}`, {state: {editablePlanData: data}})
    }

    const togglePlanListing = async (planId: string, status: 'LIST' | 'UNLIST') => {
        if(!planId) return

        const confirmResult = await Swal.fire({
            icon: 'question',
            title: `Are you sure to ${status === 'LIST' ? 'list' : 'unlist'} this plan?`,
            showConfirmButton: true,
            confirmButtonText: `${status === 'LIST' ? 'List' : 'Unlist'}`,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        if(!confirmResult.isConfirmed) return

        try {
            const result = await adminTogglePlanListing(planId, status)
            if(result?.success){
                toast.success(result?.message)
                setPlans((plan: PlanData[]) => {
                    return plan.map((plan: PlanData) => {
                        if(plan._id === planId){
                            return {...plan, isActive: status === 'LIST', isListed: status === 'LIST'}
                        }else{
                            return plan
                        }
                    })
                })
            }
        } catch (error) {
            console.log('error occured', error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    const deletePlan = async (planId: string) => {
        if(!planId) return toast.warn('Can not delete plan now')
        const confirmResult = await Swal.fire({
            icon: 'warning',
            title: 'Delete Plan?',
            text: `Are you sure to delete this plan?. This plan will be removed and hidden from the new users. 
                But exiting users with this plan can continue with this plan until their next billing cycle. Do you want to continue?
            `,
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        if(!confirmResult.isConfirmed) return

        try {
            const reuslt = await toast.promise(
                adminDeletePlan(planId),
                {
                    pending: 'Deleting plan...',
                    success: 'Plan deleted succesefully',
                    error:{
                        render(props) {
                            const error = props.data as AxiosError<{message: string}>
                            return error.response?.data.message || error.message || 'something went wrong'
                        },
                    }
                }
            )

            if(reuslt.success){
                setPlans((plans: PlanData[]) => plans.filter((plan: PlanData) => plan._id !== planId))
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    useEffect(() => {
        async function loadSubscriptionPlans(){
            setLoading(true)
            try {
                const result = await adminGetPlans(page, limit)
                if(result?.success){
                    setPlans(result.result.plans)
                    setTotalPages(result.result.totalPages)
                }
            } catch (error: unknown) {
                console.log('error occured', error)
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        loadSubscriptionPlans()
    }, [page, limit])

    return(
        <>
            <div className="px-5 py-10 lg:p-10">
                <div className="header flex justify-between items-center">
                    <div>
                        <p className="font-bold text-xl">Plan Configuration</p>
                        <p className="text-xs text-slate-500 font-medium">Create and manage subscription tires for your platform</p>
                    </div>
                    <div>
                        <button onClick={navigateToAddPlanPage} className="text-xs flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md">
                            <FaPlus />
                            <p>Create new plan</p>
                        </button>
                    </div>
                </div>
                <div className="body mt-10">
                    <div className="bg-white w-full border border-slate-200 rounded-lg p-5">
                        <p className="font-medium text-slate-600">Existing plans</p>
                        <p className="text-xs mt-2 text-gray-700">Manage your current subscription tires</p>
                        {loading
                            ? <>
                                <div>
                                    <Skeleton height={50} />
                                    <Skeleton sx={{marginTop: '-10px'}} height={50} />
                                    <Skeleton sx={{marginTop: '-10px'}} height={50} />
                                    <Skeleton sx={{marginTop: '-10px'}} height={50} />
                                    <Skeleton sx={{marginTop: '-10px'}} height={50} />
                                </div>
                              </>
                            : <>
                                {plans.length > 0 && (
                            <table className="w-full mt-5">
                            <thead>
                                <tr>
                                    <th className="font-medium text-sm py-3 px-2 text-start text-slate-600">Plan Name</th>
                                    <th className="font-medium text-sm py-3 px-2 text-start text-slate-600">Monthly Price</th>
                                    <th className="font-medium text-sm py-3 px-2 text-start text-slate-600">Yearly Price</th>
                                    <th className="font-medium text-sm py-3 px-2 text-start text-slate-600">Status</th>
                                    <th className="font-medium text-sm py-3 px-2 text-start text-slate-600">Trial Period</th>
                                    <th className="font-medium text-sm py-3 px-2 text-start text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map((plan: PlanData, index: number) => (
                                        <>
                                            <tr key={plan._id} className="border-t border-slate-300">
                                                <td className="py-4 px-2 text-xs">
                                                    <div className="flex items-center gap-2">
                                                        {plan.badgeIcon === 'Lightning' && <BsLightning />}
                                                        {plan.badgeIcon === 'Rocket' && <BsRocket />}
                                                        {plan.badgeIcon === 'Star' && <BsStar />}
                                                        <p>{plan.name}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-xs">
                                                    <div className="flex items-center gap-center">
                                                        <BiRupee />
                                                        {plan.monthlyPrice}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-xs">
                                                   <div className="flex items-center gap-center">
                                                        <BiRupee />
                                                        {plan.yearlyPrice}
                                                    </div> 
                                                </td>
                                                <td className="py-4 px-2 text-xs">
                                                    <div className="flex items-center gap-2">
                                                        {plan.isListed
                                                            ? <button onClick={() => togglePlanListing(plan._id as string, 'UNLIST')} className="text-xs font-medium bg-black text-white rounded-md px-2 py-1">Unlist</button>
                                                            : <button onClick={() => togglePlanListing(plan._id as string, 'LIST')} className="text-xs font-medium bg-black text-white rounded-md px-2 py-1">List</button>
                                                        }
                                                        <p className={`text-xs ${plan.isListed ? "text-green-600" : "text-red-600"}`}>{plan.isActive ? "Listed" : "Unlisted"}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-xs">
                                                    <p>{plan.trialPeriod}</p>
                                                </td>
                                                <td className="py-4 px-2 text-xs">
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => navigateToEditPlanPage(plan)}><BsPencilSquare /></button>
                                                        <button onClick={() => deletePlan(plan._id as string)}><BsTrash3 color="red" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                
                            </tbody>
                        </table>
                        )}
                              </>
                        }

                        {plans.length === 0 && (
                            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 mt-5 p-12 text-center">
  <div className="rounded-full bg-slate-50 p-4 text-slate-400">
    <TbPackage size={40} strokeWidth={1.5} />
  </div>
  <h3 className="mt-4 text-lg font-semibold text-slate-900">No plans available</h3>
  <p className="mt-1 text-sm text-slate-500">
    It looks like there are no subscription plans configured yet.
  </p>
  <button onClick={navigateToAddPlanPage} className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
    Create New Plan
  </button>
</div>
                        )}
                    <div className="flex justify-end space-x-2 mt-5">
                        <button disabled={page <= 1 ? true : false} className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-md px-2 py-1">Prev</button>
                        <button disabled={page >= totalPages ? true : false} className="text-xs font-medium text-white bg-blue-500 rounded-md px-2 py-1">Next</button>
                    </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}