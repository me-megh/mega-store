import { useState } from 'react';

const Payment = ({ amount, userId, orderId }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Step 1: Create order from backend (call /api/payment/create-order)
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, userId }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error('Order creation failed');
      }

      const { razorpay_order_id } = data;

      // Step 2: Open Razorpay payment window
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Your Razorpay key
        amount: amount * 100, // amount in paise
        currency: 'INR',
        order_id: razorpay_order_id,
        handler: async (response) => {
          // Step 3: Verify payment after successful transaction
          const { razorpay_payment_id, razorpay_signature } = response;
          
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              order_id: orderId,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.status === 'success') {
            alert('Payment successful, order placed!');
          } else {
            alert('Payment failed, please try again!');
          }
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
      setLoading(false);
      alert('Error occurred, please try again!');
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Payment;
