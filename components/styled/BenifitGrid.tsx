"use client";

import { motion } from "framer-motion";
import { Clock, Gift, Zap, Star } from "lucide-react";
import BenefitItem from "@/components/styled/BenefitItem";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const benefits = [
  {
    icon: <Clock className="h-5 w-5 text-cyan-400" />,
    text: "Lifetime access",
  },
  {
    icon: <Gift className="h-5 w-5 text-purple-400" />,
    text: "Certificate included",
  },
  {
    icon: <Zap className="h-5 w-5 text-amber-400" />,
    text: "Downloadable resources",
  },
  {
    icon: <Star className="h-5 w-5 text-yellow-400" />,
    text: "Community support",
  },
];

const BenefitsGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
      variants={staggerContainer}
    >
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} icon={benefit.icon} text={benefit.text} />
      ))}
    </motion.div>
  );
};

export default BenefitsGrid;
