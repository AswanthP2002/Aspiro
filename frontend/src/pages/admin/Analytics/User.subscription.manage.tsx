import { useEffect, useState } from "react";
import { BiArrowBack, BiCalendar, BiEnvelope, BiRecycle } from "react-icons/bi";
import { BsLightning } from "react-icons/bs";
import { CgCreditCard } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { LuCheck, LuCircleCheck, LuPhone, LuUser, LuX } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { getUserInvoices, getUserSubscriptionDetails } from "../../../services/planServices";
import { InvoiceData, UserSubscriptionDetailsData } from "../../../types/entityTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import moment from "moment";

export default function UserSubscriptionManage(){
  const location = useLocation()
  const {userId} = location.state || {}

  const [userSubscriptionData, setUserSubscriptionData] = useState<UserSubscriptionDetailsData | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<InvoiceData[]>([])

  useEffect(() => {
    async function loadUserSubscriptionDetails(){
      try {
        const result = await getUserSubscriptionDetails(userId) as {success: boolean; message: string; result: UserSubscriptionDetailsData}
        setUserSubscriptionData(result.result)
        toast.success('Details fetched')
        const stripeCustomerId = result.result.subscriptionDetails.stripeCustomerId
        console.log('-- loging stripe customer id ---', stripeCustomerId)

        if(stripeCustomerId){
          toast.success(`Found stripe customer id ${stripeCustomerId}`)
          const result = await getUserInvoices(stripeCustomerId) as {success: boolean, message: string, result: InvoiceData[]}
          console.log('Result from the get invoices', result)
          setPaymentHistory(result.result)
          toast.success('Payment history loaded')
        }

        // if(result.result.subscriptionDetails.stripeCustomerId){
          
        // }
      } catch (error: unknown) {
        const err = error as AxiosError<{message: string}>
        const finalMessage = err.response?.data.message || err.message || 'Something went wrong'
        toast.error(finalMessage)
      }
    }

    if(userId){
      loadUserSubscriptionDetails()
    }
  }, [userId]) //Updated dependancy due to lint error, previously empty
  

    return (
      <>
        <div className="w-full min-h-screen p-5 lg:px-20 py-10 bg-gray-50">
          <button className="flex gap-2 items-center text-sm text-slate-700">
            <BiArrowBack />
            <p>Back</p>
          </button>
          <div className="grid grid-cols-1 gap-5 lg:gap-10 lg:grid-cols-2 my-5">
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white w-18 h-18 flex items-center justify-center rounded-lg shadow-xl shadow-blue-100">
                    <LuUser size={30} />
                  </div>
                  <p className="mt-2 text-lg font-bold tracking-wide">{userSubscriptionData?.name}</p>
                  <p className="mt-1 text-sm text-slate-800">UID : {userSubscriptionData?._id}</p>
                </div>
                <div className="mt-3">
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-xs text-slate-500">
                      <BiEnvelope size={15} />
                      <p>{userSubscriptionData?.email}</p>
                    </li>
                    <li className="flex gap-2 items-center text-xs text-slate-500">
                      <LuPhone size={15} />
                      <p>{userSubscriptionData?.phone}</p>
                    </li>
                    <li className="flex gap-2 items-center text-xs text-slate-500">
                      <FaLocationDot size={15} />
                      <p>{userSubscriptionData?.location}</p>
                    </li>
                    <li className="flex gap-2 items-center text-xs text-slate-500">
                      <BiCalendar size={15} />
                      <p>Joined : {moment(userSubscriptionData?.joinedAt).format("DD MMM YYYY")}</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <p className="uppercase text-slate-500 text-sm tracking-wide">Current plan</p>
                <div className="my-2 w-full rounded-lg shadow-xl p-3 bg-gradient-to-br from-blue-400 to-indigo-500">
                  <div className="flex items-center gap-2">
                    <BsLightning color="white" />
                    <p className="font-bold text-sm tracking-wide text-white">{userSubscriptionData?.planDetails.name}</p>
                  </div>

                  <p className=" text-white text-xs">
                    <span className="font-bold text-lg">Rs.{userSubscriptionData?.planDetails.monthlyPrice}</span>/ month
                  </p>
                  <p className="text-[.7rem] text-slate-300">Next billing: {moment(userSubscriptionData?.subscriptionDetails.currentPeriodEnds).format("DD MMM YYYY")}</p>
                </div>
                {/* <div className="mt-5 space-y-2">
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-200 text-xs p-3 bg-gradient-to-br from-blue-400 shadow-sm shadow-blue-100 to-indigo-500 rounded-lg text-white font-semibold tracking-wide">
                    <BsArrowUp />
                    <p>Upgrade Plan</p>
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 border-2 border-red-200 text-xs p-3 rounded-lg text-red-400 font-semibold tracking-wide">
                    <BsArrowDown />
                    <p>Downgrade Plan</p>
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-200 text-xs p-3 rounded-lg text-slate-400">
                    <p>Cancel Subscription</p>
                  </button>
                </div> */}
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <p className="uppercase text-slate-500 text-sm tracking-wide">plan features</p>
                <p>stripe customer id: {userSubscriptionData?.subscriptionDetails.stripeCustomerId}</p>
                <div className="mt-3 space-y-1">
                    {userSubscriptionData?.subscriptionDetails && userSubscriptionData.subscriptionDetails.features && Object.entries(userSubscriptionData?.subscriptionDetails?.features).map(([key]) => {
                      return(
                        <p className="flex items-center gap-2 text-slate-500 text-xs">
                                {userSubscriptionData.subscriptionDetails.features[key]
                                  ? <><LuCheck color="green" /> {key} {!isNaN(parseInt(userSubscriptionData.subscriptionDetails.features[key] as string)) ? userSubscriptionData.subscriptionDetails.features[key] : null}</>
                                  : <><LuX color="red" /> <p className="text-slate-300">{key}</p></>
                                }
                            </p>
                      )
                    })}
                </div>
              </div>
            </div>

            <div className="space-y-5">
                <div className="bg-white border border-slate-200 shadow-sm rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center gap-2">
                            <CgCreditCard color="blue" />
                            <p className="font-semibold text-slate-900 tracking-wide">Payment History</p>
                        </div>
                    </div>
                    <div className="w-full my-5">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-[1px_0_1px_0] border-slate-400">
                                        <th className="font-semibold text-sm text-slate-600 py-2 text-start ps-3">Invoice</th>
                                        <th className="font-semibold text-sm text-slate-600 py-2 text-start ps-3">Date</th>
                                        <th className="font-semibold text-sm text-slate-600 py-2 text-start ps-3">Amount</th>
                                        <th className="font-semibold text-sm text-slate-600 py-2 text-start ps-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.map((inv) => (
                                        <tr key={inv.id} className="border-b border-slate-200">
                                            <td className="text-xs ps-3 py-2 text-slate-500">{inv.id}</td>
                                            <td className="text-xs ps-3 py-2 text-slate-500">{inv.date as string}</td>
                                            <td className="text-xs ps-3 py-2 font-semibold text-slate-800">Rs.{inv.amount}</td>
                                            <td className="text-xs ps-3 py-2 text-slate-500">
                                                {inv.status === 'paid'
                                                  ? <>
                                                      <span className="flex items-center gap-1">
                                                        <LuCircleCheck />
                                                        <p>Success</p>
                                                      </span>
                                                    </>
                                                  : (inv.status === 'uncollectable'
                                                    ? <>
                                                      <span className="flex items-center gap-1">
                                                        <LuX />
                                                        <p>Failed</p>
                                                      </span>
                                                    </>
                                                    : null
                                                  )
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end px-2 pt-2">
                                <p className="text-[.7rem] text-slate-400">Showing 4 most recent payments</p>
                            </div>
                        </div>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center gap-2">
                            <BiRecycle color="blue" />
                            <p className="font-semibold text-slate-900 tracking-wide">Subscription History</p>
                        </div>
                        <div className="my-3">
                            {userSubscriptionData?.subscriptionMetaData && userSubscriptionData.subscriptionMetaData.length > 0 && userSubscriptionData?.subscriptionMetaData.map((data) => (
                                <div className="flex items-center justify-between px-2 py-3 hover:bg-slate-100 transition-color duration-300">
                                    <div className="flex items-center gap-2">
                                        <LuCircleCheck color="green" />
                                        <p className="text-xs">{data.action}</p>
                                    </div>
                                    <p className="text-[0.7rem] text-slate-400">{moment(data.date).format("DD MMM YYYY")}</p>
                                </div>
                            ))}

                            {userSubscriptionData?.subscriptionMetaData && userSubscriptionData.subscriptionMetaData.length === 0 && (
                              <p>No subscription data</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </>
    );
}