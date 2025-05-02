import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/orders', { withCredentials: true });
        if (res.data.user) {
        setOrders(res.data.orders);
        console.log('Order placed successfully:', res.data);}
        else{
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading Orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-semibold">No Orders Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const statusClass = order.status === "Completed" ? "text-green-600" : order.status === "Cancelled" ? "text-red-600" : "text-yellow-600";
          return(
          <div key={order._id} className="border p-6 rounded-lg shadow-md bg-white">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{order.total}</p>
                <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Products:</h3>
              <ul className="list-disc list-inside space-y-1">
                {order.products.map((item, index) => (
                  <li key={index}>
                    {item.productId?.name || 'Product'} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>)
})}
      </div>
    </div>
  );
};

export default MyOrders;