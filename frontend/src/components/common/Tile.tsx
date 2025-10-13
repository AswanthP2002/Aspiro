export default function Tile({tileData} : any){
    return(
        <div className="border border-gray-200 rounded hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out flex gap-4 bg-white w-full p-3 group hover:shadow-lg">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                {tileData.icon}
            </div>
            <div>
                <p className="text-lg font-semibold text-gray-800">{tileData.title}</p>
                <p className="text-sm text-gray-500 mt-1">{tileData.count}</p>
            </div>
        </div>
    )
}