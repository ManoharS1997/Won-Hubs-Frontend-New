
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import { Outlet } from "react-router-dom";
// import axios from "axios";

import Header from "../src/modules/Header/pages/Header";
import SideNav from "../src/modules/Admin-Portal/SideNavBar/pages/SideNav";

export default function Layout() {
  const Navigate = useNavigate()

  useEffect(() => {
    // const cookieAccessToken = Cookies.get("accessToken");

    // console.log('checking the token...')
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOSTED_API_URL}/api/admin/token/validate`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("refreshToken")}`,
            },
          }
        );
        const data = await response.json()
        const accessToken = data?.accessToken;
        // console.log("access token :", data)
        if (data?.isLoggedIn === true) {
          // console.log("setting access token: ", accessToken);
          Cookies.set("accessToken", accessToken)
        } else {
          console.log("login status check failed, redirecting to login");
          Navigate("/");
        }
      } catch (error) {
        console.error("Error in login validation:", error);
      }
    };
    checkLoginStatus();

    const intervalId = setInterval(checkLoginStatus, 10 * 60 * 1000); // 2 minutes

    return () => clearInterval(intervalId);
  }, [Navigate]);

  return (
    <div id='main_container'>
      <Header />
      <div id='body_content'>
        <SideNav />
        <div id="content_container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}