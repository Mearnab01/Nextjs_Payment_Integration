"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BenifitFooter = () => {
  return (
    <motion.div className="pt-6 border-t border-gray-700/50" variants={fadeIn}>
      <div className="flex items-center justify-center text-sm text-gray-400">
        <Star className="h-4 w-4 text-amber-400 mr-1 fill-current" />
        <span>Your learning adventure awaits. What will you master next?</span>
      </div>
    </motion.div>
  );
};

export default BenifitFooter;
