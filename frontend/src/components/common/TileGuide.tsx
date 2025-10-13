export default function TileGuide({data} : any){
    return(
        <>
        <div className="aspiro-guide-tile card hover:shadow-lg hover:-translate-y-1 transitio-all duration-200 easi-in-out flex flex-col justify-center items-center rounded-md p-5 w-full gap-5">
            <div className="bg-gradient-to-br shadow-lg hover:scale-110 transition from-blue-500 to-indigo-600 rounded-full w-[60px] h-[60px] flex justify-center items-center">
                <i className={`${data?.icon} !text-white`}></i>
            </div>
            <p className="text-lg font-semibold text-gray-900 mt-4 mb-2">{data?.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed text-center">{data?.description}</p>
        </div>
        </>
    )
}