// pages/_app.js
import '../styles/globals.css'; // Import Tailwind CSS
import { useState,useEffect } from 'react';

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

  return <Component {...pageProps} user={user} setUser={setUser} />;
}

export default MyApp;
