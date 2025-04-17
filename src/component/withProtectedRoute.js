import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Check for the token in the HttpOnly cookie
      const checkAuth = async () => {
        const res = await fetch('/api/auth', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent with the request
        });

        const data = await res.json();

        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push('/login'); // Redirect to login if not authenticated
        }

        setLoading(false);
      };

      checkAuth();
    }, []);

    if (loading) {
      return <p>Loading...</p>; // Loading spinner or any loading state
    }

    if (authenticated) {
      return <WrappedComponent {...props} />;
    }

    return null; // You can also show a redirect or a message if needed
  };
};

export default withProtectedRoute;
