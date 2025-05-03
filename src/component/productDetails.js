import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../../context/cartContext";
const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { id } = router.query; // Product ID from URL
  const { addToCart } = useContext(CartContext); 
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [selectedImage, setSelectedImage] = useState("/img/tshirt.jpg"); // State for selected image
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size"); // Alert if size is not selected
      return;
    }
    const user = JSON.parse(localStorage.getItem("user")); // check login

    const productToAdd = {
      productId: product._id,
      name: product.name,
      price: product.price,
      selectedSize,
      quantity,
    };    
    console.log(productToAdd,user,"------productdetais")
    addToCart(productToAdd,user); // Call the addToCart function
    router.push("/cart");
  };

  if (!product) return <p className="text-center py-20">Loading product...</p>;
  const parsedSizes =
  Array.isArray(product?.sizes) && product.sizes.length === 1
    ? product.sizes[0].split(",").map((s) => s.trim())
    : product.sizes || [];
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
            {product?.images?.length > 0 &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 ${
                    selectedImage === image
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">
            {product.name || "Loading product.1.."}
          </h1>
          <p className="text-2xl font-bold mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="flex space-x-4">
            {parsedSizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                 {size}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border rounded-md px-2 py-1"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition duration-200"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-2">
              Free delivery on orders over ₹999.
            </p>
            <p className="text-sm text-gray-600">Free returns within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
