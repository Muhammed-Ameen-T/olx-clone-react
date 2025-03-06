import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Camera, X, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";

interface FormData {
  category: string;
  subCategory: string;
  title: string;
  description: string;
  price: string;
  location: string;
  phone?: string;
  user?: string;
}

interface Errors {
  [key: string]: string | undefined;
  category?: string;
  subCategory?: string;
  title?: string;
  description?: string;
  price?: string;
  location?: string;
  phone?: string;
  user?: string;
  images?: string;
  submit?: string;
}

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djqsehax7/image/upload";
const CLOUDINARY_PRESET = "olx-clone1";
const API_URL = "http://localhost:5000";

const SellItemPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    subCategory: "",
    title: "",
    description: "",
    price: "",
    location: "",
    phone: localStorage.getItem("phone") || "9946276759",
    user: localStorage.getItem("name") || "Guest",
  });

  const [images, setImages] = useState<(File | null)[]>(Array(12).fill(null));
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("name") || "Guest");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const categories: Record<string, string[]> = {
    Mobiles: ["Smartphones", "Tablets", "Accessories"],
    Vehicles: ["Cars", "Bikes", "Commercial Vehicles", "Spare Parts"],
    "Property For Sale": ["Houses", "Apartments", "Land"],
    "Property For Rent": ["Houses", "Apartments", "Rooms"],
    "Electronics & Appliances": ["TVs", "Laptops", "Appliances"],
    Furniture: ["Sofas", "Beds", "Tables"],
    Fashion: ["Clothing", "Footwear", "Accessories"],
    "Sports & Hobbies": ["Sports Equipment", "Musical Instruments", "Collectibles"],
    Services: ["Home Services", "Education", "Health"],
    Jobs: ["Full-Time", "Part-Time", "Freelance"],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name as keyof FormData, value);
  };

  const validateField = (name: keyof FormData, value: string): boolean => {
    let errorMessage = "";
    switch (name) {
      case "category":
        errorMessage = !value ? "Category is required" : "";
        break;
      case "subCategory":
        errorMessage = !value ? "Subcategory is required" : "";
        break;
      case "title":
        if (!value) errorMessage = "Title is required";
        else if (value.length < 5) errorMessage = "Title must be at least 5 characters";
        else if (value.length > 70) errorMessage = "Title must be less than 70 characters";
        break;
      case "description":
        if (!value) errorMessage = "Description is required";
        else if (value.length < 10) errorMessage = "Description must be at least 10 characters";
        break;
      case "price":
        if (!value) errorMessage = "Price is required";
        else if (isNaN(Number(value)) || Number(value) < 0)
          errorMessage = "Price must be a positive number";
        break;
      case "location":
        errorMessage = !value ? "Location is required" : "";
        break;
      case "phone":
        if (!value) errorMessage = "Phone number is required";
        else if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
          errorMessage = "Please enter a valid 10-digit phone number";
        break;
      case "user":
        errorMessage = !value ? "Username is required" : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage || undefined,
    }));
    return !errorMessage;
  };

  const isFormValid = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "category",
      "subCategory",
      "title",
      "description",
      "price",
      "location",
      "phone",
      "user",
    ];

    const allFieldsValid = requiredFields.every((field) => {
      const value = formData[field];
      return value.trim() !== "" && !errors[field];
    });

    const imagesValid = images.some((img) => img !== null) && !errors.images;
    return allFieldsValid && imagesValid;
  };

  const uploadImagesToCloudinary = async (files: (File | null)[]) => {
    const uploadedUrls: string[] = [];
    const validFiles = files.filter((file): file is File => file !== null);

    if (validFiles.length === 0) {
      throw new Error("No images selected for upload");
    }

    console.log("Files to upload:", validFiles.map(f => ({ name: f.name, size: f.size })));

    for (const file of validFiles) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", CLOUDINARY_PRESET);

      try {
        console.log(`Uploading ${file.name}...`);
        const response = await axios.post(CLOUDINARY_URL, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(`Upload success for ${file.name}:`, response.data.secure_url);
        uploadedUrls.push(response.data.secure_url);
      } catch (error: any) {
        console.error(`Upload failed for ${file.name}:`, {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData(prev => ({
      ...prev,
      user: userName
    }));

    const requiredFields: (keyof FormData)[] = [
      "category",
      "subCategory",
      "title",
      "description",
      "price",
      "location",
      "phone",
      "user",
    ];

    let hasErrors = false;
    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        hasErrors = true;
      }
    });

    if (!images.some((img) => img !== null)) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
      hasErrors = true;
    }

    setTouched((prev) => ({
      ...prev,
      ...Object.fromEntries(requiredFields.map((field) => [field, true])),
    }));

    if (hasErrors || !isFormValid()) {
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrors((prev) => ({ ...prev, submit: "Please login to post an ad" }));
        navigate("/");
        return;
      }

      const uploadedImageUrls = await uploadImagesToCloudinary(images);
      setImageUrls(uploadedImageUrls);
      console.log("Uploaded image URLs:", uploadedImageUrls);

      const advertisementData = {
        category: formData.category,
        subCategory: formData.subCategory,
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        phone: formData.phone,
        images: uploadedImageUrls,
        user: formData.user,
      };

      const response = await axios.post(`${API_URL}/api/advertisements`, advertisementData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        alert("Your ad has been posted successfully!");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Submission error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      let errorMessage = "Failed to post your ad. Please try again.";
      if (error.response?.status === 404) {
        errorMessage = "Backend endpoint not found. Check server configuration.";
      } else if (error.response?.status === 401) {
        errorMessage = "Unauthorized. Please login again.";
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("phone");
        navigate("/");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors((prev) => ({ ...prev, submit: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageClick = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.setAttribute("data-index", index.toString());
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const index = Number(e.target.getAttribute("data-index") || images.findIndex((img) => img === null));
      const newImages = [...images];
      const remainingSlots = 12 - newImages.filter((img) => img !== null).length;
      const filesToAdd = Array.from(e.target.files).slice(0, remainingSlots);

      for (const file of filesToAdd) {
        if (file.size > 10 * 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            images: "Each photo should not exceed 10MB",
          }));
          return;
        }
        if (!file.type.match("image.*")) {
          setErrors((prev) => ({
            ...prev,
            images: "Please select image files only",
          }));
          return;
        }
      }

      let currentIndex = index;
      for (const file of filesToAdd) {
        while (currentIndex < 12 && newImages[currentIndex] !== null) {
          currentIndex++;
        }
        if (currentIndex < 12) {
          newImages[currentIndex] = file;
        }
      }

      setErrors((prev) => ({ ...prev, images: undefined }));
      setImages(newImages);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    if (!newImages.some((img) => img !== null)) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, images: undefined }));
    }
  };

  useEffect(() => {
    validateField("phone", formData.phone || "");
    validateField("user", formData.user || "");
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      const storedName = localStorage.getItem("name");
      if (storedName && storedName !== userName) {
        setUserName(storedName);
        setFormData(prev => ({
          ...prev,
          user: storedName
        }));
      }
    }
  }, [navigate, userName]);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
        <div className="relative container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-800"
          >
            <ArrowLeft size={25} />
          </button>
          <h1 className="text-xl text-black font-bold text-center">POST YOUR AD</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl my-20 bg-white border border-gray-300 rounded">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002f34]">CHOOSE CATEGORY</h2>
            <div className="space-y-4">
              <div data-error={errors.category && touched.category ? "true" : "false"}>
                <label htmlFor="category" className="block font-medium mb-2 text-gray-800">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                    errors.category && touched.category
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-[#002f34]"
                  }`}
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {formData.category && (
                <div data-error={errors.subCategory && touched.subCategory ? "true" : "false"}>
                  <label htmlFor="subCategory" className="block font-medium mb-2 text-gray-800">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                      errors.subCategory && touched.subCategory
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#002f34]"
                    }`}
                  >
                    <option value="">Select Subcategory</option>
                    {categories[formData.category]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  {errors.subCategory && touched.subCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002f34]">INCLUDE SOME DETAILS</h2>

            <div className="mb-4" data-error={errors.title && touched.title ? "true" : "false"}>
              <label htmlFor="title" className="block font-medium mb-2 text-gray-800">
                Ad Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                  errors.title && touched.title
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#002f34]"
                }`}
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div
              className="mb-4"
              data-error={errors.description && touched.description ? "true" : "false"}
            >
              <label htmlFor="description" className="block font-medium mb-2 text-gray-800">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                className={`w-full px-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                  errors.description && touched.description
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#002f34]"
                }`}
              />
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <hr className="border-t border-gray-300" />

            <div
              className="mb-4 mt-6"
              data-error={errors.price && touched.price ? "true" : "false"}
            >
              <h2 className="text-xl font-bold mb-4 text-[#002f34]">SET A PRICE</h2>
              <label htmlFor="price" className="block font-medium mb-2 text-gray-800">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
                  ₹
                </span>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="0"
                  className={`w-full pl-10 pr-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                    errors.price && touched.price
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-[#002f34]"
                  }`}
                />
              </div>
              {errors.price && touched.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002f34]">UPLOAD UP TO 12 PHOTOS</h2>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square border border-black overflow-hidden h-28"
                >
                  {image ? (
                    <>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-white rounded p-1 shadow hover:bg-gray-100"
                      >
                        <X size={16} />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 bg-[#002f34] text-white text-xs px-2 py-0.5 rounded">
                          Cover
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center bg-gray-100 cursor-pointer hover:bg-teal-50 transition-colors"
                      onClick={() => handleImageClick(index)}
                    >
                      <Camera size={24} className="text-[#002f34] mb-2" />
                      <span className="text-sm text-[#002f34] font-medium">Add Photo</span>
                    </div>
                  )}
                </div>
              ))}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002f34]">CONFIRM YOUR LOCATION</h2>
            <div
              className="mb-4"
              data-error={errors.location && touched.location ? "true" : "false"}
            >
              <label htmlFor="location" className="block font-medium mb-2 text-gray-800">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                    errors.location && touched.location
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-[#002f34]"
                  }`}
                />
              </div>
              {errors.location && touched.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            <h2 className="text-xl font-bold mb-4 text-[#002f34]">REVIEW YOUR DETAILS</h2>
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="ml-1 me-7 flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-5xl">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="user"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${
                      errors.user && touched.user
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#002f34]"
                    }`}
                  />
                  {errors.user && touched.user && (
                    <p className="text-red-500 text-sm mt-1">{errors.user}</p>
                  )}
                </div>
              </div>
              <div className="mt-7 text-center flex">
                <p className="text-gray-600 text-md me-25">Your phone number</p>
                <p className="text-gray-800 font-semibold">{formData.phone}</p>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            {errors.submit && <p className="text-red-500 text-sm mb-2">{errors.submit}</p>}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className={`w-auto py-2 px-4 rounded text-white text-base font-semibold ${
                isSubmitting || !isFormValid()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#002f34] hover:bg-[#004f54] transition-colors"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">◌</span>
                  Posting...
                </span>
              ) : (
                <span className="flex items-center justify-center">Post Now</span>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default SellItemPage;