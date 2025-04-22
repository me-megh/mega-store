// pages/product.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../src/component/productList';

const ProductPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!category) return;
    const fetchProducts = async () => {
      const res = await axios.get(`http://localhost:3000/api/products?category=${category}`);
      setProducts(res.data); 
    };
    fetchProducts();
  }, [category]);

  return (<>
  {/* <Home/> */}
  <ProductList category={category} products={products} />;
  </>)
 
};

export default ProductPage;
