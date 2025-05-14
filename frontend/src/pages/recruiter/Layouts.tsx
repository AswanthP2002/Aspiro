import Footer from "./../common/Footer/Footer";
import RecruiterHeader from "./Header/Header";
import { Outlet } from "react-router-dom";

export default function RecruiterLayouts(){
    return(
        <>
            <RecruiterHeader />
                <Outlet />
            <Footer />
        </>
    )
}