import { useEffect, useState } from "react";
import JobVerticalCard from "../../components/common/JobVerticalCard";
import { getSavedJobs } from "../../services/userServices";
import { FavoriteJob, JobDetails } from "../../types/entityTypes";
import { Notify } from "notiflix";

export default function SavedJobs(){
    const [savedJobs, setSavedJobs] = useState<FavoriteJob[] | null | undefined>(null)

    const onUnsaveJob = (jobId: string) => {
        setSavedJobs((prv: FavoriteJob[] | null | undefined) => {
            if(!prv) return null
            return prv.filter((job: FavoriteJob) => job.jobDetails._id !== jobId)
        })
    }

    useEffect(() => {
        (async function(){
            try {
                const result = await getSavedJobs()
                setSavedJobs(result.jobs)
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2500})
            }
        })()
    }, [])
    return(
        <div className="container px-5 py-5 lg:px-20 lg:py-10">
            <p>Favorites ({savedJobs?.length})</p>
            <section className="mt-10">
                {
                    savedJobs && savedJobs?.length > 0
                        ? (
                            savedJobs?.map((job: FavoriteJob, index: number) => (
                                <JobVerticalCard onUnsaveJob={onUnsaveJob} key={index} jobData={job} />
                            ))
                        )
                        : <p className="text-center mt-10 text-gray-300">No saved jobs</p>
                }
                
            </section>
        </div>
    )
}