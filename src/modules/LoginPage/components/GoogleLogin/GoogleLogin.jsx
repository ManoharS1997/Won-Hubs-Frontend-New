import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_APP_CLIENT_ID; // Replace with your Client ID

const GLogin = () => {
    const handleSuccess = (response) => {
        const userInfo = jwtDecode(response.credential);
        console.log("User Info:", userInfo);
    };

    const handleFailure = (error) => {
        console.log("Login Failed:", error);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div style={{ textAlign: "center" }}>
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GLogin;
