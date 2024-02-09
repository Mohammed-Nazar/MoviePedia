import { Outlet } from "react-router-dom";
import Nav from "../Navbar/nav";
import Footer from "../footer/footer";

export default function Layout(){
    return (
        <>
        <Nav/>
        <Outlet/>
        <Footer/>
        </>
    )
}