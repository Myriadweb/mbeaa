import React, { useState, useEffect } from 'react';
import image1 from '../assets/images/popups/MBE_AA_01_A.jpg';
import image2 from '../assets/images/popups/MBE_AA_02_A.jpg';
import image3 from '../assets/images/popups/MBE_AA_03_A.jpg';
// @ts-ignore
function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3]
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current image index
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images]);

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            opacity: index === currentImageIndex ? 1 : 0, // Show only the current image
            transition: 'opacity 2s ease-in-out', // Apply fade in/out effect
            position: 'absolute', // Make sure images stack on top of each other
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          className={index === currentImageIndex ? 'active' : ''}
        />
      ))}
    </div>
  );
};

export default Slideshow;
