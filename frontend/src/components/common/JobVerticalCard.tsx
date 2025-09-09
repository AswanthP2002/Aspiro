import Swal from 'sweetalert2'
import { unsaveJob } from '../../services/candidateServices'
import { isDateExpired } from '../../services/util/checkExpiry'
import getDaysLeftFromToday from '../../services/util/getDays'
import defaultProfile from '/default-img-instagram.png'
import {Document, Page, pdfjs} from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'
import { Link } from 'react-router-dom'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function JobVerticalCard({jobData} : any){
    console.log('job data fetched from the backend', jobData)

    const jobUnsave = async (jobId : string, id : string) => {
        const result = await unsaveJob(jobId, id)

        if(result?.success){
            Swal.fire({
                icon:'success',
                title:'Unsaved',
                showCancelButton:false,
                showConfirmButton:false,
                timer:2400
            }).then(() => {
                window.location.reload()
            })
        }else{
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:result?.message
            })
        }
    }

    return(
        <>
        <Link to={`/jobs/${jobData?.jobDetails?._id}`}>
        <div className="p-2 flex justify-between items-center border-b border-gray-300">
            <div className="job flex gap-4">
                <div className='logo'>
                    <img src={defaultProfile} style={{width:'50px',height:'50px'}} alt="" />
                </div>

                <div className="details">
                    <p className="text-sm">{jobData?.jobDetails?.jobTitle} <span className='bg-blue-200 rounded-full text-xs px-2'>{jobData?.jobDetails?.locationType}</span></p>
                    <div className="flex gap-5">
                        <p><span className='text-xs text-gray-400'>{jobData?.jobDetails?.location}</span> <span className='text-xs text-gray-400'>Rs. {jobData?.jobDetails?.minSalary} - Rs. {jobData?.jobDetails?.maxSalary}</span></p>
                    <p>
                        
                        {
                            
                            jobData?.jobDetails?.expiresAt < new Date() 
                                ? <>
                                   <i className="fa-solid fa-circle-xmark"></i> 
                                   <span className='text-xs text-red-500 ms-2'>Expired</span>
                                 </>
                                : <span className='text-xs text-green-500'>{getDaysLeftFromToday(jobData?.jobDetails?.expiresAt)} Days left</span>
                            
                        }
                        
                        
                    </p>
                    </div>
                </div>
            </div>
            <div className="actions">
                <i className="fa-solid fa-bookmark !text-black" onClick={() => jobUnsave(jobData?.jobId, jobData?._id)}></i>
            </div>
            <p>Pdf viewer</p>
            
        </div>
        </Link>
        
        </>
        
    )
}