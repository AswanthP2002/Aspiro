import { industryTypes } from "../../assets/data/companyDetailsArrayData"

export default function JobFilterCandidateSide({ filter, filterType, handleFilterApply, openFilter = false }: any) {
    return (
        <>
            {
                openFilter && (
                    <div className={`absolute border border-gray-200 shadow-lg ${filterType === "Industry" ? "h-[300px] overflow-y-scroll" : null} mt-2 p-2 z-3 bg-white`}>
                        {/* Job industry filter */}
                        {filterType === 'Industry' && (
                            <ul>
                                <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">All</label></li>
                                {
                                    industryTypes.map((industry: string, index: number) => {
                                        return (
                                            <li key={index} className="list-none">
                                                <input type="checkbox"
                                                    checked={filter.industry.includes(industry)}
                                                    onChange={(event) => handleFilterApply(industry, event.target.checked)}
                                                    name="" id="" />
                                                <label htmlFor="" className="ms-2 !text-xs">{industry}</label>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )}

                        {/* Job type filter */}
                        {
                            filterType === 'Jobtype' && (
                                <ul>
                                    <li className="list-none">
                                        <input type="checkbox" 
                                            checked={filter.jobType.includes('Full-Time')} 
                                            onChange={(event) => handleFilterApply('Full-Time', event.target.checked)} 
                                            name="" id=""
                                        />
                                        <label htmlFor="" className="ms-2 !text-xs">Full-Time</label>
                                    </li>
                                    <li className="list-none">
                                        <input type="checkbox" 
                                            checked={filter.jobType.includes('Part-Time')} 
                                            onChange={(event) => handleFilterApply('Part-Time', event.target.checked)} 
                                            name="" id="" 
                                        />
                                        <label htmlFor="" className="ms-2 !text-xs">Part-Time</label>
                                    </li>
                                    <li className="list-none">
                                        <input type="checkbox" 
                                            checked={filter.jobType.includes('Internship')} 
                                            onChange={(event) => handleFilterApply('Internship', event.target.checked)} 
                                            name="" id="" />
                                        <label htmlFor="" className="ms-2 !text-xs">Internship</label>
                                    </li>
                                </ul>
                            )
                        }
                        {
                            filterType === 'Locationtype' && (
                                <ul>
                                    <li className="list-none">
                                        <input type="checkbox" 
                                            checked={filter.locationType.includes('In-Office')} 
                                            onChange={(event) => handleFilterApply('In-Office', event.target.checked)} name="" id=""
                                        />
                                        <label htmlFor="" className="ms-2 !text-xs">In-Office</label>
                                    </li>
                                    <li className="list-none">
                                        <input type="checkbox" 
                                            checked={filter.locationType.includes('Remote')} 
                                            onChange={(event) => handleFilterApply('Remote', event.target.checked)} name="" id=""
                                        />
                                        <label htmlFor="" className="ms-2 !text-xs">Remote</label>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}