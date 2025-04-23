import Checkout from '../src/component/checkout';

const CheckoutPage = ({ cartItems = [] }) => {
  return <Checkout cartItems={cartItems} />;
};

export default CheckoutPage;
