import { motion } from "framer-motion";
import { Crown } from "lucide-react";

const ProHeaderSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12 relative"
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-30">
        <Crown size={60} className="text-purple-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 p-2">
        Upgrade Your Learning Experience
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Unlock premium features and accelerate your journey to mastery
      </p>
    </motion.div>
  );
};

export default ProHeaderSection;
