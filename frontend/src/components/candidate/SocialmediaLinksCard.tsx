export default function SocialmediaLinks({data, removeLink} : any) {
    return(
        <div className="card flex justify-between gap-5 mt-2">
            <div className="link border rounded border-gray-300 w-full px-2 gap-10 py-1 flex items-center">
                {data?.domain?.includes('linkedin') ? <i className="fa-brands fa-linkedin"></i> : null}
                {data?.domain?.includes('facebook') ? <i className="fa-brands fa-facebook"></i> : null}
                {data?.domain?.includes('instagram') ? <i className="fa-brands fa-instagram"></i> : null}
                {data?.domain?.includes('twitter') ? <i className="fa-brands fa-twitter"></i> : null}
                <div className="border-l p-0 border-gray-300 px-2 w-full">
                    {/* <p className="text-xs text-gray-400">{data.url}</p> */}
                    <input type="text" disabled={true} className="text-xs text-gray-400 border-none w-full" value={data.url} />
                </div>
                {/* <div className="flex justify-end w-full">
                    <i className="fa-solid fa-pencil !text-xs cursor-pointer"></i>
                </div> */}
            </div>
            <button className="border border-gray-300 rounded p-1">
                <i onClick={removeLink} className="fa-solid fa-xmark-circle"></i>
                
            </button>
        </div>
    )
}