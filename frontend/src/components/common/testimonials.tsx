import { useState } from "react"
import defaultImage from '/default-img-instagram.png'

export default function Testimonial({reviewData} : any){
    const stars = Array.from({length:5})
    return (
        <div className="card rounded-lg bg-white shadow p-5">
            <div className="flex gap-2">
            {
                stars.map((_, index) => {
                    return <>
                        {
                            reviewData.rating >= index
                                ? <i className="!text-yellow-500 fa-solid fa-star"></i>
                                : <i className="!text-gray-400 fa-solid fa-star"></i>
                        }
                    </>
                })
            }
            </div>
            <div>
                <p className="text-xs text-gray-400 mt-5">{reviewData?.comment}</p>
            </div>
            <div className="flex justify-between mt-6">
                <div className="flex gap-3 items-center">
                    <img src={defaultImage} className="img rounded-lg w-[45px] h-[45px]" alt="" />
                    <div>
                        <p className="text-xs font-semibold">{reviewData?.user}</p>
                        <p className="text-xs">{reviewData?.designation}</p>
                    </div>
                </div>
                <div><i className="fa-solid fa-quote-left !text-4xl !text-gray-300"></i></div>
            </div>
        </div>
    )
}