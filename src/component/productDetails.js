import { useParams,useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import productImage1 from '../img/tshirt.jpg'; // Add your product images
import productImage2 from '../img/tshirt.jpg';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [selectedImage, setSelectedImage] = useState(productImage1); // State for selected image

  const product = {
    name: 'Slim Fit Cotton Shirt',
    price: '₹1,299',
    description:
      'A slim fit cotton shirt made from sustainable materials with a stylish cut for casual and formal wear.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [productImage1, productImage2],
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size'); // Alert if size is not selected
      return;
    }

    // Create a product object to add to the cart
    const productToAdd = {
      ...product,
      selectedSize, // Include selected size
    };

    addToCart(productToAdd); // Call the addToCart function
    console.log(productToAdd)
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:flex lg:space-x-8">
        {/* Left: Image Carousel */}
        <div className="lg:w-1/2">
          <div className="w-full h-auto mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full object-cover cursor-pointer"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 ${selectedImage === image ? 'border-black' : 'border-transparent'}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="flex space-x-4">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'bg-white text-black border-gray-400'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition duration-200"
           onClick={() => {
              addToCart(product); // Add item to cart
              navigate('/cart'); // Redirect to cart page
            }}
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-2">Free delivery on orders over ₹999.</p>
            <p className="text-sm text-gray-600">Free returns within 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
