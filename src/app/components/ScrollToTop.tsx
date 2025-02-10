"use client"

import React, { useState, useEffect } from "react";
import styles from "../../styles/ScrollToTop.module.css";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Handle scroll event
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    // Scroll to top functionality
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <div
        className={`${styles.scrollToTop} ${isVisible ? styles.scrollToTopVisible : ''}`}
        onClick={scrollToTop}
      >
        ↑
      </div>
    );
}

export default ScrollToTop;