import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import PurchaseButton from "@/components/PurchaseButton";
import { Id } from "@/convex/_generated/dataModel";

const benefits = [
  "Full lifetime access",
  "Certificate of completion",
  "Downloadable resources",
  "Q&A support",
  "Mobile and TV access",
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface LockedContentProps {
  price: number;
  courseId: Id<"courses">;
}

const LockedContent = ({ price, courseId }: LockedContentProps) => (
  <motion.div
    className="text-center bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50"
    variants={fadeIn}
  >
    {/* Lock Icon */}
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      className="flex justify-center mb-6"
    >
      <div className="relative">
        <Lock className="w-16 h-16 text-cyan-400" />
        <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"></div>
      </div>
    </motion.div>

    <h3 className="text-2xl font-bold text-white mb-4">
      Unlock Premium Content
    </h3>
    <p className="text-gray-300 mb-6 max-w-md mx-auto">
      Enroll in this course to access all modules, exercises, and resources
      designed to accelerate your learning journey.
    </p>

    {/* Price */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        ${price.toFixed(2)}
      </span>
      <span className="text-gray-400 ml-2">one-time payment</span>
    </motion.div>

    {/* Purchase Button */}
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <PurchaseButton courseId={courseId} />
    </motion.div>

    {/* Benefits */}
    <motion.ul className="mt-8 space-y-2 text-sm text-gray-400 max-w-md mx-auto">
      {benefits.map((benefit, index) => (
        <motion.li
          key={index}
          className="flex items-center justify-center"
          variants={fadeIn}
        >
          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
          {benefit}
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

export default LockedContent;
