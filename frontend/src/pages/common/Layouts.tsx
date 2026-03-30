import { useSelector } from "react-redux";
// import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

interface RootState {
    userAuth:{
        user:{id: string, email: string}
    }
}


export default function Layouts(){
    const logedUser = useSelector((state : RootState) => {
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