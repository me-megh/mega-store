
import { useState, useEffect } from 'react';

const Slider = () => {
  const images = [
    '/img/slider1.jpg', // Replace with your image URLs
    '/img/slider2.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // Change to next slide every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">BEST SELLER</h1>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-md">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={prevSlide}
            className="bg-white text-gray-800 rounded-full p-2 m-2 shadow hover:bg-gray-200 transition duration-200"
          >
            &#10094;
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={nextSlide}
            className="bg-white text-gray-800 rounded-full p-2 m-2 shadow hover:bg-gray-200 transition duration-200"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
