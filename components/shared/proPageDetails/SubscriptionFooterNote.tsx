import { motion } from "framer-motion";

const SubscriptionFooterNote = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-12 text-center text-gray-400 text-sm"
    >
      <p>All plans include a 14-day money-back guarantee • Cancel anytime</p>
    </motion.div>
  );
};

export default SubscriptionFooterNote;
