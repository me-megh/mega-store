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
    const updatedWishlist = wishlistItems.includes(productId)
    ? wishlistItems.filter((id) => id !== productId)
    : [...wishlistItems, productId];

  setWishlistItems(updatedWishlist);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  
  const router = useRouter(); // Use useRouter for navigation
  const handleAddToCart = (products) => {
    console.log(products,"-----product")
    const user = JSON.parse(localStorage.getItem("user")); 
    const productToAdd = {
      productId: products._id || products.productId,
      name: products.name,
      price: products.price,
      quantity: 1,
      selectedSize: products.sizes?.[0]?.split(",")[0] || "S", // default size,
    };
    if (!user) {
  // Check if product is already in the cart (based on ID and size)
  const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cartItemsFromStorage.findIndex(
    (item) => item.productId === productToAdd.productId && item.selectedSize === productToAdd.selectedSize
  );

  if (existingProductIndex >= 0) {
    cartItemsFromStorage[existingProductIndex].quantity += 1;  // Increment quantity
  } else {
    cartItemsFromStorage.push(productToAdd);  // Add new product
  }

  // Update localStorage with the updated cart
  localStorage.setItem("cart", JSON.stringify(cartItemsFromStorage));
} else {
  addToCart(products, user);
    // addToCart(products); // Add the individual product to the cart
}
  };
  const getProductQuantity = (productId) => {
    const product = cartItems.find((item) => item._id === productId);
    return product ? product.quantity : 0;
  };
  // Function to navigate to product details page
  const goToProductDetails = (productId) => {
    router.push(`/product/${productId}`); // Navigate to product details page with ID
  };
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);
  
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
                         onClick={(e) => {
                          e.stopPropagation(); // ✅ Prevent click from bubbling to the product card
                          toggleWishlist(data._id);
                        }}
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
                        <button
                        onClick={(e) => {
                          e.stopPropagation(); // stops triggering the card's click
                          handleAddToCart(data);
                        }}// Add to Cart
                          className="block text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                        >
                          Add to Cart
                        </button>
                      
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
