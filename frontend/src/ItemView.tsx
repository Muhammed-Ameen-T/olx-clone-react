import { useState } from 'react';
import { 
  Heart, Share2, Flag, ArrowLeft, MessageCircle, Phone, 
  MapPin, Clock, Shield, Eye, ChevronRight, ChevronLeft 
} from 'lucide-react';

// Sample product data
const PRODUCT = {
  id: 1,
  title: 'iPhone 13 Pro - Excellent Condition',
  price: 649.99,
  description: 'Selling my iPhone 13 Pro in excellent condition. Only used for 10 months, no scratches or dents. Comes with original box, charger, and a premium case. Battery health is at 92%. Color: Graphite. Storage: 256GB. Unlocked for all carriers.',
  location: 'Brooklyn, NY',
  postedDate: '2 days ago',
  category: 'Electronics > Mobile Phones > Apple',
  condition: 'Used - Excellent',
  seller: {
    name: 'Alex Johnson',
    memberSince: 'April 2021',
    verifiedUser: true,
    responseRate: '98%',
    responseTime: 'Within 2 hours',
    otherListings: 7,
    profileImg: '/api/placeholder/50/50'
  },
  images: [
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ],
  features: [
    { name: 'Brand', value: 'Apple' },
    { name: 'Model', value: 'iPhone 13 Pro' },
    { name: 'Storage', value: '256GB' },
    { name: 'Color', value: 'Graphite' },
    { name: 'Battery Health', value: '92%' }
  ],
  viewCount: 217,
  favoriteCount: 24,
  safety: [
    'Meet in a public place',
    'Check the item before payment',
    'Pay only after inspecting the item'
  ],
  similarItems: [
    {
      id: 101,
      title: 'iPhone 12 Pro - Good Condition',
      price: 499.99,
      location: 'Manhattan, NY',
      image: '/api/placeholder/150/100'
    },
    {
      id: 102,
      title: 'iPhone 13 - Like New',
      price: 599.00,
      location: 'Queens, NY',
      image: '/api/placeholder/150/100'
    },
    {
      id: 103,
      title: 'Samsung Galaxy S22 Ultra',
      price: 699.50,
      location: 'Bronx, NY',
      image: '/api/placeholder/150/100'
    }
  ]
};

const ItemViewPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === PRODUCT.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? PRODUCT.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with back navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Search Results</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded shadow">
              <div className="relative">
                <div className="h-96 overflow-hidden">
                  <img 
                    src={PRODUCT.images[currentImageIndex]} 
                    alt={`Product image ${currentImageIndex + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {PRODUCT.images.map((img, index) => (
                  <div 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`cursor-pointer border-2 rounded ${currentImageIndex === index ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="h-16 w-24 object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded shadow p-6">
              <h1 className="text-2xl font-bold mb-2">{PRODUCT.title}</h1>
              <div className="text-3xl font-bold text-green-600 mb-4">${PRODUCT.price.toLocaleString()}</div>

              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span className="mr-4">{PRODUCT.location}</span>
                  <Clock size={16} className="mr-1" /> 
                  <span>Posted {PRODUCT.postedDate}</span>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={toggleFavorite}
                    className={`flex items-center p-2 rounded ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                  >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button className="flex items-center p-2 rounded text-gray-600 hover:text-blue-600">
                    <Share2 size={20} />
                  </button>
                  <button className="flex items-center p-2 rounded text-gray-600 hover:text-red-600">
                    <Flag size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Category:</span>
                    <span>{PRODUCT.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Condition:</span>
                    <span>{PRODUCT.condition}</span>
                  </div>
                  {PRODUCT.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-gray-600 mr-2">{feature.name}:</span>
                      <span>{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{PRODUCT.description}</p>
              </div>

              <div className="flex items-center text-gray-600 text-sm mt-6">
                <div className="flex items-center mr-6">
                  <Eye size={16} className="mr-1" />
                  <span>{PRODUCT.viewCount} views</span>
                </div>
                <div className="flex items-center">
                  <Heart size={16} className="mr-1" />
                  <span>{PRODUCT.favoriteCount} favorites</span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded shadow p-6">
              <div className="flex items-center mb-4">
                <Shield size={20} className="text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Safety Tips</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {PRODUCT.safety.map((tip, index) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </div>

            {/* Similar Items */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRODUCT.similarItems.map(item => (
                  <div key={item.id} className="border rounded p-2 hover:shadow transition-shadow cursor-pointer">
                    <img src={item.image} alt={item.title} className="w-full h-24 object-cover rounded mb-2" />
                    <h4 className="font-medium truncate">{item.title}</h4>
                    <p className="text-green-600 font-bold">${item.price.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm flex items-center mt-1">
                      <MapPin size={14} className="mr-1" />
                      {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Seller Info and Actions */}
          <div className="space-y-6">
            {/* Seller Information */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="flex items-center mb-4">
                <img 
                  src={PRODUCT.seller.profileImg} 
                  alt={PRODUCT.seller.name} 
                  className="w-12 h-12 rounded-full mr-4" 
                />
                <div>
                  <div className="font-medium flex items-center">
                    {PRODUCT.seller.name}
                    {PRODUCT.seller.verifiedUser && (
                      <span className="ml-1 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">Verified</span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm">Member since {PRODUCT.seller.memberSince}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-sm">
                    <div className="text-gray-600">Response Rate</div>
                    <div className="font-medium">{PRODUCT.seller.responseRate}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-600">Response Time</div>
                    <div className="font-medium">{PRODUCT.seller.responseTime}</div>
                  </div>
                </div>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  See all {PRODUCT.seller.otherListings} listings
                </a>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="bg-white rounded shadow p-6">
              <button className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center mb-3 hover:bg-blue-700">
                <MessageCircle size={20} className="mr-2" />
                Chat with Seller
              </button>
              {showPhone ? (
                <div className="w-full border border-green-500 text-green-700 bg-green-50 py-3 rounded flex items-center justify-center">
                  <Phone size={20} className="mr-2" />
                  +1 (555) 123-4567
                </div>
              ) : (
                <button 
                  onClick={() => setShowPhone(true)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <Phone size={20} className="mr-2" />
                  Show Phone Number
                </button>
              )}
              <div className="text-center text-gray-500 text-sm mt-3">
                Mention OLX when calling the seller to get a good deal
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Posted In</h3>
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-600 mr-2" />
                <span>{PRODUCT.location}</span>
              </div>
              <div className="mt-3 h-32 bg-gray-200 rounded relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Map Preview</span>
                </div>
              </div>
            </div>

            {/* Ad Placement */}
            <div className="bg-gray-200 rounded p-6 flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <p className="font-medium">Advertisement</p>
                <p className="text-sm">300x250</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 OLX Clone. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">Terms of Use</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ItemViewPage;