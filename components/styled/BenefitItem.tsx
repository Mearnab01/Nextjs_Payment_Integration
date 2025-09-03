import { motion } from "framer-motion";
import React from "react";

const BenefitItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <motion.div className="benefit-card" whileHover={{ scale: 1.02 }}>
    {icon}
    <span className="ml-3 text-gray-300 text-sm">{text}</span>
  </motion.div>
);

export default BenefitItem;
