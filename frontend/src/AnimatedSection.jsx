import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const AnimatedSection = ({ children, direction = "left" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });

  // Subtle scroll-based movement (barely 1px)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 1]); // ⬅️ Subtle scroll effect

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -5 : direction === "right" ? 5 : 0,
      scale: direction === "center" ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <motion.div

        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedSection;
