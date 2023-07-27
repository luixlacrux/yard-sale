import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Category from '@components/Category'

const Portal = ({ children }) => {
  const portalContainer = document.createElement('div');
  portalContainer.className = "ToggleMenu";
  
  useEffect(() => {
    document.body.appendChild(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
      document.body.style.overflow = 'visible';
    };
  }, []);

  return createPortal(children, portalContainer);
};

export default Portal;
