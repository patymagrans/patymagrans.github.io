import React, { useState } from 'react';

const ScrollArrow = () =>{

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBrowser = () => typeof window !== "undefined"

  if (isBrowser()) {
    window.addEventListener('scroll', checkScrollTop)
  }

  return (
        <span 
          className="ri-arrow-up-line no-print" 
          onClick={ scrollTop } 
          onKeyDown={ scrollTop }
          style={{
            position: 'fixed',
            width: '100%',
            bottom: '20px',
            left: '93vw',
            opacity: showScroll ? '1' : '0',
            transition: ".2s",
            zIndex: "1000",
            cursor: "pointer",
            fontSize: "24px",
            color: "black"
          }}
        />
  );
}

export default ScrollArrow;