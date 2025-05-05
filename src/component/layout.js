// src/components/layout.js
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main> {/* Main content */}
      <Footer />
    </div>
  );
};

export default Layout;
