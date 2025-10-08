"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LazySection = ({
  children,
  className = "",
  threshold = 0.1,
  triggerOnce = true,
  animation = "fade",
  ...props
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
    slideRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    },
  };

  const selectedAnimation = animations[animation] || animations.fade;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={selectedAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default LazySection;
