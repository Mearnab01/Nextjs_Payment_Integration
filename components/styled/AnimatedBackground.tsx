"use client";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-500/10"
          initial={{
            scale: 0,
            opacity: 0,
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          animate={{
            scale: 1,
            opacity: [0, 0.5, 0],
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
