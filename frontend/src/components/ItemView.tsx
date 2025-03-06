import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from "./Footer";
import { 
  Heart, Share2, ArrowLeft, MessageCircle, MapPin, Clock, ChevronRight, ChevronLeft 
} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  category: string;
  image: string;
  description?: string;
  postedDate?: string;
  condition?: string;
  seller?: {
    name: string;
    memberSince: string;
    verifiedUser: boolean;
    responseRate: string;
    responseTime: string;
    otherListings: number;
    profileImg: string;
  };
  images?: string[];
  features?: { name: string; value: string }[];
  viewCount?: number;
  favoriteCount?: number;
  safety?: string[];
  similarItems?: { id: number; title: string; price: number; location: string; image: string }[];
}

const ItemViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const fetchedProduct: Product = {
          id: data.id,
          title: data.title,
          price: data.price,
          location: 'Brooklyn, NY',
          category: data.category,
          image: data.image,
          description: data.description || 'No description available.',
          postedDate: new Date().toLocaleDateString(),
          condition: 'Used - Excellent',
          seller: {
            name: 'Ameen',
            memberSince: 'April 2021',
            verifiedUser: true,
            responseRate: '98%',
            responseTime: 'Within 2 hours',
            otherListings: 7,
            profileImg: '/api/placeholder/50/50',
          },
          images: [data.image, '/api/placeholder/600/400', '/api/placeholder/600/400'],
          features: [
            { name: 'Brand', value: 'Unknown' },
            { name: 'Category', value: data.category },
          ],
          viewCount: 217,
          favoriteCount: 24,
          safety: ['Meet in a public place', 'Check the item before payment'],
          similarItems: [
            { id: 101, title: 'Similar Item 1', price: 499.99, location: 'Manhattan, NY', image: '/api/placeholder/150/100' },
            { id: 102, title: 'Similar Item 2', price: 599.00, location: 'Queens, NY', image: '/api/placeholder/150/100' },
          ],
        };

        setProduct(fetchedProduct);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-xl">{error || 'Product not found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Search Results</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded shadow relative">
              <div className="relative">
                <div className="h-96 overflow-hidden">
                  <img 
                    src={product.images![currentImageIndex]} 
                    alt={`Product image ${currentImageIndex + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
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
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {product.images!.map((img, index) => (
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
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Condition:</span>
                  <span>{product.condition}</span>
                </div>
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-gray-600 mr-2">{feature.name}:</span>
                    <span>{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Product Information Card */}
            <div className="bg-white rounded shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-black">{product.title}</h1>
                  <div className="text-3xl font-bold text-black">₹{product.price.toLocaleString()}</div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span className="mr-2">{product.location}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{product.postedDate}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={toggleFavorite}
                    className={`p-1 rounded ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                  >
                    <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button className="p-1 rounded text-gray-600 hover:text-blue-600">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  A
                </div>
                <div className="flex-1">
                  <div className="font-medium flex items-center">
                    {product.seller!.name}
                    <ChevronRight size={20} className="ml-67 text-black" />
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-black border border-black py-3 rounded flex items-center justify-center hover:bg-gray-100">
                <MessageCircle size={20} className="mr-2" />
                Chat with Seller
              </button>
            </div>

            {/* Posted In */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Posted In</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={20} className="mr-2" />
                <span>{product.location}</span>
              </div>
              <div className="h-32 bg-gray-200 rounded relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Map Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemViewPage;