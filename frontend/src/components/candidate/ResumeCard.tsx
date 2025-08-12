export default function ResumeCard({ resumeData, deleteResume }: any) {
    return (
        <div className="col bg-gray-100 p-5 flex justify-between items-center">
            <div className="item flex gap-3 items-center">
                <i className="fa-solid fa-file"></i>
                <p className="text-sm">Resume</p>
            </div>
            <div className="relative group">
                <button type="button" className="group btn cursor-pointer"><i className="fa-solid fa-grip-vertical"></i></button>
                <div className="hidden group-hover:block absolute bg-white shadow bottom-0 right-0">
                    <div className="px-5 py-2"><p className="text-xs">View</p></div>
                    <div className="px-5 py-2"><p onClick={() => deleteResume(resumeData?._id, resumeData?.resumePublicIdCloudinary)} className="text-xs">Delete</p></div>
                </div>
            </div>
        </div>
    )
}