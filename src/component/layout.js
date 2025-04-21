// src/components/layout.js
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main> {/* Main content */}
      <Footer />
    </div>
  );
};

export default Layout;
