import { useRouter } from 'next/router';
import ProductDetails from '../../components/ProductDetails';

const ProductDetailPage = ({ addToCart }) => {
  const router = useRouter();
  const { id } = router.query; // Get product ID from URL

  return <ProductDetails addToCart={addToCart} productId={id} />;
};

export default ProductDetailPage;
