// pages/wishlist.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);

    // Fetch products for the wishlist IDs
    const fetchWishlistProducts = async () => {
        try {
          const res = await axios.post("http://localhost:3000/api/products/wishlist", {
            productIds: storedWishlist,
          });
          setProducts(res.data.products);
        } catch (error) {
          console.error("Failed to fetch wishlist products:", error);
        }
      };
  
      if (storedWishlist.length > 0) {
        fetchWishlistProducts();
      }else{
        setLoading(false);
      }
    }, []);
    const handleRemove = (productId) => {
        const updatedWishlist = wishlistItems.filter((id) => id !== productId);
        setWishlistItems(updatedWishlist);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      };
    
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/product/${product._id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src="/img/tshirt.jpg"
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4  flex flex-col flex-grow justify-between">
                <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700 mb-2">₹{product.price}</p>
                </div>
                <div className="flex justify-between space-x-2 mt-auto">
                <Link
                  href={`/product/${product._id}`}
                  className="w-1/2 bg-black text-white text-center py-2 rounded hover:bg-gray-800 text-sm"
                >
                  View Product
                </Link>
                <button
               onClick={(e) => {
                e.stopPropagation(); // prevent card click
                handleRemove(product._id);
              }}
                  className="w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
