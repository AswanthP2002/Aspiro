import { useEffect, useState } from "react";
import JobVerticalCard from "../../components/common/JobVerticalCard";
import { getSavedJobs } from "../../services/candidateServices";

export default function SavedJobs(){
    const [savedJobs, setSavedJobs] = useState([])

    useEffect(() => {
        (async function(){
            const result = await getSavedJobs()
            setSavedJobs(result.jobs)
        })()
    }, [])
    return(
        <div className="container px-10 py-5">
            <p>Favorites ({savedJobs.length})</p>
            <section className="mt-10">
                {
                    savedJobs.length > 0
                        ? <JobVerticalCard jobData={savedJobs[0]} />
                        : <p className="text-center mt-10 text-gray-300">No saved jobs</p>
                }
                
            </section>
        </div>
    )
}