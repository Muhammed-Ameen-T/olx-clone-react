import { useState } from 'react';
import { Search, Heart, MessageCircle, User, Menu, X, ChevronDown, MapPin, Grid, List ,Globe,Bell} from 'lucide-react';
import './index.css';
import olxLogo from './assets/olx-logo.png';
import bikewale from './assets/bikewale.svg'
import cartrade from './assets/cartrade.svg'
import cartrade_tech from './assets/cartrade_tech.svg'
import carwale from './assets/carwale.svg'
import mobility from './assets/mobility.svg'
import olx from './assets/olx.svg'
import playstore from './assets/playstore.webp'
import appstore from './assets/appstore.webp'

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: 'iPhone 13 Pro - Excellent Condition',
    price: 649.99,
    location: 'Brooklyn, NY',
    category: 'Electronics',
    image: '/api/placeholder/300/200',
    isFeature: true,
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Modern Sofa - Gray Fabric',
    price: 349.50,
    location: 'Queens, NY',
    category: 'Furniture',
    image: '/api/placeholder/300/200',
    isFeature: false,
    date: '5 days ago'
  },
  {
    id: 3,
    title: 'Mountain Bike - Trek 4500',
    price: 275.00,
    location: 'Manhattan, NY',
    category: 'Sports',
    image: '/api/placeholder/300/200',
    isFeature: false,
    date: 'Today'
  },
  {
    id: 4,
    title: '2015 Honda Civic - Low Mileage',
    price: 12500.00,
    location: 'Staten Island, NY',
    category: 'Vehicles',
    image: '/api/placeholder/300/200',
    isFeature: true,
    date: '1 day ago'
  },
  {
    id: 5,
    title: 'Gaming PC - RTX 3070, i9 Processor',
    price: 1299.99,
    location: 'Bronx, NY',
    category: 'Electronics',
    image: '/api/placeholder/300/200',
    isFeature: false,
    date: '3 days ago'
  },
  {
    id: 6,
    title: 'Designer Watch - Limited Edition',
    price: 499.00,
    location: 'Brooklyn, NY',
    category: 'Fashion',
    image: '/api/placeholder/300/200',
    isFeature: false,
    date: '1 week ago'
  }
];

