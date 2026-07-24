
import BouncingLoader from "./Bouncing.loader";

export default function PageLoader(){
    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <div>
                    <BouncingLoader />
                    {/* <p>Loading...</p> */}
                </div>
            </div>
        </>
    )
}