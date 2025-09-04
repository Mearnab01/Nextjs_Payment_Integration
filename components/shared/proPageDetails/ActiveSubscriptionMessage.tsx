import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const ActiveSubscriptionMessage = ({ planType }: { planType: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 p-4 mb-10 rounded-xl backdrop-blur-sm flex items-center justify-center"
    >
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 text-amber-400 mr-2" />
        <p className="text-purple-200">
          You have an active{" "}
          <span className="font-semibold text-amber-300">{planType}</span>{" "}
          subscription. Thank you for your support!
        </p>
      </div>
    </motion.div>
  );
};

export default ActiveSubscriptionMessage;
