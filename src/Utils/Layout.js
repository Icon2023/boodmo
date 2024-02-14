// components/Layout.js
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const LayoutTransition = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({ opacity: 1 - scrollY / 500 }); // Adjust the value (500) as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    // >
    //   {children}
    // </motion.div>
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="header"
    >
      {children}
    </motion.header>

    // <motion.div
    //     // key={location.pathname}
    //     initial={{ opacity: 0, y: 100 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     exit={{ opacity: 0, y: -100 }}
    //     transition={{ duration: 0.5 }}
    //   > {children}</motion.div>

    //   <motion.div
    //   // key={location.pathname}
    //   initial={{ opacity: 0, scale: 0.8 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   exit={{ opacity: 0, scale: 0.8 }}
    //   transition={{ duration: 0.5 }}
    // >
    //   {children}
    //     </motion.div>

    // <motion.div
    //     className="box"
    //     initial={{ opacity: 0, scale: 0.5 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{
    //       duration: 0.8,
    //       delay: 0.5,
    //       ease: [0, 0.71, 0.2, 1.01]
    //     }}
    //   >{children}</motion.div>
  );
};

export default LayoutTransition;
