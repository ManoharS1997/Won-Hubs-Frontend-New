import { Outlet } from "react-router-dom";
import Header from "../src/modules/Header/pages/Header";
import LeftNav from "../src/modules/UserPortal/LeftNav/pages/LeftNav";

export default function UserLayout() {
    return (
        <div id='main_container'>
            <Header />
            <div id='body_content'>
                <LeftNav />
                <div id="content_container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}