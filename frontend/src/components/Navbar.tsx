  import { useState, useEffect, useContext } from "react";
  import { Search, Heart, MessageCircle, User, Menu, X, Bell, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  import olxLogo from "../assets/olx-logo.png";
  import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
  import {jwtDecode} from 'jwt-decode'
  import { ThemeContext } from "./ThemeContext";

  const GOOGLE_CLIENT_ID = "613444320769-3p6pn2q3gubgpfr6ultprb9brmmc88sb.apps.googleusercontent.com";

  interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (user: { name: string; phone?: string; googleId?: string; token?: string }) => void;
  }

  const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [step, setStep] = useState<"initial" | "phone" | "otp">("initial");
    const [formData, setFormData] = useState({ name: "", phone: "", otp: "" });
    const [error, setError] = useState("");
    const [carouselIndex, setCarouselIndex] = useState(0);

    const carouselItems = [
      { emoji: "🛒", text: "Help us become one of the safest place to buy and sell.", color: "black" },
      { emoji: "💰", text: "Close deals from the comfort of your home.", color: "black" },
      { emoji: "🤝", text: "Keep all your favourites in one place.", color: "black" },
    ];

    useEffect(() => {
      if (isOpen && step === "initial") {
        const interval = setInterval(() => {
          setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [isOpen, step]);

    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      if (!isOpen) {
        setStep("initial");
        setFormData({ name: "", phone: "", otp: "" });
        setError("");
        setCarouselIndex(0);
      }
    }, [isOpen]);

    const handleGoogleSuccess = async (credentialResponse: any) => {
      try {
        const decoded: { name: string,email:string } = jwtDecode(credentialResponse.credential); // Decode Google JWT
        const response = await fetch("http://localhost:5000/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: decoded.name,
            email:decoded.email,
            googleId: credentialResponse.credential,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          onLoginSuccess({ name: data.name, googleId: data.googleId, token: data.token });
          onClose();
        } else {
          setError(data.message || "Google login failed");
        }
      } catch (err) {
        setError("Network error");
        console.log(err);
      }
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const phoneRegex = /^\d{10}$/;
      if (!formData.name.trim()) {
        setError("Name is required");
        return;
      } else if (!phoneRegex.test(formData.phone)) {
        setError("Enter a valid 10-digit phone number");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/otp-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name, phone: formData.phone }),
        });
        const data = await response.json();
        if (response.ok) {
          setStep("otp");
          setError("");
        } else {
          setError(data.message || "Failed to send OTP");
        }
      } catch (err) {
        setError("Network error");
        console.log(err);
      }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.otp.length !== 6) {
        setError("Enter a valid 6-digit OTP");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formData.phone, otp: formData.otp }),
        });
        const data = await response.json();
        if (response.ok) {
          onLoginSuccess({ name: data.name, phone: data.phone, token: data.token });
          onClose();
        } else {
          setError(data.message || "Invalid OTP");
        }
      } catch (err) {
        setError("Network error");
        console.log(err);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError("");
    };

    const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
        <div className="bg-white rounded w-full max-w-md p-6 relative shadow-2xl shadow-black h-[32rem] flex flex-col justify-between">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>

          {step === "initial" && (
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-2xl font-bold text-blue-600 text-center mb-4">
                  <img src={olxLogo} alt="OLX Logo" className="w-12 h-7 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-center text-[#002f34] mb-6">Login to OLX</h2>
                <div className="relative h-32 flex items-center justify-center">
                  <button onClick={prevSlide} className="absolute left-2 text-gray-600 hover:text-[#002f34]">
                    <ChevronLeft size={28} />
                  </button>
                  <div className="text-center animate-fade-in">
                    <span className="text-5xl block mb-2">{carouselItems[carouselIndex].emoji}</span>
                    <span className={`text-sm font-semibold ${carouselItems[carouselIndex].color}`}>
                      {carouselItems[carouselIndex].text}
                    </span>
                  </div>
                  <button onClick={nextSlide} className="absolute right-2 text-gray-600 hover:text-[#002f34]">
                    <ChevronRight size={28} />
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <button
                  onClick={() => setStep("phone")}
                  className="w-full py-3 border-2 border-[#002f34] rounded text-[#002f34] font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue with Phone
                </button>
                <div className="flex items-center border-2 border-[#002f34] justify-center w-full">
                  <div className="w-full max-w-md">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError("Google login failed")}
                      theme="outline"
                      size="large"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>All your personal details are safe with us.</p>
                <p>
                  If you continue, you are accepting{" "}
                  <a href="#" className="text-[#002f34] hover:underline">OLX Terms and Conditions</a>{" "}
                  and{" "}
                  <a href="#" className="text-[#002f34] hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          )}

          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-2xl font-bold text-blue-600 text-center mb-4">
                  <img src={olxLogo} alt="OLX Logo" className="w-12 h-7 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-center text-[#002f34] mb-6">Enter Details</h2>
                <div className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number (10 digits)"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                  />
                </div>
              </div>
              <div className="space-y-6">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#002f34] text-white rounded-lg font-semibold hover:bg-[#004f54] transition-colors"
                >
                  Continue
                </button>
                <div className="text-center text-sm text-gray-500">
                  <p>All your personal details are safe with us.</p>
                  <p>
                    If you continue, you are accepting{" "}
                    <a href="#" className="text-[#002f34] hover:underline">OLX Terms and Conditions</a>{" "}
                    and{" "}
                    <a href="#" className="text-[#002f34] hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-2xl font-bold text-blue-600 text-center mb-4">
                  <img src={olxLogo} alt="OLX Logo" className="w-12 h-7 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-center text-[#002f34] mb-6">Verify OTP</h2>
                <p className="text-center text-gray-600 mb-6">
                  Enter the 6-digit OTP sent to {formData.phone}
                </p>
                <div className="space-y-6">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                  />
                </div>
              </div>
              <div className="space-y-6">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#002f34] text-white rounded-lg font-semibold hover:bg-[#004f54] transition-colors"
                >
                  Verify and Login
                </button>
                <div className="text-center text-sm text-gray-500">
                  <p>All your personal details are safe with us.</p>
                  <p>
                    If you continue, you are accepting{" "}
                    <a href="#" className="text-[#002f34] hover:underline">OLX Terms and Conditions</a>{" "}
                    and{" "}
                    <a href="#" className="text-[#002f34] hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  // Corrected Navbar component
  const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null); // Store user's name
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is logged in on mount
      const token = localStorage.getItem("token");
      const storedName = localStorage.getItem("userName");
      if (token && storedName) {
        setUserName(storedName);
      }
    }, []);

    const handleLoginSuccess = (user: { name: string; phone?: string; googleId?: string; token?: string }) => {
      console.log("Logged in user:", user);
      setUserName(user.name); // Set user's name
      if (user.token) {
        localStorage.setItem("token", user.token); // Store token if present
      }
      localStorage.setItem("userName", user.name); // Store name in localStorage
      if (user.googleId) {
        localStorage.setItem("googleId", user.googleId); // Store googleId if present
      }
      setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("googleId");
      setUserName(null);
      navigate("/");
    };

    const {theme,setTheme}  = useContext(ThemeContext)

    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <header className="bg-white shadow sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  className="md:hidden mr-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="text-2xl font-bold text-blue-600">
                  <img src={olxLogo} alt="OLX Logo" className="w-12 h-7" />
                </div>
              </div>
              <div className="hidden md:flex items-center mx-4 relative">
                <button
                  className="flex items-center justify-between w-64 h-11 px-4 py-2 text-gray-700 hover:text-blue-600 border-2 border-black rounded"
                  onClick={() => setLocationOpen(!locationOpen)}
                >
                  <div className="flex items-center">
                    <Search size={20} className="mr-2" />
                    <span>Location</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {locationOpen && (
                  <div className="absolute top-12 left-0 bg-white shadow-lg rounded-md w-56 py-2 z-10 border-2 border-black">
                    <ul className="text-sm text-gray-700">
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Kolkata</button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Mumbai</button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Delhi</button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Bangalore</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex-1 mx-4 hidden md:flex">
                <div className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search for cars, mobiles, jobs and more..."
                    className="w-full px-4 py-2.5 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button className="absolute inset-y-0 right-0 flex items-center justify-center px-4 bg-[#002f34] text-white rounded-r">
                    <Search size={20} />
                  </button>
                </div>
              </div>
              <div className="relative inline-block w-32 me-8">
                <select
                  className="block appearance-none w-full bg-transparent px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline font-bold"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="HINDI">HINDI</option>
                  <option value="ENGLISH">ENGLISH</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12l-6-6h12z" />
                  </svg>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={(()=>{
                    const newtheme = theme=='light'?'dark':'light';
                    setTheme(newtheme)
                  })} 
                  className="text-gray-700 hover:text-blue-600 flex items-center">
                    {theme=='light'?(
                      <Sun size={20} className="mr-1" />
                    ):(
                      <Moon size={20} className="mr-1" />
                    )}  
                </button>
                <button className="text-gray-700 hover:text-blue-600 flex items-center">
                  <MessageCircle size={20} className="mr-1" />
                </button>
                <button className="text-gray-700 hover:text-blue-600 flex items-center">
                  <Heart size={20} className="mr-1" />
                </button>
                <button className="text-gray-700 hover:text-blue-600 flex items-center">
                  <Bell size={20} className="mr-1" />
                </button>
                {userName ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-10 h-10 bg-violet-600 text-white rounded-full font-bold hover:bg-violet-700 transition-colors"
                    title={`Logout (${userName})`}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-gray-700 hover:text-blue-600 flex items-center"
                  >
                    <User size={20} className="mr-1" />
                    Login
                  </button>
                )}
                <button
                  onClick={() => navigate("/post")}
                  className="bg-white text-black px-6 py-1.5 md:px-4 md:py-1 md:text-sm rounded-full font-bold border-5 border-black hover:bg-gray-100 transition-all duration-300"
                >
                  <span className="font-extrabold">+</span> SELL
                </button>
              </div>
            </div>
            <div className="md:hidden pb-4 pt-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for cars, mobiles, jobs and more..."
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="absolute inset-y-0 right-0 flex items-center justify-center px-4 bg-black text-white">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg">
              <div className="px-4 py-2 space-y-2">
                <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  <div className="flex items-center">
                    <MessageCircle size={20} className="mr-2" />
                    <span>Chats</span>
                  </div>
                </button>
                <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  <div className="flex items-center">
                    <Heart size={20} className="mr-2" />
                    <span>Favorites</span>
                  </div>
                </button>
                <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  <div className="flex items-center">
                    <Bell size={20} className="mr-2" />
                    <span>Notification</span>
                  </div>
                </button>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  <div className="flex items-center">
                    <User size={20} className="mr-2" />
                    <span>Login</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/post")}
                  className="block w-full text-center px-3 py-2 bg-black text-white rounded-full"
                >
                  + Sell
                </button>
              </div>
            </div>
          )}
        </header>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </GoogleOAuthProvider>
    );
  };

  export default Navbar;