// Sample categories
const CATEGORIES = [
  { id: 1, name: 'Electronics', icon: '🖥️' },
  { id: 2, name: 'Vehicles', icon: '🚗' },
  { id: 3, name: 'Property', icon: '🏠' },
  { id: 4, name: 'Furniture', icon: '🛋️' },
  { id: 5, name: 'Fashion', icon: '👕' },
  { id: 6, name: 'Sports', icon: '⚽' },
  { id: 7, name: 'Books', icon: '📚' },
  { id: 8, name: 'Pets', icon: '🐾' }
];

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Toggle */}
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

          {/* Location Dropdown */}
          <div className="hidden md:flex items-center mx-4 relative">
            <button
              className="flex items-center justify-between w-63 h-11.5 px-4 py-2 text-gray-700 hover:text-blue-600 border-2 border-black rounded"
              onClick={() => setLocationOpen(!locationOpen)}
            >
              <div className="flex items-center">
                <Globe size={20} className="mr-2" />
                <span>Location</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${locationOpen ? 'rotate-180' : ''}`}
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
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Kolkata
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Mumbai
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Delhi 
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Bangalore
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 hidden md:flex">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search for cars, mobiles, jobs and more..."
                className="w-full px-4 py-2.5 border-2 border-black  rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="absolute inset-y-0  right-0 flex items-center justify-center px-4  bg-[#002f34] text-white rounded-r">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Language Dropdown */}
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
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6h12z"/></svg>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-blue-600 flex items-center">
              <MessageCircle size={20} className="mr-1" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 flex items-center">
              <Heart size={20} className="mr-1" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 flex items-center">
              <Bell size={20} className="mr-1" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 flex items-center">
              <User size={20} className="mr-1" />
            </button>
            <button className="bg-white text-black px-6 py-1.5 rounded-full font-bold border-6 border-black hover:bg-gray-100 transition-all duration-300">
              + SELL
            </button>
          </div>
        </div>

        {/* Mobile Search */}
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

      {/* Mobile Menu */}
      
    </header>

      {/* Mobile Menu */}
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
            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <div className="flex items-center">
                <User size={20} className="mr-2" />
                <span>Account</span>
              </div>
            </button>
            <button className="block w-full text-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sell
            </button>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200">
  <div className="container mx-auto px-4 py-2"> {/* Reduced from py-4 to py-2 */}
    <div className="flex items-center space-x-6">
      {/* All Categories Dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium py-0.5 px-4 rounded-md hover:bg-gray-100 transition-all duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>All Categories</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-md w-56 z-10"> 
            <ul className="py-1 text-sm text-gray-700">
              {CATEGORIES.map(category => (
                <li key={category.id}>
                  <button className="w-full flex items-center px-4 py-0.5 hover:bg-gray-100"> 
                    <span>{category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Horizontal Category List */}
      <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
        {CATEGORIES.slice(0, 6).map(category => (
          <div
            key={category.id}
            className="flex flex-col items-center min-w-max cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-1 transition-all duration-200" 
          >
            <div className="text-sm font-medium text-gray-700 mt-0 whitespace-nowrap">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Featured Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SAMPLE_PRODUCTS.filter(product => product.isFeature).map(product => (
              <div key={product.id} className="bg-white rounded shadow hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-t" />
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    <Heart size={20} className="text-gray-400 hover:text-red-500" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                    FEATURED
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{product.title}</h3>
                  <p className="text-green-600 font-bold">${product.price.toLocaleString()}</p>
                  <div className="flex justify-between text-gray-500 text-sm mt-2">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {product.location}
                    </div>
                    <div>{product.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Listings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">All Listings</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4 bg-white p-4 rounded shadow">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <select className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Price (Any)</option>
                  <option>Below $100</option>
                  <option>$100 - $500</option>
                  <option>$500 - $1,000</option>
                  <option>$1,000+</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Sort By: Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Relevant</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Products Grid/List View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SAMPLE_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white rounded shadow hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-t" />
                    <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                      <Heart size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                    {product.isFeature && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{product.title}</h3>
                    <p className="text-green-600 font-bold">${product.price.toLocaleString()}</p>
                    <div className="flex justify-between text-gray-500 text-sm mt-2">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {product.location}
                      </div>
                      <div>{product.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {SAMPLE_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white rounded shadow hover:shadow-md transition-shadow flex">
                  <div className="relative w-40 h-32 flex-shrink-0">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-l" />
                    {product.isFeature && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{product.title}</h3>
                      <button>
                        <Heart size={20} className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    <p className="text-green-600 font-bold mt-1">${product.price.toLocaleString()}</p>
                    <div className="flex justify-between text-gray-500 text-sm mt-2">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {product.location}
                      </div>
                      <div>{product.date}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{product.category}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r">Prev</button>
              <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">1</button>
              <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">2</button>
              <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">3</button>
              <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">...</button>
              <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">10</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l">Next</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-8 ">
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3">Popular Locations</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-800">Kolkata</a></li>
              <li><a href="#" className="hover:text-gray-800">Mumbai</a></li>
              <li><a href="#" className="hover:text-gray-800">Chennai</a></li>
              <li><a href="#" className="hover:text-gray-800">Pune</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3">Trending Locations</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-800">Bhubaneshwar</a></li>
              <li><a href="#" className="hover:text-gray-800">Hyderabad</a></li>
              <li><a href="#" className="hover:text-gray-800">Chandigarh</a></li>
              <li><a href="#" className="hover:text-gray-800">Nashik</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3">About Us</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-800">Tech@OLX</a></li>
              <li><a href="#" className="hover:text-gray-800">OLX</a></li>
              <li><a href="#" className="hover:text-gray-800">Blog</a></li>
              <li><a href="#" className="hover:text-gray-800">Help</a></li>
              <li><a href="#" className="hover:text-gray-800">Sitemap</a></li>
              <li><a href="#" className="hover:text-gray-800">Legal & Privacy information</a></li>
              <li><a href="#" className="hover:text-gray-800">Vulnerability Disclosure Program</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-lg">📱</span>
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-lg">💻</span>
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-lg">📊</span>
              </a>
            </div>
            <div className="mt-3 flex flex-col items-center md:items-start space-y-2">
              <img src={playstore} alt="OLX" className="w-17 h-4 md:w-30 md:h-12 lg:w-36 lg:h-12" />
              <img src={appstore} alt="OLX" className="w-17 h-4 md:w-30 md:h-12 lg:w-36 lg:h-12" />
            </div>
          </div>
        </div>

        <div className="bg-[rgba(0,47,52,1)] text-white py-8 text-center m-0">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-20">
            <img src={cartrade_tech} alt="CarTrade Tech" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={olx} alt="OLX" className="w-12 h-8 md:w-20 md:h-12 lg:w-24 lg:h-16" />
            <img src={carwale} alt="CarWale" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={bikewale} alt="BikeWale" className="w-16 h-10 md:W-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={cartrade} alt="CarTrade" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={mobility} alt="Mobility" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
          </div>
          <p className="text-xs">© 2025 OLX Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;