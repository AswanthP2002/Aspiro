export default function Tile({tileData} : any){
    return(
        <div className="shadow flex gap-2 bg-white w-full p-4">
            <div className="p-4 hover:bg-blue-500 rounded-sm bg-blue-300 flex items-center justify-center">
                <i className={tileData.icon} style={{fontSize:'1.5rem'}}></i>
            </div>
            <div>
                <p className="font-bold">{tileData.title}</p>
                <p className="text-xs">{tileData.count}</p>
            </div>
        </div>
    )
}