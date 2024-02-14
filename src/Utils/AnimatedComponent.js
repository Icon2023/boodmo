import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedComponent = ({ children }) => {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Adjust the threshold value based on when you want the animation to start
  const threshold = 200;

  useEffect(() => {
    if (scrollY > threshold) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [controls, scrollY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;