import { useRouter } from 'next/router';
import ProductDetails from '../../src/component/productDetails';
const ProductDetailpage = ({ addToCart }) => {
  const router = useRouter();
  const { id} = router.query;

  return <ProductDetails addToCart={addToCart} productId={id} product={products} />;
  
};

export default ProductDetailpage;
