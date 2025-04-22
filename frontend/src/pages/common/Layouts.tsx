import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export default function Layouts(){
    return(
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    )
}