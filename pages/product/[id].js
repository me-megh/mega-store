
import ProductDetails from '../../src/component/productDetails';
export async function getServerSideProps(context) {
  const { id } = context.params;
console.log(id,"-------id1")
  // Fetch product data from your backend
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
}

const ProductDetailpage = ({ product}) => {
  return <ProductDetails product={product.product}/>;
  
};

export default ProductDetailpage;
