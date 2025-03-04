import { useState } from 'react';
import {Heart, MapPin} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SubFooter from './subFooter';

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: 'iPhone 13 Pro - Excellent Condition',
    price: 649.99,
    location: 'Brooklyn, NY',
    category: 'Electronics',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Modern Sofa - Gray Fabric',
    price: 349.50,
    location: 'Queens, NY',
    category: 'Furniture',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: '5 days ago'
  },
  {
    id: 3,  
    title: 'Mountain Bike - Trek 4500',
    price: 275.00,
    location: 'Manhattan, NY',
    category: 'Sports',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: 'Today'
  },
  {
    id: 4,
    title: '2015 Honda Civic - Low Mileage',
    price: 12500.00,
    location: 'Staten Island, NY',
    category: 'Vehicles',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: '1 day ago'
  },
  {
    id: 5,
    title: 'Gaming PC - RTX 3070, i9 Processor',
    price: 1299.99,
    location: 'Bronx, NY',
    category: 'Electronics',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: '3 days ago'
  },
  {
    id: 7,
    title: 'Designer Watch - Limited Edition',
    price: 499.00,
    location: 'Brooklyn, NY',
    category: 'Fashion',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: '1 week ago'
  },
  {
    id: 8,
    title: 'Designer Watch - Limited Edition',
    price: 499.00,
    location: 'Brooklyn, NY',
    category: 'Fashion',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
    date: '1 week ago'
  },
  {
    id: 9,
    title: 'Designer Watch - Limited Edition',
    price: 499.00,
    location: 'Brooklyn, NY',
    category: 'Fashion',
    image: 'https://tse3.mm.bing.net/th?id=OIP.j4KdqaXpnhbN94WzVyHUhAHaE8&pid=Api&P=0&h=180',
    isFeature: true,
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

const Home = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2"> 
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
      <main className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-35 py-6">
        {/* Featured Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fresh recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SAMPLE_PRODUCTS.filter(product => product.isFeature).map(product => (
              <div
                key={product.id}
                className="bg-white rounded shadow hover:shadow-md transition-shadow w-11/12 mx-auto sm:w-full"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 sm:h-40 object-cover rounded-t"
                  />
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    <Heart size={20} className="text-gray-400 hover:text-red-500" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-1.5 py-0.25 text-xs rounded">
                    FEATURED
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-2xl text-black font-semibold">₹{product.price.toLocaleString()}</p>
                  <h3 className="font- truncate">{product.title}</h3>
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
        <div className="flex justify-center">
          <button className="text-black bg-white border  border-black px-4 py-2 rounded">
            Load More
          </button>
        </div>
      </main>

      <SubFooter/>
      <Footer/>
    </div>
  );
};

export default Home;