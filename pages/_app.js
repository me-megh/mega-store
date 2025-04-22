// pages/_app.js
import Layout from '../src/component/layout';
import '../styles/globals.css'; // Import Tailwind CSS
import { useState,useEffect ,useContext} from 'react';
import { CartProvider } from '../context/cartContext';
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (<>
  <CartProvider>
  <Layout>
  <Component {...pageProps} user={user} setUser={setUser} />
  </Layout>
  </CartProvider>
  </>)
}

export default MyApp;
