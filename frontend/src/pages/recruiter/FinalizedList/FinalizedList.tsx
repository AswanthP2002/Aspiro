import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getFinalizedShortlistData } from "../../../services/recruiterServices"

export default function FinalizedList(){
    const location = useLocation()
    const [list, setList] = useState([])
    const {jobId} = location.state || {}

    useEffect(() => {
        (async function(){
            const result = await getFinalizedShortlistData(jobId)
            setList(result.result)
        })()
    }, [jobId])
    return(
        <div className="container !px-10 !py-5">
            {
                list.length > 0 && (
                    <p>found some list</p>
                )
            }
        </div>
    )
}