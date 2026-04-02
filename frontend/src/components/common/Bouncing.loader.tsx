import '../../index.css';

export default function BouncingLoader(){
    return(
        <>
            <div className="bouncing-loader w-fit">
                <div className='rounded-full'></div>
                <div className='rounded-full'></div>
                <div className='rounded-full'></div>
            </div>
        </>
    )
}