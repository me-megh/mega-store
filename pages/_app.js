// pages/_app.js
import Layout from '../src/component/layout';
import '../styles/globals.css'; // Import Tailwind CSS
import { CartProvider } from '../context/cartContext';
function MyApp({ Component, pageProps }) {
  return (<>
  
  <CartProvider>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </CartProvider>
  
  </>)
}

export default MyApp;
