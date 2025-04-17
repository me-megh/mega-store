
import { useState } from 'react';
import { useRouter } from 'next/router'; 
const ProductList=()=>{
  // State to track wishlist status for the first product only
  const [wishlist, setWishlist] = useState(false);

  // Toggle wishlist function for the first product
  const toggleWishlist = () => {
    setWishlist(!wishlist); // Toggle the wishlist state
  };
  const router = useRouter();  // Use useRouter for navigation

  // Function to navigate to product details page
  const goToProductDetails = (productId) => {
    router.push(`/product/${productId}`); // Navigate to product details page with ID
  };
    return(<>
    <div class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold text-center mb-8"> Product List</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">

  {/* Product Image Container */}
  <div className="relative">
    <img src='/img/tshirt.jpg' alt="Product 1" onClick={() => goToProductDetails(1)}  className="w-full h-80 object-cover" />

    {/* Heart Icon Overlay on Product Image */}
    <button
      onClick={toggleWishlist}
                className={`absolute top-2 right-2 ${
                  wishlist ? 'text-red-500' : 'text-gray-400'
                } hover:text-red-700 transition duration-200`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={wishlist ? 'currentColor' : 'none'}
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
    <h2 className="text-lg font-semibold mb-2">Classic White T-Shirt</h2>
    <p className="text-gray-700 mb-4">₹499</p>
    <a
      href="#"
      className="block text-center bg-black text-white py-2 rounded-md hover:bg-gray-800"
    >
      Add to Cart
    </a>
  </div>
</div>

      {/* <!-- Product Card 2 --> */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative">
        <img src='/img/tshirt.jpg' alt="Product 2" onClick={() => goToProductDetails(2)}class="w-full h-80 object-cover"/>
        {/* Heart Icon Overlay on Product Image */}
    <button
     onClick={toggleWishlist}
     className={`absolute top-2 right-2 ${
       wishlist ? 'text-red-500' : 'text-gray-400'
     } hover:text-red-700 transition duration-200`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={wishlist ? 'currentColor' : 'none'}
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
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">Denim Jacket</h2>
          <p class="text-gray-700 mb-4">₹1999</p>
          <a href="#" class="block text-center bg-black text-white py-2 rounded-md hover:bg-gray-800">Add to Cart</a>
        </div>
      </div>

      {/* <!-- Product Card 3 --> */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative">
        <img src='/img/tshirt.jpg' alt="Product 3" onClick={() => goToProductDetails(3)}class="w-full h-80 object-cover"/>
        {/* Heart Icon Overlay on Product Image */}
    <button
       onClick={toggleWishlist}
       className={`absolute top-2 right-2 ${
         wishlist ? 'text-red-500' : 'text-gray-400'
       } hover:text-red-700 transition duration-200`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={wishlist ? 'currentColor' : 'none'}
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
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">Striped Shirt</h2>
          <p class="text-gray-700 mb-4">₹899</p>
          <a href="#" class="block text-center bg-black text-white py-2 rounded-md hover:bg-gray-800">Add to Cart</a>
        </div>
      </div>

      {/* <!-- Product Card 4 --> */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative">
        <img src='/img/tshirt.jpg' alt="Product 4" onClick={() => goToProductDetails(4)} class="w-full h-80 object-cover"/>
        {/* Heart Icon Overlay on Product Image */}
    <button
       onClick={toggleWishlist}
       className={`absolute top-2 right-2 ${
         wishlist ? 'text-red-500' : 'text-gray-400'
       } hover:text-red-700 transition duration-200`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={wishlist ? 'currentColor' : 'none'}
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
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">Black Hoodie</h2>
          <p class="text-gray-700 mb-4">₹1499</p>
          <a href="#" class="block text-center bg-black text-white py-2 rounded-md hover:bg-gray-800">Add to Cart</a>
        </div>
      </div>
    </div>
  </div>
    </>)
}
export default ProductList;