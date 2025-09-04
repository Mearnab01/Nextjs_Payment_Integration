"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const BillingLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-10 h-10 text-cyan-400" />
      </motion.div>
    </div>
  );
};

export default BillingLoader;
