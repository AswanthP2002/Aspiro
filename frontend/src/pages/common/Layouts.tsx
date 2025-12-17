import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export default function Layouts(){
    const logedUser = useSelector((state : any) => {
        return state.userAuth.user
    })
    return(
        <>
            {
                !logedUser
                    ? <Header />
                    : null
            }
                <Outlet />
            {/* <Footer /> */}
        </>
    )
}