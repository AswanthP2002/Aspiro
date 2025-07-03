export default function FilterComponent({filterType, jobRole, closeFilter, candidateFilter, handleCandidateStatusSelect, handleJobRoleSelect} : any) {

    return (
        <div className="filter absolute bg-white shadow h-screen top-0 left-0 w-[270px]">
            <div className="flex justify-between p-3 items-center">
                <p className="text-blue-500">Filter</p>
                <i onClick={closeFilter} className="fa-solid fa-circle-xmark cursor-pointer"></i>
            </div>
            {
                filterType === 'candidate' && (
                    <div className="status p-3">
                        <p className="!text-sm mt-1 mb-2 text-gray-400">Candidate Status</p>
                        <ul>
                            <li className="list-none"><input type="checkbox" checked={candidateFilter?.status.includes(false)} onChange={(event) => handleCandidateStatusSelect(false, event.target.checked)} name="" id="" /> <label htmlFor="" className="!text-xs">Active</label></li>
                            <li className="list-none"><input type="checkbox" checked={candidateFilter?.status.includes(true)} onChange={(event) => handleCandidateStatusSelect(true, event.target.checked)} name="" id="" /> <label htmlFor="" className="!text-xs">Blocked</label></li>
                        </ul>
                        <div className="border border-gray-200 mt-3 w-full"></div>
                    </div>
                )
            }

            {
                filterType === 'candidate' && jobRole && (
                    <div className="job-role-type p-3 ">
                    <div className="max-h-[300px] overflow-y-scroll">
                        <p className="!text-sm mt-1 mb-2 text-gray-400">Candidate Role</p>
                        <ul>
                            {
                                jobRole.map((roles : any, index : number) => {
                                    return(
                                        <li key={index} className="list-none"><input type="checkbox" checked={candidateFilter.jobRole.includes(roles) ? true : false} onChange={(event) => handleJobRoleSelect(roles, event.target.checked)} name="" id="" /> <label htmlFor="" className="!text-xs">{roles}</label></li>
                                    )
                                })
                            }
                        </ul>
                        
                    </div>
                    <div className="border border-gray-200 mt-3 w-full"></div>
                    </div>
                )
            }
            {/* <div className="industries p-3 max-h-[300px] overflow-y-scroll">
                <p className="text-sm font-normal-text-gray-500">Industry</p>
                <ul>
                    {
                        industryTypes.map((industry: string, index: number) => {
                            return (
                                <li key={index}><input /><label>{}</label></li>
                            )
                        })
                    }
                </ul>
            </div> */}

            {/* <div className="job-type p-3">
                <p className="text-sm font-normal text-gray-500">Job Type</p>
                <div>
                    <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">Full-Time</label></li>
                    <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">Part-Time</label></li>
                    <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">Internship</label></li>
                </div>
            </div> */}

            {/* <div className="lcoation-type p-3">
                <p className="text-sm font-normal text-gray-500">Location Type</p>
                <div>
                    <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">In-Office</label></li>
                    <li className="list-none"><input type="checkbox" /><label htmlFor="" className="ms-2 !text-xs">Remote</label></li>
                </div>
            </div> */}

            {/* <div className="salary p-3">
                <p className="text-sm font-normal text-gray-500">Salary (Monthly)</p>
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label htmlFor="" className="!text-xs">Min Salary</label>
                        <input type="number" className="border border-gray-300 w-full" name="" id="" />
                    </div>

                    <div className="w-1/2">
                        <label htmlFor="" className="!text-xs">Max Salary</label>
                        <input type="number" className="border border-gray-300 w-full" name="" id="" />
                    </div>
                </div>
            </div> */}
        </div>
    )
}