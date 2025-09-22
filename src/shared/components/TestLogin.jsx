import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const baseUrl = "http://3.110.222.15:3600";
  const navigation = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captcha: ""
  });

  // Generate new 6-digit CAPTCHA on load
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCaptchaCode(randomCode);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.captcha !== captchaCode) {
      setError("** Invalid security code. Please try again.");
      generateCaptcha(); // Reset CAPTCHA
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(`${baseUrl}/user-form`, {
        username: formData.username,
        password: formData.password
      });

      if (result.data === "failure") {
        setError("** Wrong Username or Password");
        generateCaptcha();
      } else {
        navigation("application-form", {
          state: { accesstoken: result.data.accessToken },
        });
      }
    } catch (err) {
      console.error(err);
      setError("** Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-between items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dzjuhiwxw/image/upload/f_auto,q_auto/v1/samples/zthveamo9qq8myeeuhws')",
      }}
    >
      <div className="flex flex-col items-center w-full h-[90%] px-4">
        <div className="bg-white flex flex-col shadow-[0_0_1rem_0.4rem_#ccc] w-3/9 p-4 mt-10 h-fit border border-gray-200">
          <img
            src="https://res.cloudinary.com/dzjuhiwxw/image/upload/f_auto,q_auto/v1/samples/f7umvuu0hxelsvwnvgba"
            alt="REC Logo"
            className="w-48 self-center "
          />
          <h2 className="text-center !text-[#00529B] font-bold mb-6 !text-xl ">
            Please Enter Login Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 gap-3 flex flex-col">
            <input
              type="text"
              name="username"
              placeholder="Email/Mobile No."
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 text-sm rounded-md focus:ring-2 focus:ring-[#00529B] focus:outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 text-sm rounded-md focus:ring-2 focus:ring-[#00529B] focus:outline-none"
              required
            />

            <div className="flex gap-3 items-center">
              <input
                type="text"
                name="captcha"
                placeholder="Enter Security Code"
                value={formData.captcha}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 text-sm rounded-md focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                required
              />
              <div className="bg-gray-200 h-fit text-black font-mono font-semibold text-lg px-4 py-1 rounded-md border border-gray-300">
                {captchaCode}
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full !bg-[#00529B] text-white font-semibold py-2 text-sm rounded-md hover:bg-[#003f7d] transition focus:ring-2 focus:ring-[#003f7d] focus:outline-none"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>

      <footer className="w-full h-[10%] bg-[#00529B] text-white text-xs text-center py-4">
        © 2018 REC Limited (Formerly Rural Electrification Corporation Limited). All Rights Reserved.
      </footer>
    </div>
  );
};

export default LoginUser;
