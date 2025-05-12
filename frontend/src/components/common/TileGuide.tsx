export default function TileGuide({data} : any){
    return(
        <>
        <div className="aspiro-guide-tile card flex flex-col justify-center items-center rounded-md p-5 w-full gap-5">
            <div className="icon-wrapper bg-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
                <i className={data?.icon}></i>
            </div>
            <p className="card-title text-center font-medium font-poppins">{data?.title}</p>
            <p className="card-description text-xs text-gray-500 text-center">{data?.description}</p>
        </div>
        </>
    )
}