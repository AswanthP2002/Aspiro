import React from "react";

export default function Tile({tileData} : {tileData: {title: string, count: number, icon: React.ReactNode}}){
    return(
        <div className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-5 cursor-pointer">
    
    {/* Icon Container with Glassmorphism feel */}
    <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
        {/* We can force the icon size here to keep it consistent */}
        {React.cloneElement(tileData.icon as React.ReactElement, { size: 26 })}
    </div>

    {/* Text Content */}
    <div className="flex flex-col">
        <p className="text-slate-900 font-bold text-lg group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {tileData.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-medium text-slate-500">
                {tileData.count}
            </p>
            {/* Adding a small "Live" badge or arrow makes it feel professional */}
            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Live
            </span>
        </div>
    </div>
</div>
    )
}