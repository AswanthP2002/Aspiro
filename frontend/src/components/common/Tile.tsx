export default function Tile({tileData} : any){
    return(
        <div className="shadow flex gap-4 bg-white w-full p-3 group hover:shadow-lg">
            <div className="p-4 group-hover:bg-blue-500 bg-blue-300 flex items-center justify-center">
                <i className={`${tileData.icon} group-hover:!text-white !text-blue-600`} style={{fontSize:'1.7rem'}}></i>
            </div>
            <div>
                <p className="font-bold">{tileData.title}</p>
                <p className="text-xs mt-2">{tileData.count}</p>
            </div>
        </div>
    )
}