const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <p>&copy; 2024 Company Name. All rights reserved.</p>
            </div>
  
            {/* Social Media Links */}
            <div className="mt-4 md:mt-0">
              <nav className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Facebook</a>
                <a href="#" className="hover:text-gray-400">Twitter</a>
                <a href="#" className="hover:text-gray-400">Instagram</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  