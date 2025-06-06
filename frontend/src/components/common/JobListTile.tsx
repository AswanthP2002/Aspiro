import defaultImage from '../../../public/default-img-instagram.png'



export default function JobListTile({data} : any){
    return(
        <>
        <div className="tile border border-gray-300 cursor-pointer rounded-sm p-3">
            <p className="font-semibold">{data.jobTitle}</p>
            <div className="flex gap-2 mt-3">
                <label htmlFor="" className="bg-green-100 text-green-400 rounded text-xs px-2">{data.jobType}</label>
                <p className="text-xs text-gray-300">Salary Rs.{data.minSalary} - Rs.{data.maxSalary}</p>
            </div>
            <div className="flex mt-4">
                    <div className="comapny flex gap-4">
                        <img src={defaultImage} style={{width:'30px', height:'30px'}} alt="" />
                        <div className="company">
                            <p className="font-semibold text-sm">{data.companyDetails.companyName}</p>
                            <p className="text-xs text-gray-300"><i className="fa-solid fa-location-dot !text-xs !tex-gray-300 me-2"></i>{data.location}</p>
                        </div>
                    </div>
                    
                </div>
        </div>
        </>
    )
}