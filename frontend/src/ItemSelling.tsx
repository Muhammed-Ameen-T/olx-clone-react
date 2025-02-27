import { useState, useRef } from 'react';
import { 
  ArrowLeft, Camera, X, Info, Upload, Check, Smartphone, 
  ChevronDown, HelpCircle, MapPin
} from 'lucide-react';

const SellItemPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    condition: '',
    storage: '',
    color: '',
    description: '',
    price: '',
    location: '',
    name: '',
    phone: '',
    email: ''
  });

  // Image handling state
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);

  // Form validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);

  // Brand and model options
  const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Oppo', 'Vivo', 'Huawei', 'Motorola', 'Nokia'];
  const conditionOptions = ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'For Parts'];
  const storageOptions = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];
  const colorOptions = ['Black', 'White', 'Silver', 'Gold', 'Gray', 'Blue', 'Red', 'Purple', 'Yellow', 'Green', 'Other'];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true
      });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle form field blur for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, formData[name]);
  };

  // Validate a single field
  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch (name) {
      case 'title':
        if (!value) errorMessage = 'Title is required';
        else if (value.length < 10) errorMessage = 'Title must be at least 10 characters';
        else if (value.length > 70) errorMessage = 'Title must be less than 70 characters';
        break;
      case 'brand':
        if (!value) errorMessage = 'Brand is required';
        break;
      case 'model':
        if (!value) errorMessage = 'Model is required';
        break;
      case 'condition':
        if (!value) errorMessage = 'Condition is required';
        break;
      case 'price':
        if (!value) errorMessage = 'Price is required';
        else if (isNaN(value) || Number(value) <= 0) errorMessage = 'Price must be a positive number';
        break;
      case 'description':
        if (!value) errorMessage = 'Description is required';
        else if (value.length < 30) errorMessage = 'Description must be at least 30 characters';
        break;
      case 'location':
        if (!value) errorMessage = 'Location is required';
        break;
      case 'name':
        if (!value) errorMessage = 'Name is required';
        break;
      case 'phone':
        if (!value) errorMessage = 'Phone number is required';
        else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) errorMessage = 'Enter a valid 10-digit phone number';
        break;
      case 'email':
        if (!value) errorMessage = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) errorMessage = 'Enter a valid email address';
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return errorMessage === '';
  };

  // Validate all fields
  const validateForm = () => {
    const requiredFields = ['title', 'brand', 'model', 'condition', 'price', 'description', 'location', 'name', 'phone', 'email'];
    const newErrors = {};
    const newTouched = {};

    requiredFields.forEach(field => {
      newTouched[field] = true;
      const isValid = validateField(field, formData[field]);
      if (!isValid) {
        newErrors[field] = errors[field] || `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setTouched(newTouched);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // In a real app, you would send this data to your server
      console.log('Form is valid. Submitting data:', formData, images);
      
      // Simulating API call
      setTimeout(() => {
        alert('Your item has been listed successfully!');
        setIsSubmitting(false);
        // Reset form or redirect
      }, 1500);
    } else {
      setIsSubmitting(false);
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Image functions
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors(prev => ({
          ...prev,
          images: 'Image size should not exceed 10MB'
        }));
        return;
      }
      
      if (!file.type.match('image.*')) {
        setErrors(prev => ({
          ...prev,
          images: 'Please select an image file'
        }));
        return;
      }
      
      // Clear image errors
      if (errors.images) {
        setErrors(prev => ({
          ...prev,
          images: ''
        }));
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        // In a real app, you would integrate with a real cropper library
        // For this example, we're simulating the process
        setShowCropper(true);
        
        // After cropping (simulated), add the image
        setTimeout(() => {
          const newImages = [...images];
          newImages.push({
            id: Date.now(),
            src: reader.result,
            file: file
          });
          setImages(newImages);
          setShowCropper(false);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    if (newImages.length === 0) {
      setErrors(prev => ({
        ...prev,
        images: 'At least one image is required'
      }));
    }
  };

  const handleEditImage = (index) => {
    setCurrentImageIndex(index);
    setCropMode(true);
    // In a real app, this would open the cropper with the existing image
  };

  const simulateCrop = () => {
    // This is where you would apply the cropping
    // In a real app, this would use a cropping library
    setCropMode(false);
    setCurrentImageIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold ml-4">Sell Your Mobile Phone</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Images Section */}
            <div className="bg-white rounded shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Upload Photos</h2>
              <p className="text-gray-600 mb-4">Add up to 8 photos. First image will be the cover (max 10MB each).</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Image uploads */}
                {images.map((image, index) => (
                  <div key={image.id} className="relative aspect-square border rounded-lg overflow-hidden">
                    <img src={image.src} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => handleEditImage(index)}
                        className="bg-white rounded-full p-2 mx-1"
                      >
                        <Camera size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-white rounded-full p-2 mx-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Add image button */}
                {images.length < 8 && (
                  <div 
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
                    onClick={handleImageClick}
                  >
                    <Camera size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
              
              {errors.images && (
                <p className="text-red-500 text-sm mt-2">{errors.images}</p>
              )}
              
              <div className="flex items-center mt-4 text-sm text-gray-600">
                <Info size={16} className="mr-1" />
                <span>
                  Clear photos from multiple angles will help sell your item faster
                </span>
              </div>
            </div>
            
            {/* Item Details */}
            <div className="bg-white rounded shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Item Details</h2>
              
              {/* Title */}
              <div className="mb-4" data-error={errors.title && touched.title ? "true" : "false"}>
                <label htmlFor="title" className="block font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., Samsung Galaxy S22 Ultra 256GB - Excellent Condition"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.title && touched.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Include key details such as brand, model, color, and condition
                </p>
              </div>
              
              {/* Brand and Model in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Brand */}
                <div data-error={errors.brand && touched.brand ? "true" : "false"}>
                  <label htmlFor="brand" className="block font-medium mb-1">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded appearance-none focus:outline-none focus:ring-2 ${
                        errors.brand && touched.brand ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                    >
                      <option value="">Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                  </div>
                  {errors.brand && touched.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                  )}
                </div>
                
                {/* Model */}
                <div data-error={errors.model && touched.model ? "true" : "false"}>
                  <label htmlFor="model" className="block font-medium mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., iPhone 13 Pro, Galaxy S22"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                      errors.model && touched.model ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.model && touched.model && (
                    <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                  )}
                </div>
              </div>
              
              {/* Condition, Storage, Color */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Condition */}
                <div data-error={errors.condition && touched.condition ? "true" : "false"}>
                  <label htmlFor="condition" className="block font-medium mb-1">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded appearance-none focus:outline-none focus:ring-2 ${
                        errors.condition && touched.condition ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                    >
                      <option value="">Select Condition</option>
                      {conditionOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                  </div>
                  {errors.condition && touched.condition && (
                    <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
                  )}
                </div>
                
                {/* Storage */}
                <div>
                  <label htmlFor="storage" className="block font-medium mb-1">Storage</label>
                  <div className="relative">
                    <select
                      id="storage"
                      name="storage"
                      value={formData.storage}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Select Storage</option>
                      {storageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>
                
                {/* Color */}
                <div>
                  <label htmlFor="color" className="block font-medium mb-1">Color</label>
                  <div className="relative">
                    <select
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Select Color</option>
                      {colorOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-4" data-error={errors.description && touched.description ? "true" : "false"}>
                <label htmlFor="description" className="block font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  placeholder="Describe your phone's condition, any accessories included, reason for selling, etc."
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.description && touched.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                ></textarea>
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Min 30 characters. Include details about specifications, features, and condition.
                </p>
              </div>
            </div>
            
            {/* Price & Location */}
            <div className="bg-white rounded shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Price & Location</h2>
              
              {/* Price */}
              <div className="mb-4" data-error={errors.price && touched.price ? "true" : "false"}>
                <label htmlFor="price" className="block font-medium mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">$</span>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                      errors.price && touched.price ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                </div>
                {errors.price && touched.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Set a competitive price based on condition and market value
                </p>
              </div>
              
              {/* Location */}
              <div data-error={errors.location && touched.location ? "true" : "false"}>
                <label htmlFor="location" className="block font-medium mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Brooklyn, NY"
                    className={`w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                      errors.location && touched.location ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                </div>
                {errors.location && touched.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-white rounded shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              
              {/* Name */}
              <div className="mb-4" data-error={errors.name && touched.name ? "true" : "false"}>
                <label htmlFor="name" className="block font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.name && touched.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div data-error={errors.phone && touched.phone ? "true" : "false"}>
                  <label htmlFor="phone" className="block font-medium mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your phone number"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                      errors.phone && touched.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                {/* Email */}
                <div data-error={errors.email && touched.email ? "true" : "false"}>
                  <label htmlFor="email" className="block font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your email address"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                      errors.email && touched.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 text-gray-600 text-sm flex items-start">
                <HelpCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Your contact information will be shared with interested buyers. They will be able to message you through the platform or contact you directly.
                </span>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="bg-white rounded shadow p-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded text-white font-medium ${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">◌</span>
                    Publishing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Upload size={18} className="mr-2" />
                    Publish Listing
                  </span>
                )}
              </button>
              
              <p className="text-center text-gray-600 text-sm mt-4">
                By clicking "Publish Listing", you agree to our Terms of Use and Privacy Policy
              </p>
            </div>
          </form>
        </div>
      </main>
      
      {/* Image Cropper Modal (simulated) */}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Crop Image</h3>
              <button 
                type="button"
                onClick={() => setShowCropper(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="h-64 bg-gray-100 flex items-center justify-center mb-4">
              <div className="text-gray-500">
                <Camera size={48} className="mx-auto mb-2" />
                <p>Image Cropper Preview</p>
                <p className="text-sm">(This is a simulated interface)</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio(1)}
                  className={`px-3 py-1 border rounded text-sm ${
                    aspectRatio === 1 ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  }`}
                >
                  1:1
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio(4/3)}
                  className={`px-3 py-1 border rounded text-sm ${aspectRatio === 4/3 ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  }`}
                >
                  4:3
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio(16/9)}
                  className={`px-3 py-1 border rounded text-sm ${
                    aspectRatio === 16/9 ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  }`}
                >
                  16:9
                </button>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={simulateCrop}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Check size={16} className="inline mr-1" />
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Crop Edit Modal (simulated) */}
      {cropMode && currentImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Image</h3>
              <button 
                type="button"
                onClick={() => {
                  setCropMode(false);
                  setCurrentImageIndex(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="h-64 bg-gray-100 flex items-center justify-center mb-4 relative overflow-hidden">
              <img 
                src={images[currentImageIndex].src} 
                alt="Edit preview" 
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute inset-0 border-2 border-dashed border-blue-500 pointer-events-none"></div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio(1)}
                  className={`px-3 py-1 border rounded text-sm ${
                    aspectRatio === 1 ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  }`}
                >
                  1:1
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio(4/3)}
                  className={`px-3 py-1 border rounded text-sm ${
                    aspectRatio === 4/3 ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  }`}
                >
                  4:3
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio(16/9)}
                  className={`px-3 py-1 border rounded text-sm ${
                    aspectRatio === 16/9 ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  }`}
                >
                  16:9
                </button>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={simulateCrop}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Check size={16} className="inline mr-1" />
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellItemPage;