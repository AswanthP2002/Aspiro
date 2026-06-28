import { CiCreditCardOff } from "react-icons/ci";

export default function PaymentFailedPage(){
    return(
        <>
            <div className="w-full min-h-screen bg-red-50 flex flex-col items-center justify-center">
                <div className="bg-white p-5 lg:p-10 border border-slate-200 rounded-lg shadow-sm flex flex-col items-center">
                    <CiCreditCardOff size={30} color="red" />
                    <p className="font-bold tracking-wide">Payment Failed</p>
                    <p className="my-3 text-xs text-gray-500">Your payment failed due to an unknown reason.</p>
                    <div className="flex flex-col items-center space-y-3">
                        <a href="/" className="text-xs font-medium text-blue-500 text-underline">Home</a>
                        <a href="/temp/pricing" className="text-xs font-medium text-blue-500 text-underline">Pricing</a>
                    </div>
                </div>
            </div>
        </>
    )
}