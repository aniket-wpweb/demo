import React, { useEffect, useState } from 'react';

const IsDesktop = ({ children }) => {
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        setIsDesktopDevice(window.innerWidth > 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDesktopDevice ? <>{children}</> : null;
};

export default IsDesktop;