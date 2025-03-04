import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import playstore from "../assets/playstore.webp";
import appstore from "../assets/appstore.webp";

export default function SubFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-8">
        {/* Popular Locations */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold mb-3">Popular Locations</h3>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-gray-800">Kolkata</a></li>
            <li><a href="#" className="hover:text-gray-800">Mumbai</a></li>
            <li><a href="#" className="hover:text-gray-800">Chennai</a></li>
            <li><a href="#" className="hover:text-gray-800">Pune</a></li>
          </ul>
        </div>

        {/* Trending Locations */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold mb-3">Trending Locations</h3>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-gray-800">Bhubaneshwar</a></li>
            <li><a href="#" className="hover:text-gray-800">Hyderabad</a></li>
            <li><a href="#" className="hover:text-gray-800">Chandigarh</a></li>
            <li><a href="#" className="hover:text-gray-800">Nashik</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold mb-3">About Us</h3>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-gray-800">Tech@OLX</a></li>
            <li><a href="#" className="hover:text-gray-800">OLX</a></li>
            <li><a href="#" className="hover:text-gray-800">Blog</a></li>
            <li><a href="#" className="hover:text-gray-800">Help</a></li>
            <li><a href="#" className="hover:text-gray-800">Sitemap</a></li>
            <li><a href="#" className="hover:text-gray-800">Legal & Privacy Information</a></li>
            <li><a href="#" className="hover:text-gray-800">Vulnerability Disclosure Program</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaFacebook size={20} className="text-gray-600 hover:text-blue-600" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaInstagram size={20} className="text-gray-600 hover:text-pink-500" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaTwitter size={20} className="text-gray-600 hover:text-blue-400" />
            </a>
          </div>
          <div className="mt-3 flex flex-col items-center md:items-start space-y-2">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src={playstore} alt="Google Play Store" className="w-24 h-8 md:w-32 md:h-10" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={appstore} alt="App Store" className="w-24 h-8 md:w-32 md:h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}