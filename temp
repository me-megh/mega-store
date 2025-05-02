import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CartContext } from "../../context/cartContext";
const ProductList = ({ category, products }) => {
  // State to track wishlist status for the first product only
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart, cartItems, decreaseQuantity } = useContext(CartContext);
  // Toggle wishlist function for the first product
  const toggleWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId) // remove from wishlist
        : [...prev, productId] // add to wishlist
    );
  };
  
  const router = useRouter(); // Use useRouter for navigation
  const handleAddToCart = (products) => {
    addToCart(products); // Add the individual product to the cart
  };
  const getProductQuantity = (productId) => {
    const product = cartItems.find((item) => item._id === productId);
    return product ? product.quantity : 0;
  };
  // Function to navigate to product details page
  const goToProductDetails = (productId) => {
    router.push(`/product/${productId}`); // Navigate to product details page with ID
  };
   console.log(products,"---product1")
  return (
    <>
      <div class="container mx-auto py-8">
        <h1 class="text-3xl font-semibold text-center mb-8"> Product List</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.data &&
            Array.isArray(products.data) &&
            products.data.map((data, index) => {
              const productId = data._id;
              const quantityInCart = getProductQuantity(productId);
              console.log(data, "----12");
              return (
                <>
                  <div key={productId} onClick={() => goToProductDetails(productId)} className="bg-white rounded-lg shadow-lg overflow-hidden relative transform transition-transform duration-300 hover:scale-105">
                    {/* Product Image Container */}
                    <div className="relative">
                      <img
                        src="/img/tshirt.jpg"
                        alt="Product 1"
                        className="w-full h-80 object-cover"
                      />

                      {/* Heart Icon Overlay on Product Image */}
                      <button
                         onClick={() => toggleWishlist(data._id)}
                         className={`absolute top-2 right-2 ${
                           wishlistItems.includes(data._id) ? "text-red-500" : "text-gray-400"
                         } hover:text-red-700 transition duration-200`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            wishlistItems.includes(productId)
                              ? "currentColor"
                              : "none"
                          }
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {data.name}
                      </h2>
                      <p className="text-gray-700 mb-4">₹{data.price}</p>
                      <div className="flex items-center">
                      {quantityInCart === 0 ? (
                        <button
                        onClick={(e) => {
                          e.stopPropagation(); // stops triggering the card's click
                          addToCart(data);
                        }}// Add to Cart
                          className="block text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="ml-4 flex items-center">
                          {/* Decrease quantity */}
                          <button
                            onClick={() => decreaseQuantity(data._id)} // Decrease quantity
                            className="text-xl bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-gray-400"
                          >
                            -
                          </button>
                          <span className="mx-2">{quantityInCart}</span>
                          {/* Increase quantity */}
                          <button
                           onClick={(e) => {
                            e.stopPropagation(); // stops triggering the card's click
                            addToCart(data);
                          }}// Increase quantity
                            className="text-xl bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default ProductList;
