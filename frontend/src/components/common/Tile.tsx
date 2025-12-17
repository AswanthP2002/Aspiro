export default function Tile({tileData} : any){
    return(
        <div className="border border-gray-200 shadow-xs rounded-md hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out flex gap-4 bg-white w-full p-3 group hover:shadow-lg">
            <div className="p-4 bg-blue-600 rounded-md flex items-center justify-center">
                {tileData.icon}
            </div>
            <div>
                <p className="text-base">{tileData.title}</p>
                <p className="text-sm text-gray-500 mt-1">{tileData.count}</p>
            </div>
        </div>
    )
}