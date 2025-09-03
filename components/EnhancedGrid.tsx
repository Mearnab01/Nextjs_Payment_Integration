"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EnhancedGrid = () => {
  const [particles, setParticles] = useState<
    {
      width: number;
      height: number;
      left: string;
      top: string;
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    // Generate random particles only on the client to avoid hydration mismatch
    const newParticles = Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 5 + 2,
      height: Math.random() * 5 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-gray-900 overflow-hidden">
      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />

      {/* Neon Glows with Animation */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(168,85,247,0.15),transparent)]"
        animate={{ scale: [1, 1.02, 1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_500px,rgba(6,182,212,0.15),transparent)]"
        animate={{ scale: [1, 1.03, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_80%,rgba(236,72,153,0.1),transparent)]"
        animate={{ scale: [1, 1.01, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Animated Orbs */}
      <motion.div
        className="absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-0 bottom-0 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute left-1/2 bottom-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-500/5 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Subtle Animated Grid Lines */}
      <motion.div
        className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(168,85,247,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles (only rendered after mount) */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-500/20"
          style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default EnhancedGrid;
